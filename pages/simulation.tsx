// @ts-ignore
import DefaultLayout from '../../modules/site/DefaultLayout.tsx'
import { useEffect, useState } from 'react';
import { runBingoSimulations, SimulationResults } from '../../modules/bingo/game';
import BingoSheet from '../../modules/bingo/BingoSheet'
import styles from '../../modules/bingo/simulation.module.scss'
import { RandomGenerator } from '../../modules/bingo/RandomGenerator'

const Page = () => {
    const [results, setResults] = useState<SimulationResults | null>(null);
    const simulationCount = 1;

    useEffect(() => {
        const results = runBingoSimulations(new RandomGenerator(112), 1, 100, 5, 142, 10, simulationCount);
        setResults(results);
    }, []);

    return (
        <DefaultLayout title="Bingo Simulation | David Veszelovszki" description="Let's play some Bingo.">
            <header>
                <h1>Bingo Simulation</h1>
            </header>
            <main>
                {results ? (
                    <>
                        <p>Stats:</p>
                        <ul>
                        <li>Average number of rounds for first win: <strong>{results.firstWinRoundIndexAvg.toFixed(2)}</strong></li>
                        <li>Minimum number of rounds for first win: <strong>{results.firstWinRoundIndexMin}</strong></li>
                        <li>Maximum number of rounds for first win: <strong>{results.firstWinRoundIndexMax}</strong></li>
                        <li>Average number of rounds for 10 wins: <strong>{results.lastWinRoundIndexAvg.toFixed(2)}</strong></li>
                        <li>Minimum number of rounds for 10 wins: <strong>{results.lastWinRoundIndexMin}</strong></li>
                        <li>Maximum number of rounds for 10 wins: <strong>{results.lastWinRoundIndexMax}</strong></li>
                        <li>Average number of winners in the last round: <strong>{results.winnersInLastRoundAvg.toFixed(2)}</strong></li>
                        <li>Maximum number of winners in the last round: <strong>{results.winnersInLastRoundMax}</strong></li>
                        <li>Average number of simultaneous wins in any round: <strong>{results.winnersInAnyRoundAvg.toFixed(2)}</strong></li>
                        <li>Average number of simultaneous wins in rounds won by someone: <strong>{results.winnersInWonRoundAvg.toFixed(2)}</strong></li>
                        <li>Maximum number of simultaneous wins in any round: <strong>{results.winnersInAnyRoundMax}</strong></li>
                        </ul>
                        {results && results.playerSheetsForAllGames && results.playerSheetsForAllGames[0] ? (
                            <>
                                <p>First 25 bingo sheets of the first game:</p>
                                <div className={styles.bingoSheets}>
                                    {results.playerSheetsForAllGames[0].slice(0, 100).map((sheet, i) => (
                                        <BingoSheet key={i} sheet={sheet} size={5} pickedNumbers={results.pickedNumbersForAllGamesAndSheets[0][i]} />
                                    ))}
                                </div>
                            </>
                        ) : null}
                        <p>Number of winners in each round:</p>
                        <ul>
                            {results.numberOfWinnersInEachRound.map((roundWinners, index) => (
                                <li key={index}>Round {index + 1}: {roundWinners.join(',')}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Simulating {simulationCount} games...</p>
                )}
            </main>
        </DefaultLayout>
    );
}

export default Page
