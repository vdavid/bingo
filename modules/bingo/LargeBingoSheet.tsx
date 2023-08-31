import React from 'react'
import styles from './simulation.module.scss'

interface BingoSheetProps {
    size: number;
    sheet: number[];
}

const LargeBingoSheet: React.FC<BingoSheetProps> = ({ sheet, size }) => {
    const rows = Array.from({length: size}, (_, i) => sheet.slice(i * size, (i + 1) * size));

    return (
        <table className={styles.largeBingoSheet}>
            <tbody>
            {rows.map((row, i) => (
                <tr key={i}>
                    {row.map((number, j) => (
                        <td key={j}>{number}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default LargeBingoSheet;
