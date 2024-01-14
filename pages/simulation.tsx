import DefaultLayout from '../../modules/site/DefaultLayout'
import { useEffect, useState } from 'react';
import { calculateSimulationStats, runBingoSimulations, SimulationResults, SimulationStats } from '../../modules/bingo/game'
import BingoSheet from '../../modules/bingo/BingoSheet'
import styles from '../../modules/bingo/simulation.module.scss'

const Page = () => {
    const [results, setResults] = useState<SimulationResults | null>(null);
    const simulationCount = 1;
    const seedStart = 37;
    const [stats, setStats] = useState<SimulationStats | null>(null);

    useEffect(() => {
        const results = runBingoSimulations(seedStart, 1, 100, 5, 142, 10, simulationCount);
        setResults(results);
        setStats(calculateSimulationStats(results));
    }, []);

    return (
        <DefaultLayout title="Bingo Simulation | David Veszelovszki" description="Let's play some Bingo.">
            <header>
                <h1>Bingo Simulation</h1>
            </header>
            <main>
                {(results && stats) ? (
                    <>
                        <p>Stats:</p>
                        <ul>
                        <li>Average number of rounds for first win: <strong>{stats.firstWinRoundIndexAvg.toFixed(2)}</strong></li>
                        <li>Minimum number of rounds for first win: <strong>{stats.firstWinRoundIndexMin}</strong></li>
                        <li>Maximum number of rounds for first win: <strong>{stats.firstWinRoundIndexMax}</strong></li>
                        <li>Average number of rounds for 10 wins: <strong>{stats.lastWinRoundIndexAvg.toFixed(2)}</strong></li>
                        <li>Minimum number of rounds for 10 wins: <strong>{stats.lastWinRoundIndexMin}</strong></li>
                        <li>Maximum number of rounds for 10 wins: <strong>{stats.lastWinRoundIndexMax}</strong></li>
                        <li>Average number of winners in the last round: <strong>{stats.winnersInLastRoundAvg.toFixed(2)}</strong></li>
                        <li>Maximum number of winners in the last round: <strong>{stats.winnersInLastRoundMax}</strong></li>
                        <li>Average number of simultaneous wins in any round: <strong>{stats.winnersInAnyRoundAvg.toFixed(2)}</strong></li>
                        <li>Average number of simultaneous wins in rounds won by someone: <strong>{stats.winnersInWonRoundAvg.toFixed(2)}</strong></li>
                        <li>Maximum number of simultaneous wins in any round: <strong>{stats.winnersInAnyRoundMax}</strong></li>
                        </ul>
                        {results && results.playerSheetsForAllGames && results.playerSheetsForAllGames[0] ? (
                            <>
                                <p>First 5 bingo sheets of the first game:</p>
                                <div className={styles.bingoSheets}>
                                    {results.playerSheetsForAllGames[0].slice(0, 5).map((sheet, i) => (
                                        <BingoSheet key={i} sheet={sheet} size={5} pickedNumbers={results.pickedNumbersForAllGamesAndSheets[0][i]} />
                                    ))}
                                </div>
                            </>
                        ) : null}
                        <p>Number of winners in each round:</p>
                        <ul>
                            {results.numberOfWinnersInEachRound
                                // .filter(roundWinners => roundWinners.reduce( (a,b) => a + b, 0) === 11
                                //     && roundWinners[roundWinners.length - 1] === 2
                                //     && roundWinners.filter(count => count > 1).length === 1)
                                .map((roundWinners, index) => (
                                <li key={index}>Round {index + 1} (seed: {seedStart + index}):<br />
                                    {roundWinners.join(',')}<br />
                                    Sum winners: {roundWinners.reduce( (a,b) => a + b, 0)}<br />
                                    Numbers: {results.pickedNumbersForAllGames[index].join(', ')}
                                </li>
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
