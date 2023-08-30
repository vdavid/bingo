import { RandomGenerator } from './RandomGenerator'

export interface SimulationResults {
    firstWinRoundIndexMin: number;
    firstWinRoundIndexAvg: number;
    firstWinRoundIndexMax: number;
    lastWinRoundIndexMin: number;
    lastWinRoundIndexAvg: number;
    lastWinRoundIndexMax: number;
    winnersInLastRoundAvg: number;
    winnersInLastRoundMax: number;
    winnersInAnyRoundAvg: number;
    winnersInWonRoundAvg: number;
    winnersInAnyRoundMax: number;
    pickedNumbersForAllGamesAndSheets: Array<Array<Array<number>>>;  // For debugging
    playerSheetsForAllGames: Array<Array<Array<number>>>;
    numberOfWinnersInEachRound: Array<Array<number>>;
    pickedNumbersForAllGames: Array<Array<number>>;
}

/**
 * Generates a bingo sheet with random unique numbers.
 */
function generateBingoSheet(randomGenerator: RandomGenerator, rangeMin: number, rangeMax: number, bingoSheetSize: number): Array<number> {
    /* Generate a list of numbers from rangeMin to rangeMax, shuffle it and pick the first bingoSheetSize * bingoSheetSize numbers */
    let numbers = Array.from({length: rangeMax - rangeMin + 1}, (_, i) => i + rangeMin);
    numbers.sort(() => randomGenerator.random() - 0.5);
    return numbers.slice(0, bingoSheetSize * bingoSheetSize);
}

/**
 * Checks if a bingo sheet has a bingo in any row, column or diagonal.
 */
export function checkBingo(sheet: Array<number>, pickedNumbers: Array<number>, bingoSheetSize: number): boolean {
    const sheetRows = Array.from({length: bingoSheetSize}, (_, i) => sheet.slice(i * bingoSheetSize, (i + 1) * bingoSheetSize));

    const sheetColumns = Array.from({length: bingoSheetSize}, (_, i) => sheetRows.map(row => row[i]));

    const diagonals = [Array.from({length: bingoSheetSize}, (_, i) => sheetRows[i][i]), Array.from({length: bingoSheetSize}, (_, i) => sheetRows[i][bingoSheetSize - 1 - i])];

    const allLines = [...sheetRows, ...sheetColumns, ...diagonals];

    return allLines.some(line => line.every(number => pickedNumbers.includes(number)));
}

export function runBingoSimulations(seedStart: number, rangeMin: number, rangeMax: number, bingoSheetSize: number, playerCount: number, totalWins: number, simulatedGameCount: number): SimulationResults {
    let firstWinRounds: Array<number> = [];
    let lastWinRounds: Array<number> = [];
    let totalWinners: Array<number> = [];
    let winnersInEachRound: Array<Array<number>> = [];
    let playerSheetsForAllGames: Array<Array<Array<number>>> = [];
    let pickedNumbersForAllGamesAndSheets: Array<Array<Array<number>>> = [];
    let pickedNumbersForAllGames: Array<Array<number>> = [];

    // Run the simulations
    for (let i = 0; i < simulatedGameCount; i++) {
        const randomGenerator = new RandomGenerator(seedStart + i)
        pickedNumbersForAllGamesAndSheets.push([]);
        let playerSheets: Array<Array<number>> = [];
        let winnerCountPerRound: Array<number> = [];
        let totalWinnerCount = 0;
        let firstWin = -1;
        let lastWin = -1;

        // Generate bingo sheets for each player
        for (let j = 0; j < playerCount; j++) {
            playerSheets.push(generateBingoSheet(randomGenerator, rangeMin, rangeMax, bingoSheetSize));
        }

        // Generate a list of numbers from rangeMin to rangeMax, and shuffle them, to simulate the order in which numbers are picked
        let allNumbers = Array.from({length: rangeMax - rangeMin + 1}, (_, i) => i + rangeMin);
        const randomGenerator2 = new RandomGenerator(seedStart + i)
        allNumbers.sort(() => randomGenerator2.random() - 0.5);

        // Check if any player has a bingo after each number is picked
        for (let round = 0; round < allNumbers.length; round++) {
            let roundWinnerCount = 0;
            // let pickedNumber = allNumbers[round];

            for (let player = 0; player < playerSheets.length; player++) {
                // Check if the player has a bingo after this round but not before
                if (!checkBingo(playerSheets[player], allNumbers.slice(0, round), bingoSheetSize)) {
                    pickedNumbersForAllGamesAndSheets[i][player] = allNumbers.slice(0, round + 1);
                    if (checkBingo(playerSheets[player], allNumbers.slice(0, round + 1), bingoSheetSize)) {
                        if (firstWin === -1) {
                            firstWin = round;
                        }
                        roundWinnerCount += 1;
                    }
                }
            }

            // Store the number of winners of this round.
            winnerCountPerRound.push(roundWinnerCount);

            // If all players have won, stop checking.
            totalWinnerCount += roundWinnerCount;
            if (totalWinnerCount >= totalWins) {
                lastWin = round;
                break;
            }
        }

        firstWinRounds.push(firstWin);
        lastWinRounds.push(lastWin);
        totalWinners.push(totalWinnerCount);
        winnersInEachRound.push(winnerCountPerRound);
        playerSheetsForAllGames.push(playerSheets);
        pickedNumbersForAllGames.push(allNumbers.slice(0, lastWin + 1));
    }

    // Calculate the statistics
    let firstWinRoundIndexMin = Math.min(...firstWinRounds);
    let firstWinRoundIndexAvg = firstWinRounds.reduce((a, b) => a + b, 0) / firstWinRounds.length;
    let firstWinRoundIndexMax = Math.max(...firstWinRounds);
    let lastWinRoundIndexMin = Math.min(...lastWinRounds);
    let lastWinRoundIndexAvg = lastWinRounds.reduce((a, b) => a + b, 0) / lastWinRounds.length;
    let lastWinRoundIndexMax = Math.max(...lastWinRounds);
    let winnersInLastRoundAvg = totalWinners.reduce((a, b) => a + b, 0) / totalWinners.length;
    let winnersInLastRoundMax = Math.max(...totalWinners);
    let winnersInAnyRoundAvg = winnersInEachRound.flat().reduce((a, b) => a + b, 0) / winnersInEachRound.flat().length;
    let winnersInWonRoundAvg = winnersInEachRound.flat().reduce((a, b) => a + b, 0) / winnersInEachRound.flat().filter(a => a > 0).length;
    let winnersInAnyRoundMax = Math.max(...winnersInEachRound.map(round => Math.max(...round)));

    return {
        firstWinRoundIndexMin,
        firstWinRoundIndexAvg,
        firstWinRoundIndexMax,
        lastWinRoundIndexMin,
        lastWinRoundIndexAvg,
        lastWinRoundIndexMax,
        winnersInLastRoundAvg,
        winnersInLastRoundMax,
        winnersInAnyRoundAvg,
        winnersInWonRoundAvg,
        winnersInAnyRoundMax,
        pickedNumbersForAllGamesAndSheets,
        playerSheetsForAllGames,
        numberOfWinnersInEachRound: winnersInEachRound,
        pickedNumbersForAllGames
    };
}
