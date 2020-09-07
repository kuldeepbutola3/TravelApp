import { isLoyaltyCardValid } from '../validateLoyaltyCard';

describe('isLoyaltyCardValid()', () => {
  test('correct loyalty card', () => {
    const result = isLoyaltyCardValid('56KL1234AQ', 'TheNorthFace');
    expect(result).toBe(true);
  });
  test('loyalty card number is empty', () => {
    const result = isLoyaltyCardValid('', 'TheNorthFace');
    expect(result).toBe(false);
  });
  test('loyalty card number has less than 4 characters', () => {
    const result = isLoyaltyCardValid('123', 'TheNorthFace');
    expect(result).toBe(false);
  });
  test('loyalty card number has greater than 25 characters', () => {
    const result = isLoyaltyCardValid('56KL1234AQ56KL1234AQ56KL12AQ', 'TheNorthFace');
    expect(result).toBe(false);
  });
  test('card name is empty', () => {
    const result = isLoyaltyCardValid('56KL1234AQ', '');
    expect(result).toBe(false);
  });
  test('card name has less than 4 characters', () => {
    const result = isLoyaltyCardValid('56KL1234AQ', 'XYZ');
    expect(result).toBe(false);
  });
  test('card name has greater than 40 characters', () => {
    const result = isLoyaltyCardValid(
      '56KL1234AQ',
      'Card Names cannot exceed 40 characters in length'
    );
    expect(result).toBe(false);
  });
});
