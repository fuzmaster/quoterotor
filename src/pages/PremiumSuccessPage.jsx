import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import { useAppStore } from '../app/store'

export default function PremiumSuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const setPremiumUnlocked = useAppStore((s) => s.setPremiumUnlocked)

  const [status, setStatus] = useState('loading')
  const [email, setEmail] = useState('')

  useEffect(() => {
    async function verify() {
      if (!sessionId) {
        setStatus('error')
        return
      }

      try {
        const res = await fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Verification failed')
        }

        setPremiumUnlocked(true)
        setEmail(data.email || '')
        setStatus('success')
      } catch (error) {
        console.error(error)
        setStatus('error')
      }
    }

    verify()
  }, [sessionId, setPremiumUnlocked])

  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="hero-shell mx-auto max-w-3xl">
          {status === 'loading' && (
            <>
              <div className="stat-pill">Verifying purchase</div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
                Activating premium...
              </h1>
              <p className="mt-3 text-base text-slate-600">
                We’re confirming your Stripe payment now.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="success-badge">Premium unlocked</div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
                Your premium features are active
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Your QuoteRotor account is unlocked on this device and ready for
                branded quotes.
              </p>

              {email && (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700">
                  Purchase confirmed for <strong>{email}</strong>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/builder" className="btn btn-primary">
                  Return to Builder
                </Link>
                <Link to="/profit-check" className="btn btn-secondary">
                  Back to Profit Check
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Verification issue
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
                We couldn’t confirm your purchase
              </h1>
              <p className="mt-3 text-base text-slate-600">
                Your payment may still have gone through. Head back to the builder
                and use Restore Premium with your purchase email.
              </p>

              <div className="mt-6">
                <Link to="/builder" className="btn btn-secondary">
                  Back to Builder
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}