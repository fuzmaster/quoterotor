import { useState } from 'react'
import { useAppStore } from '../app/store'

export default function RestorePremiumCard() {
  const setPremiumUnlocked = useAppStore((s) => s.setPremiumUnlocked)

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function handleRestore(e) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/restore-premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Restore failed')
      }

      setPremiumUnlocked(true)
      setStatus('success')
      setMessage(`Premium restored for ${data.email}`)
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Could not restore premium')
    }
  }

  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold text-slate-900">Already purchased?</h2>
      <p className="mt-1 text-sm text-slate-600">
        Restore premium on this device using the email from your purchase.
      </p>

      <form className="mt-4 grid gap-3" onSubmit={handleRestore}>
        <div>
          <label className="label">Purchase Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <button type="submit" className="btn btn-secondary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Restoring...' : 'Restore Premium'}
        </button>

        {message ? (
          <p
            className={`text-sm ${
              status === 'success' ? 'text-emerald-700' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  )
}