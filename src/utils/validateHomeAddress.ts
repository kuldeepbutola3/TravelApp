export const ADDRESS_LINE_PATTERN = /^[0-9a-zA-ZÀ-ȕ-._' ]+$/;
export const ADDRESS_CITY_PATTERN = /^[0-9a-zA-ZÀ-ȕ-._' ]+$/;
export const ZIPCODE_PATTERN = /^[0-9]+$/;

export const isAddressLine1Valid = (street1: string) => {
  if (street1.length < 3 || street1.length > 40) {
    return false;
  } else if (!ADDRESS_LINE_PATTERN.test(street1)) {
    return false;
  }
  return true;
};

export const isAddressLine2Valid = (street2: string) => {
  if (street2.length < 2 || street2.length > 40) {
    return false;
  } else if (!ADDRESS_LINE_PATTERN.test(street2)) {
    return false;
  }
  return true;
};

export const isCityValid = (city: string) => {
  if (city.length < 2 || city.length > 40) {
    return false;
  } else if (!ADDRESS_LINE_PATTERN.test(city)) {
    return false;
  }
  return true;
};

export const isZipcodeValid = (zip: string) => {
  if (zip.length !== 5) {
    return false;
  } else if (!ZIPCODE_PATTERN.test(zip)) {
    return false;
  }
  return true;
};
