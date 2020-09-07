import { isEmailValid } from '../validateEmail';

describe('isEmailValid()', () => {
  test('correct email', () => {
    const result = isEmailValid('abc@gmail.com');
    expect(result).toBe(true);
  });
  test('incorrect email', () => {
    const result = isEmailValid('abgmail.com');
    expect(result).toBe(false);
  });
});
