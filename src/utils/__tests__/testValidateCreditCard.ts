import {cardTypeFromCardNumberString} from '../validateCreditCard';

describe('cardTypeFromCardNumberString()', () => {
  test('should accept valid Visa test number', () => {
    const result = cardTypeFromCardNumberString('4012-8888-8888-1881');
    expect(result).toBe('visa');
  });
  test('should accept valid MasterCard test number', () => {
    const result = cardTypeFromCardNumberString('5105-1051-0510-5100');
    expect(result).toBe('mastercard');
  });
  test('should accept valid Amex test number', () => {
    const result = cardTypeFromCardNumberString('3714-496353-98431');
    expect(result).toBe('american express');
  });
  test('should accept valid Discover test number', () => {
    const result = cardTypeFromCardNumberString('6011-0009-9013-9424');
    expect(result).toBe('discover');
  });
  test('should reject invalid numbers', () => {
    const result = cardTypeFromCardNumberString('1234-5678-9101-2131');
    expect(result).toBe('unknown');
  });
});
