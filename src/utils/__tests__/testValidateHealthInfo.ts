import { isHealthInsuranceIdValid } from '../validateHealthInfo';

describe('isHealthInsuranceIdValid()', () => {
  test('correct health insurance id account', () => {
    const result = isHealthInsuranceIdValid('5678 1234-A', 'PCPL');
    expect(result).toBe(true);
  });
  test('health insurance id number is empty', () => {
    const result = isHealthInsuranceIdValid('', 'PCPL');
    expect(result).toBe(false);
  });
  test('health insurance id number less than 4 characters', () => {
    const result = isHealthInsuranceIdValid('123', 'PCPL');
    expect(result).toBe(false);
  });
  test('health insurance id number greater than 30 characters', () => {
    const result = isHealthInsuranceIdValid('54875487123265987845122356897845', 'PCPL');
    expect(result).toBe(false);
  });
  test('provider name is empty', () => {
    const result = isHealthInsuranceIdValid('5678 1234-A', '');
    expect(result).toBe(false);
  });
  test('provider name less than 2 characters', () => {
    const result = isHealthInsuranceIdValid('5678 1234-A', 'A');
    expect(result).toBe(false);
  });
  test('provider name greater than 100 characters', () => {
    const result = isHealthInsuranceIdValid(
      '5678 1234-A',
      'It is your unique identifier as a policyholder or beneficiary and distinct from your policy number, group number, plan number, or payer ID.'
    );
    expect(result).toBe(false);
  });
});
