import {isNPIValid} from '../validateNPI';

describe('isNPIValid()', () => {
  test('correct NPI', () => {
    const result = isNPIValid('7894561238');
    expect(result).toBe(true);
  });
  test('NPI is empty', () => {
    const result = isNPIValid('');
    expect(result).toBe(false);
  });
  test('NPI has less tha 10 characters', () => {
    const result = isNPIValid('78945612');
    expect(result).toBe(false);
  });
  test('NPI has greater than 10 characters', () => {
    const result = isNPIValid('789456124567');
    expect(result).toBe(false);
  });
});
