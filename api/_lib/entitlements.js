import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function entitlementKey(email) {
  return `premium:${normalizeEmail(email)}`
}

export async function grantPremium(email, extra = {}) {
  const normalized = normalizeEmail(email)
  if (!normalized) return null

  const payload = {
    premium: true,
    email: normalized,
    grantedAt: new Date().toISOString(),
    ...extra,
  }

  await redis.set(entitlementKey(normalized), JSON.stringify(payload))
  return payload
}

export async function getPremiumByEmail(email) {
  const normalized = normalizeEmail(email)
  if (!normalized) return null

  const raw = await redis.get(entitlementKey(normalized))
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}