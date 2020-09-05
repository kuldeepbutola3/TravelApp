export const PASSPORT_FIELD_PATTERN = /^[0-9a-zA-Z]+$/;

export const isPassportValid = (passport: string) => {
  if (passport.length < 6 || passport.length > 10) {
    return false;
  } else if (!PASSPORT_FIELD_PATTERN.test(passport)) {
    return false;
  }
  return true;
};
