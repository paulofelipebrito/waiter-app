export function formatCurrency(value: number) {
  return new Intl.NumberFormat('EN-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
