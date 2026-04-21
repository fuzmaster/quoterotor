import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia',
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const appUrl = process.env.VITE_APP_URL
    const priceId = process.env.STRIPE_PRICE_ID

    if (!appUrl || !priceId) {
      return res.status(500).json({ error: 'Missing Stripe environment variables' })
    }

    const { email } = req.body || {}

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      success_url: `${appUrl}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/builder`,
      metadata: {
        product: 'quoterotor-premium',
      },
    })

    return res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('create-checkout-session error:', error)
    return res.status(500).json({ error: 'Failed to create checkout session' })
  }
}