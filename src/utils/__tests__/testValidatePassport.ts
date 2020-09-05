import {isPassportValid} from '../validatePassport';

describe('isPassportValid()', () => {
  test('correct passport number', () => {
    const result = isPassportValid('31195855');
    expect(result).toBe(true);
  });
  test('passport number is empty', () => {
    const result = isPassportValid('');
    expect(result).toBe(false);
  });
  test('passport number less than 6 characters', () => {
    const result = isPassportValid('12345');
    expect(result).toBe(false);
  });
  test('passport number greater than 10 characters', () => {
    const result = isPassportValid('12345678901');
    expect(result).toBe(false);
  });
});
