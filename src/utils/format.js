export function formatCurrency(value) {
  const num = Number(value || 0)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(num)
}

export function formatPercent(value) {
  return `${Number(value || 0).toFixed(0)}%`
}