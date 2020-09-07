export const formatCurrency = (amount: string, fractionDigit?: number): string => {
  const amountInDecimal: string = parseFloat(amount).toFixed(fractionDigit ?? 2);
  const amountSplit = amountInDecimal.split('.');

  let beforeDec = amountSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (amountSplit?.length > 1) {
    beforeDec = beforeDec + '.' + amountSplit[1];
  }
  return '$' + beforeDec;
};
