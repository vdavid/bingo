// @ts-ignore
import DefaultLayout from '../../modules/site/DefaultLayout.tsx'
import { useEffect, useState } from 'react';
import { runBingoSimulations, SimulationResults } from '../../modules/bingo/game';

const Page = () => {
    const [results, setResults] = useState<SimulationResults | null>(null);
    const simulationCount = 100;

    useEffect(() => {
        const results = runBingoSimulations(1, 100, 5, 130, 10, simulationCount);
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
                        <p>Average number of rounds for first win: {results.firstWinRoundIndexAvg.toFixed(2)}</p>
                        <p>Minimum number of rounds for first win: {results.firstWinRoundIndexMin}</p>
                        <p>Maximum number of rounds for first win: {results.firstWinRoundIndexMax}</p>
                        <p>Average number of rounds for 10 wins: {results.lastWinRoundIndexAvg.toFixed(2)}</p>
                        <p>Minimum number of rounds for 10 wins: {results.lastWinRoundIndexMin}</p>
                        <p>Maximum number of rounds for 10 wins: {results.lastWinRoundIndexMax}</p>
                        <p>Average number of winners in the last round: {results.winnersInLastRoundAvg.toFixed(2)}</p>
                        <p>Maximum number of winners in the last round: {results.winnersInLastRoundMax}</p>
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
