// @ts-ignore
import DefaultLayout from '../../modules/site/DefaultLayout.tsx'
import { useEffect, useState } from 'react';
import { runBingoSimulation, SimulationResult } from '../../modules/bingo/game'
import BingoSheet from '../../modules/bingo/BingoSheet'
import styles from '../../modules/bingo/simulation.module.scss'

const Page = () => {
    const [result, setResult] = useState<SimulationResult | null>(null);
    const simulationCount = 1;

    useEffect(() => {
        const result = runBingoSimulation(37, 1, 100, 5, 142, 10);
        setResult(result);
    }, []);

    return (
        <DefaultLayout title="Bingo Simulation | David Veszelovszki" description="Let's play some Bingo.">
            <header>
                <h1>Bingo Simulation</h1>
            </header>
            <main>
                {(result) ? (
                    <>
                        {result && result.playerSheets && result.playerSheets[0] ? (
                            <>
                                <p>First 5 bingo sheets of the first game:</p>
                                <div className={styles.bingoSheets}>
                                    {result.playerSheets.slice(0, 5).map((sheet, i) => (
                                        <BingoSheet key={i} sheet={sheet} size={5} pickedNumbers={result.pickedNumbersForSheets[i]} />
                                    ))}
                                </div>
                            </>
                        ) : null}
                        <p>Number of winners in each round:</p>
                        <p>{result.winnerCountPerRound.join(',')}<br />
                            Sum winners: {result.winnerCountPerRound.reduce( (a,b) => a + b, 0)}<br />
                            Numbers: {result.pickedNumbers.join(', ')}</p>
                    </>
                ) : (
                    <p>Simulating {simulationCount} games...</p>
                )}
            </main>
        </DefaultLayout>
    );
}

export default Page
