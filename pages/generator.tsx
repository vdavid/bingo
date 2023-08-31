import BingoLayout from '../../modules/bingo/BingoLayout'
import { useEffect, useState } from 'react';
import { runBingoSimulation, SimulationResult } from '../../modules/bingo/game'
import LargeBingoSheet from '../../modules/bingo/LargeBingoSheet'
import styles from '../../modules/bingo/simulation.module.scss'
import headerPic from '../../public/wedding/d-d-wedding-header.svg'
import bikePic from '../../public/wedding/bike-wireframe.png'
import Image from 'next/image'

const Page = () => {
    const [result, setResult] = useState<SimulationResult | null>(null);

    useEffect(() => {
        const result = runBingoSimulation(37, 1, 100, 5, 142, 10);
        setResult(result);
    }, []);

    const groupedSheets = [];
    for (let i = 0; i < (result?.playerSheets.length || 0); i += 4) {
        groupedSheets.push(result?.playerSheets.slice(i, i + 4));
    }

    return (
        <BingoLayout>
            <main>
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
        </BingoLayout>
    );
}

export default Page
