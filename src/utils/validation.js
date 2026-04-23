export function validateQuote(quote) {
  const errors = {}

  const clientName = String(quote.clientName || '').trim()
  const clientEmail = String(quote.clientEmail || '').trim()
  const projectTitle = String(quote.projectTitle || '').trim()
  const deliverables = String(quote.deliverables || '').trim()

  const numericFields = [
    'shootingFee',
    'editingFee',
    'licensingFee',
    'addonsFee',
    'revisionFee',
    'travelMiles',
    'customTravelFee',
    'validDays',
  ]

  if (!clientName) {
    errors.clientName = 'Client name is required'
  }

  if (!clientEmail) {
    errors.clientEmail = 'Client email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
    errors.clientEmail = 'Enter a valid email address'
  }

  if (!projectTitle) {
    errors.projectTitle = 'Project title is required'
  }

  if (!deliverables) {
    errors.deliverables = 'Deliverables are required'
  }

  for (const field of numericFields) {
    const value = Number(quote[field] ?? 0)
    if (Number.isNaN(value) || value < 0) {
      errors[field] = 'Must be 0 or more'
    }
  }

  if (Number(quote.validDays) < 1) {
    errors.validDays = 'Must be at least 1 day'
  }

  if (quote.travelMode === 'mileage' && Number(quote.travelMiles) < 0) {
    errors.travelMiles = 'Miles must be 0 or more'
  }

  if (quote.travelMode === 'custom' && Number(quote.customTravelFee) < 0) {
    errors.customTravelFee = 'Travel fee must be 0 or more'
  }

  return errors
}

export function isQuoteValid(quote) {
  return Object.keys(validateQuote(quote)).length === 0
}