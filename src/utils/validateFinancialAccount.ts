export const FINANCIAL_ACCOUNT_NUMBER_FIELD_PATTERN = /^[0-9a-zA-Z-. ]+$/;

export const isFinancialAccountValid = (
  financialAccountNumber: string,
  accountType: string,
) => {
  if (financialAccountNumber.length < 4 || financialAccountNumber.length > 30) {
    return false;
  } else if (
    !FINANCIAL_ACCOUNT_NUMBER_FIELD_PATTERN.test(financialAccountNumber)
  ) {
    return false;
  } else if (accountType.length === 0) {
    return false;
  }
  return true;
};
