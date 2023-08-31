import React from 'react'
import styles from './simulation.module.scss'

interface BingoSheetProps {
    size: number;
    sheet: number[];
}

const LargeBingoSheet: React.FC<BingoSheetProps> = ({ sheet, size }) => {
    const rows = Array.from({length: size}, (_, i) => sheet.slice(i * size, (i + 1) * size));

    return (
        <div className={styles.largeBingoSheet}>
            {rows.map((row, i) => (
                <div key={i} className={styles.row}>
                    {row.map((number, j) => (
                        <div key={j} className={styles.cell}>{number}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default LargeBingoSheet;
