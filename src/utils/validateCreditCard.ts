export type CreditCardType =
  | 'american express'
  | 'discover'
  | 'mastercard'
  | 'visa'
  | 'unknown';

export const cardTypeFromCardNumberString = (value: string): CreditCardType => {
  const MASK_CHARACTERS = /[_()-\s]/g;

  const input = String(value).replace(MASK_CHARACTERS, '');
  // Validators
  const type = checkIIN(input);
  return type !== 'unknown' && checkLuhn(input) ? type : 'unknown';
};

// https://en.wikipedia.org/wiki/Luhn_algorithm
function checkLuhn(value: string) {
  let length_ = value.length;
  // Check the min/max cc digits
  if (length_ < 12 || length_ > 19) {
    return false;
  }
  // Calculate the luhn checksum
  let ca;
  let sum = 0;
  let mul = 0;
  while (length_--) {
    ca = Number.parseInt(value.charAt(length_), 10) << mul; //eslint-disable-line no-bitwise
    sum += ca - (ca > 9 ? 1 : 0) * 9;
    mul ^= 1; //eslint-disable-line no-bitwise
  }
  return sum % 10 === 0 && sum > 0;
}

// https://baymard.com/checkout-usability/credit-card-patterns
function checkIIN(string: string): CreditCardType {
  // Examine the first digit
  let iin = string.slice(0, 1);
  const length_ = string.length;
  switch (iin) {
    case '4': // VISA
      return length_ === 16 ? 'visa' : 'unknown';
    case '5': // MASTER CARD
      iin = string.slice(0, 2);
      if (iin >= '51' && iin <= '55') {
        return length_ === 16 ? 'mastercard' : 'unknown';
      }
      break;
    case '6': // DISCOVER
      iin = string.slice(0, 3);
      if (iin >= '644' && iin <= '659') {
        return length_ === 16 ? 'discover' : 'unknown';
      }
      iin = string.slice(0, 4);
      if (iin === '6011') {
        return length_ === 16 ? 'discover' : 'unknown';
      }
      // 622126‑622925
      iin = string.slice(0, 6);
      if (iin >= '622126' && iin <= '622925') {
        return length_ === 16 ? 'discover' : 'unknown';
      }
      break;
    case '3': // AMERICAN EXPRESS
      iin = string.slice(0, 2);
      if (iin === '34' || iin === '37') {
        return length_ === 15 ? 'american express' : 'unknown';
      }
      break;
    default:
  }
  return 'unknown';
}
