export const NUMBER_PATTERN = /^[0-9]+$/;

export const isCreditCardValid = (cardNumber: string) => {
  if (cardNumber.length < 10 || cardNumber.length > 19) {
    return false;
  } else if (!NUMBER_PATTERN.test(cardNumber)) {
    return false;
  }
  return true;
};
