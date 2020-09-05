export const DRIVER_LICENSE_FIELD_PATTERN = /^[0-9a-zA-Z -]+$/;

export const isDriverLicenseValid = (passport: string) => {
  if (passport.length < 4 || passport.length > 20) {
    return false;
  } else if (!DRIVER_LICENSE_FIELD_PATTERN.test(passport)) {
    return false;
  }
  return true;
};
