import SimpleLayout from '../modules/bingo/SimpleLayout'
import React, { useEffect, useState } from 'react'
import { runBingoSimulation, SimulationResult } from '../modules/bingo/game'
import LargeBingoSheet from '../modules/bingo/LargeBingoSheet'
import styles from '../modules/bingo/simulation.module.scss'
import headerPic from '../public/d-d-wedding-header.svg'
import bikePic from '../public/bike-wireframe.png'
import Image from 'next/image'

const Page: React.FunctionComponent<React.PropsWithChildren> = () => {
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [groupedSheets, setGroupedSheets] = useState<Array<Array<Array<number>>>>([])

    useEffect(() => {
        const result = runBingoSimulation(37, 1, 100, 5, 142, 10);
        setResult(result);
    }, []);

    useEffect(() => {
        if (result?.playerSheets) { // Only calculate groupedSheets when result is available
            const groups = []
            for (let i = 0; i < result.playerSheets.length; i += 4) {
                groups.push(result.playerSheets.slice(i, i + 4))
            }
            setGroupedSheets(groups)
        } else {
            setGroupedSheets([]) // Reset groupedSheets if result becomes null again (unlikely in this case, but good practice)
        }
    }, [result])

    return (
        <SimpleLayout>
            <main className={styles.page}>
                {result ? (
                    <div className={styles.largeBingoSheets}>
                        {groupedSheets.map((group, idx) => (
                            <div key={idx} className={styles.pageContainer}>
                                {group?.map((sheet, i) => (
                                    <div key={idx} className={styles.sheetContainer}>
                                        <Image src={headerPic} alt="header" className={styles.sheetHeader} />
                                        <Image src={bikePic} alt="bike" className={styles.bikeImage} />
                                        <Image src={bikePic} alt="bike" className={styles.bikeImage2} />
                                        <LargeBingoSheet key={i} sheet={sheet} size={5} />
                                        <h1>bingo!</h1>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Simulating game...</p>
                )}
            </main>
        </SimpleLayout>
    );
}

export default Page
