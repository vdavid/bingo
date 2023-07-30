import React from 'react'
import styles from './simulation.module.scss'

interface BingoSheetProps {
    sheet: Array<number>;
    size: number;
}

const BingoSheet: React.FC<BingoSheetProps> = ({ sheet, size }) => {
    const rows = Array.from({length: size}, (_, i) => sheet.slice(i * size, (i + 1) * size));

    return (
        <table className={styles.bingoSheet}>
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

export default BingoSheet;
