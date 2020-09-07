export const SSN_FIELD_PATTERN = /^[0-9]/;

export const isSSNNumberValid = (ssnNumber: string) => {
  if (ssnNumber.length !== 9) {
    return false;
  } else if (!SSN_FIELD_PATTERN.test(ssnNumber)) {
    return false;
  }
  return true;
};
