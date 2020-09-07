export const NPI_FIELD_PATTERN = /^[0-9]+$/;

export const isNPIValid = (npi: string) => {
  if (npi.length !== 10) {
    return false;
  } else if (!NPI_FIELD_PATTERN.test(npi)) {
    return false;
  }
  return true;
};
