import { isPhoneNumberValid } from '../validatePhone';

describe('isPhoneNumberValid()', () => {
  test('correct phone number', () => {
    const result = isPhoneNumberValid('7254496331', 'Mobile');
    expect(result).toBe(true);
  });
  test('phone number is empty', () => {
    const result = isPhoneNumberValid('', 'Mobile');
    expect(result).toBe(false);
  });
  test('phone number is not 10 characters long', () => {
    const result = isPhoneNumberValid('725449633', 'Mobile');
    expect(result).toBe(false);
  });
  test('phone number starts with 0', () => {
    const result = isPhoneNumberValid('0254496331', 'Mobile');
    expect(result).toBe(false);
  });
  test('phone number starts with 1', () => {
    const result = isPhoneNumberValid('1254496331', 'Mobile');
    expect(result).toBe(false);
  });
  test('no phone number type', () => {
    const result = isPhoneNumberValid('7254496331', '');
    expect(result).toBe(false);
  });
});
