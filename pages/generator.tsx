// @ts-ignore
import DefaultLayout from '../../modules/site/DefaultLayout.tsx'
import { useEffect, useState } from 'react';
import { runBingoSimulation, SimulationResult } from '../../modules/bingo/game'
import LargeBingoSheet from '../../modules/bingo/LargeBingoSheet'
import styles from '../../modules/bingo/simulation.module.scss'

const Page = () => {
    const [result, setResult] = useState<SimulationResult | null>(null);

    useEffect(() => {
        const result = runBingoSimulation(37, 1, 100, 5, 142, 10);
        setResult(result);
    }, []);

    return (
        <DefaultLayout title="Bingo Sheet Generator | David Veszelovszki" description="Let's play some Bingo." showThemeToggle={false}>
            <main>
                {result ? (
                    <>
                        <div className={styles.largeBingoSheets}>
                            {result.playerSheets.map((sheet, i) => (
                                <LargeBingoSheet key={i} sheet={sheet} size={5} />
                            ))}
                        </div>
                        <p>Number of winners in each round:</p>
                        <p>{result.winnerCountPerRound.join(',')}<br />
                            Sum winners: {result.winnerCountPerRound.reduce( (a,b) => a + b, 0)}<br />
                            Numbers: {result.pickedNumbers.join(', ')}</p>
                    </>
                ) : (
                    <p>Simulating game...</p>
                )}
            </main>
        </DefaultLayout>
    );
}

export default Page
