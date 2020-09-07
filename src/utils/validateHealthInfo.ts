export const HEALTH_INSURANCE_ID_FIELD_PATTERN = /^[0-9a-zA-Z -]+$/;

export const isHealthInsuranceIdValid = (healthInsuranceId: string, providerName: string) => {
  if (healthInsuranceId.length < 4 || healthInsuranceId.length > 30) {
    return false;
  } else if (!HEALTH_INSURANCE_ID_FIELD_PATTERN.test(healthInsuranceId)) {
    return false;
  } else if (providerName.length < 2 || providerName.length > 100) {
    return false;
  }
  return true;
};
