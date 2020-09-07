import { formatCurrency } from '../currencyFormatter';

describe('formatCurrency()', () => {
  test('should convert to US currency with default 2 place of decimal', () => {
    const result = formatCurrency('1000');
    expect(result).toBe('$1,000.00');
  });
  test('should convert to US currency till 1 place of decimal', () => {
    const result = formatCurrency('1000.55', 1);
    expect(result).toBe('$1,000.5');
  });
  test('should convert to US currency till 4 place of decimal', () => {
    const result = formatCurrency('1000.55', 4);
    expect(result).toBe('$1,000.5500');
  });

  test('should convert to US currency with no decimal', () => {
    const result = formatCurrency('1002', 0);
    expect(result).toBe('$1,002');
  });
});
