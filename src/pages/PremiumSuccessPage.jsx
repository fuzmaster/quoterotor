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
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="card p-8">
          {status === 'loading' && (
            <>
              <h1 className="text-2xl font-bold text-slate-900">Activating premium...</h1>
              <p className="mt-2 text-slate-600">We’re confirming your payment.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <h1 className="text-2xl font-bold text-slate-900">Premium unlocked</h1>
              <p className="mt-2 text-slate-600">
                Your QuoteRotor premium features are now active.
              </p>
              {email && (
                <p className="mt-2 text-sm text-slate-500">
                  Purchase confirmed for <strong>{email}</strong>
                </p>
              )}
              <div className="mt-6">
                <Link to="/builder" className="btn btn-primary">
                  Return to Builder
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <h1 className="text-2xl font-bold text-slate-900">We couldn’t verify your purchase</h1>
              <p className="mt-2 text-slate-600">
                Your payment may still have gone through, but the app could not confirm it yet.
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