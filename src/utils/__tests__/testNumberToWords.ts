import { convertNumToWord } from '../number-to-word/number-to-words';

describe('convertNumToWord()', () => {
  test('single digit number', () => {
    const result = convertNumToWord('7');
    expect(result).toBe('seven');
  });
  test('two digit number', () => {
    const result = convertNumToWord('15');
    expect(result).toBe('fifteen');
  });
  test('undefined number', () => {
    const result = convertNumToWord('120');
    expect(result).toBe(undefined);
  });
});
