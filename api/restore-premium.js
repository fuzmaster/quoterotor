import { getPremiumByEmail } from './_lib/entitlements.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email } = req.body || {}
    const normalized = String(email || '').trim().toLowerCase()

    if (!normalized) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const entitlement = await getPremiumByEmail(normalized)

    if (!entitlement?.premium) {
      return res.status(404).json({ error: 'No premium purchase found for that email' })
    }

    return res.status(200).json({
      premium: true,
      email: normalized,
    })
  } catch (error) {
    console.error('restore-premium error:', error)
    return res.status(500).json({ error: 'Failed to restore premium' })
  }
}