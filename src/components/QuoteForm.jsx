import { useAppStore } from '../app/store'
import { IRS_MILEAGE_RATE } from '../utils/calculations'

export default function QuoteForm() {
  const quote = useAppStore((s) => s.quote)
  const updateQuote = useAppStore((s) => s.updateQuote)
  const premiumUnlocked = useAppStore((s) => s.premiumUnlocked)
  const setPremiumUnlocked = useAppStore((s) => s.setPremiumUnlocked)

  function handleChange(e) {
    const { name, value } = e.target
    updateQuote({ [name]: value })
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quote Builder</h1>
          <p className="mt-1 text-sm text-slate-600">
            Build a clean, client-ready estimate without messing with Word.
          </p>
        </div>

        {!premiumUnlocked ? (
          <button className="btn btn-secondary" onClick={() => setPremiumUnlocked(true)}>
            Demo Unlock Premium
          </button>
        ) : (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Premium unlocked
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-6">
        <section>
          <div className="section-title">Client Info</div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Client Name</label>
              <input className="input" name="clientName" value={quote.clientName} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Company</label>
              <input className="input" name="clientCompany" value={quote.clientCompany} onChange={handleChange} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Client Email</label>
              <input className="input" name="clientEmail" value={quote.clientEmail} onChange={handleChange} />
            </div>
          </div>
        </section>

        <section>
          <div className="section-title">Project</div>
          <div className="mt-3 grid gap-4">
            <div>
              <label className="label">Project Title</label>
              <input className="input" name="projectTitle" value={quote.projectTitle} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Deliverables</label>
              <textarea className="input min-h-28" name="deliverables" value={quote.deliverables} onChange={handleChange} />
            </div>
          </div>
        </section>

        <section>
          <div className="section-title">Pricing</div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Flight / Shooting Fee</label>
              <input className="input" type="number" name="shootingFee" value={quote.shootingFee} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Editing Fee</label>
              <input className="input" type="number" name="editingFee" value={quote.editingFee} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Licensing / Usage Fee</label>
              <input className="input" type="number" name="licensingFee" value={quote.licensingFee} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Optional Add-ons</label>
              <input className="input" type="number" name="addonsFee" value={quote.addonsFee} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Revision Buffer</label>
              <input className="input" type="number" name="revisionFee" value={quote.revisionFee} onChange={handleChange} />
            </div>
          </div>
        </section>

        <section>
          <div className="section-title">Travel</div>
          <div className="mt-3 grid gap-4">
            <div>
              <label className="label">Travel Mode</label>
              <select className="input" name="travelMode" value={quote.travelMode} onChange={handleChange}>
                <option value="mileage">IRS mileage</option>
                <option value="custom">Custom flat travel fee</option>
              </select>
            </div>

            {quote.travelMode === 'mileage' ? (
              <div>
                <label className="label">Round-trip Miles</label>
                <input className="input" type="number" name="travelMiles" value={quote.travelMiles} onChange={handleChange} />
                <p className="mt-1 text-xs text-slate-500">
                  Using IRS mileage rate: ${IRS_MILEAGE_RATE.toFixed(2)} / mile
                </p>
              </div>
            ) : (
              <div>
                <label className="label">Custom Travel Fee</label>
                <input className="input" type="number" name="customTravelFee" value={quote.customTravelFee} onChange={handleChange} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="section-title">Notes & Branding</div>
          <div className="mt-3 grid gap-4">
            <div>
              <label className="label">Notes / Terms</label>
              <textarea className="input min-h-28" name="notes" value={quote.notes} onChange={handleChange} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Estimate Valid For (Days)</label>
                <input className="input" type="number" name="validDays" value={quote.validDays} onChange={handleChange} />
              </div>

              <div>
                <label className="label">Accent Color</label>
                <input
                  className="input h-11"
                  type="color"
                  name="accentColor"
                  value={quote.accentColor}
                  onChange={handleChange}
                  disabled={!premiumUnlocked}
                />
                {!premiumUnlocked && (
                  <p className="mt-1 text-xs text-slate-500">Premium only</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}