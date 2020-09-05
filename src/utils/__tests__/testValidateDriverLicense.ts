import {isDriverLicenseValid} from '../validateDriverLicense';

describe('isDriverLicenseValid()', () => {
  test('correct license', () => {
    const result = isDriverLicenseValid('F255-9215-0094');
    expect(result).toBe(true);
  });
  test('license is empty', () => {
    const result = isDriverLicenseValid('');
    expect(result).toBe(false);
  });
  test('license less than 4 characters', () => {
    const result = isDriverLicenseValid('510');
    expect(result).toBe(false);
  });
  test('license greater than 20 characters', () => {
    const result = isDriverLicenseValid('3714546544963534565498431');
    expect(result).toBe(false);
  });
});
