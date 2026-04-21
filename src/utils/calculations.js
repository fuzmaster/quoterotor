export const IRS_MILEAGE_RATE = 0.67

export function safeNumber(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

export function calculateProfitCheck({
  totalQuote,
  travelHours,
  onSiteHours,
  editHours,
  taxRate,
}) {
  const quote = safeNumber(totalQuote)
  const travel = safeNumber(travelHours)
  const onsite = safeNumber(onSiteHours)
  const edit = safeNumber(editHours)
  const tax = safeNumber(taxRate) / 100

  const totalHours = travel + onsite + edit
  const grossHourly = totalHours > 0 ? quote / totalHours : 0
  const netTakeHome = quote * (1 - tax)
  const takeHomeHourly = totalHours > 0 ? netTakeHome / totalHours : 0

  return {
    totalHours,
    grossHourly,
    netTakeHome,
    takeHomeHourly,
    underpriced: takeHomeHourly < 30,
  }
}

export function calculateQuoteTotals(quote) {
  const shooting = safeNumber(quote.shootingFee)
  const editing = safeNumber(quote.editingFee)
  const licensing = safeNumber(quote.licensingFee)
  const addons = safeNumber(quote.addonsFee)
  const revisions = safeNumber(quote.revisionFee)

  const mileage = safeNumber(quote.travelMiles) * IRS_MILEAGE_RATE
  const customTravel = safeNumber(quote.customTravelFee)
  const travel = quote.travelMode === 'mileage' ? mileage : customTravel

  const subtotal = shooting + editing + licensing + addons + revisions + travel

  return {
    shooting,
    editing,
    licensing,
    addons,
    revisions,
    travel,
    subtotal,
  }
}