import Stripe from 'stripe'
import { getPremiumByEmail, grantPremium } from './_lib/entitlements.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia',
})

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { session_id: sessionId } = req.query

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing session_id' })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    const email =
      session.customer_details?.email ||
      session.customer_email ||
      null

    if (!email) {
      return res.status(400).json({ error: 'No email found on session' })
    }

    const existing = getPremiumByEmail(email)

    if (!existing && session.payment_status === 'paid') {
      grantPremium(email)
    }

    return res.status(200).json({
      premium: true,
      email,
    })
  } catch (error) {
    console.error('verify-session error:', error)
    return res.status(500).json({ error: 'Failed to verify session' })
  }
}