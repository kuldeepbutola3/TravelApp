import {isFinancialAccountValid} from '../validateFinancialAccount';

describe('isFinancialAccountValid()', () => {
  test('correct financial account', () => {
    const result = isFinancialAccountValid('9854785632', 'Savings');
    expect(result).toBe(true);
  });
  test('financial account number is empty', () => {
    const result = isFinancialAccountValid('', 'checking');
    expect(result).toBe(false);
  });
  test('financial account number less than 4 characters', () => {
    const result = isFinancialAccountValid('12', 'checking');
    expect(result).toBe(false);
  });
  test('financial account number greater than 30 characters', () => {
    const result = isFinancialAccountValid(
      '54875487123265987845122356897845',
      'checking',
    );
    expect(result).toBe(false);
  });
  test('no financial account type', () => {
    const result = isFinancialAccountValid('5412365412', '');
    expect(result).toBe(false);
  });
});
