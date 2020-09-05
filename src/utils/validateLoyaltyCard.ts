export const LOYALTY_CARD_FIELD_PATTERN = /^[0-9a-zA-Z]+$/;

export const isLoyaltyCardValid = (
  loyaltyCardNumber: string,
  cardName: string,
) => {
  if (loyaltyCardNumber.length < 4 || loyaltyCardNumber.length > 25) {
    return false;
  } else if (!LOYALTY_CARD_FIELD_PATTERN.test(loyaltyCardNumber)) {
    return false;
  } else if (cardName.length < 4 || cardName.length > 40) {
    return false;
  } else if (!LOYALTY_CARD_FIELD_PATTERN.test(cardName)) {
    return false;
  }
  return true;
};
