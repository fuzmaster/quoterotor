const entitlementStore = globalThis.__quoterotorEntitlements || new Map()

if (!globalThis.__quoterotorEntitlements) {
  globalThis.__quoterotorEntitlements = entitlementStore
}

export function grantPremium(email) {
  if (!email) return

  entitlementStore.set(email.toLowerCase(), {
    premium: true,
    grantedAt: new Date().toISOString(),
  })
}

export function getPremiumByEmail(email) {
  if (!email) return null
  return entitlementStore.get(email.toLowerCase()) || null
}