import { checkBingo } from './game';
import { describe, expect, it } from '@jest/globals'

describe('checkBingo', () => {

    it('should detect a row bingo', () => {
        const sheet = [1, 2, 3, 4, 5,
            6, 7, 8, 9, 10,
            11, 12, 13, 14, 15,
            16, 17, 18, 19, 20,
            21, 22, 23, 24, 25];

        const pickedNumbers = [1, 2, 3, 4, 5];

        expect(checkBingo(sheet, pickedNumbers, 5)).toBe(true);
    });

    it('should detect a column bingo', () => {
        const sheet = [1, 6, 11, 16, 21,
            2, 7, 12, 17, 22,
            3, 8, 13, 18, 23,
            4, 9, 14, 19, 24,
            5, 10, 15, 20, 25];

        const pickedNumbers = [1, 6, 11, 16, 21];

        expect(checkBingo(sheet, pickedNumbers, 5)).toBe(true);
    });

    it('should detect a diagonal bingo', () => {
        const sheet = [1, 6, 11, 16, 21,
            2, 7, 12, 17, 22,
            3, 8, 13, 18, 23,
            4, 9, 14, 19, 24,
            5, 10, 15, 20, 25];

        const pickedNumbers = [1, 7, 13, 19, 25];

        expect(checkBingo(sheet, pickedNumbers, 5)).toBe(true);
    });

    it('should return false if no bingo', () => {
        const sheet = [1, 2, 3, 4, 5,
            6, 7, 8, 9, 10,
            11, 12, 13, 14, 15,
            16, 17, 18, 19, 20,
            21, 22, 23, 24, 25];

        const pickedNumbers = [26, 27, 28, 29, 30];

        expect(checkBingo(sheet, pickedNumbers, 5)).toBe(false);
    });

});
