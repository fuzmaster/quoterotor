import { useState } from 'react'
import { useAppStore } from '../app/store'
import { IRS_MILEAGE_RATE } from '../utils/calculations'
import { QUOTE_PRESETS } from '../data/presets'
import PremiumModal from './PremiumModal'

const MAX_LOGO_SIZE_MB = 2

export default function QuoteForm() {
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false)

  const quote = useAppStore((s) => s.quote)
  const updateQuote = useAppStore((s) => s.updateQuote)
  const resetQuote = useAppStore((s) => s.resetQuote)
  const premiumUnlocked = useAppStore((s) => s.premiumUnlocked)

  function handleChange(e) {
    const { name, value } = e.target
    updateQuote({ [name]: value })
  }

  function handlePresetChange(e) {
    const presetKey = e.target.value

    if (!presetKey) {
      resetQuote()
      return
    }

    const preset = QUOTE_PRESETS[presetKey]
    if (!preset) return

    updateQuote(preset.values)
  }

  function handleLogoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    const maxBytes = MAX_LOGO_SIZE_MB * 1024 * 1024
    if (file.size > maxBytes) {
      alert(`Logo file is too large. Please use an image under ${MAX_LOGO_SIZE_MB}MB.`)
      e.target.value = ''
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.')
      e.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      updateQuote({ logoDataUrl: reader.result })
    }
    reader.readAsDataURL(file)
  }

  function removeLogo() {
    updateQuote({ logoDataUrl: '' })
  }

  return (
    <>
      <div className="card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Quote Builder</h1>
            <p className="mt-1 text-sm text-slate-600">
              Build a clean, client-ready estimate without messing with Word.
            </p>
          </div>

          {premiumUnlocked ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Premium unlocked
            </span>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsPremiumModalOpen(true)}>
              Unlock Premium
            </button>
          )}
        </div>

        {!premiumUnlocked && (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="text-sm font-semibold text-amber-900">Premium features</div>
            <div className="mt-2 text-sm text-amber-800">
              Unlock custom branding, logo upload, accent color control, and cleaner client-ready exports.
            </div>
            <ul className="mt-3 space-y-1 text-sm text-amber-900">
              <li>• Remove watermark</li>
              <li>• Upload your logo</li>
              <li>• Use custom accent colors</li>
              <li>• Save a more branded look</li>
            </ul>
          </div>
        )}

        <div className="mt-6 grid gap-6">
          <section>
            <div className="section-title">Quick Start</div>
            <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <label className="label">Load a Preset</label>
                <select className="input" defaultValue="" onChange={handlePresetChange}>
                  <option value="">Start from current / blank</option>
                  <option value="realEstate">Real Estate Shoot</option>
                  <option value="roofInspection">Roof Inspection</option>
                  <option value="weddingAerial">Wedding Aerial Add-On</option>
                  <option value="constructionProgress">Construction Progress Shoot</option>
                </select>
              </div>

              <div className="flex items-end">
                <button type="button" className="btn btn-secondary w-full sm:w-auto" onClick={resetQuote}>
                  Reset Quote
                </button>
              </div>
            </div>
          </section>

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
                <label className="label">Business Name</label>
                <input className="input" name="businessName" value={quote.businessName} onChange={handleChange} />
              </div>

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
                    <p className="mt-1 text-xs text-slate-500">Locked in free version</p>
                  )}
                </div>
              </div>

              <div>
                <label className="label">Logo Upload</label>

                {!premiumUnlocked ? (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                    Locked in free version. Upgrade to upload your logo and brand exported quotes.
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <input
                      className="input"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />

                    {quote.logoDataUrl ? (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                          Logo Preview
                        </div>
                        <img
                          src={quote.logoDataUrl}
                          alt="Uploaded logo preview"
                          className="max-h-20 max-w-full object-contain"
                        />
                        <button
                          type="button"
                          className="btn btn-secondary mt-3"
                          onClick={removeLogo}
                        >
                          Remove Logo
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">
                        Use a clean PNG or JPG under 2MB.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </>
  )
}