import React from 'react'
import styles from './simulation.module.scss'
import { checkBingo } from './game'

interface BingoCellProps {
    sheet: number[];
    number: number;
    picked: boolean;
    won: boolean;
}

const BingoCell: React.FC<BingoCellProps> = ({ sheet, number, picked, won }) => {
    let className = styles.bingoCell;
    if (picked) {
        className += ` ${styles.picked}`;
    }
    if (won) {
        className += ` ${styles.winning}`;
    }
    return (
        <td className={className}>{number}</td>
    );
}

interface BingoSheetProps {
    sheet: number[];
    size: number;
    pickedNumbers: number[];
}

const BingoSheet: React.FC<BingoSheetProps> = ({ sheet, size, pickedNumbers }) => {
    const rows = Array.from({length: size}, (_, i) => sheet.slice(i * size, (i + 1) * size));
    const won = checkBingo(sheet, pickedNumbers, size);

    return (
        <table className={styles.bingoSheet}>
            <tbody>
            {rows.map((row, i) => (
                <tr key={i}>
                    {row.map((number, j) => (
                        <BingoCell key={j} sheet={sheet} number={number} picked={pickedNumbers.includes(number)} won={won && number === pickedNumbers[pickedNumbers.length - 1]} />
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default BingoSheet;
