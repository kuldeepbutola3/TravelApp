export const PHONE_FIELD_PATTERN = /^[0-9]+$/;

export const isPhoneNumberValid = (phoneNumber: string, phoneType: string) => {
  if (phoneNumber.length !== 10) {
    return false;
  } else if (!PHONE_FIELD_PATTERN.test(phoneNumber)) {
    return false;
  } else if (phoneNumber.startsWith('0') || phoneNumber.startsWith('1')) {
    return false;
  } else if (phoneType.length === 0) {
    return false;
  }
  return true;
};
