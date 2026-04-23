import { useMemo, useState } from 'react'
import { useAppStore } from '../app/store'
import { IRS_MILEAGE_RATE } from '../utils/calculations'
import { QUOTE_PRESETS } from '../data/presets'
import { validateQuote } from '../utils/validation'
import PremiumModal from './PremiumModal'

const MAX_LOGO_SIZE_MB = 2

function FieldError({ error }) {
  if (!error) return null
  return <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
}

export default function QuoteForm() {
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false)
  const [touched, setTouched] = useState({})

  const quote = useAppStore((s) => s.quote)
  const updateQuote = useAppStore((s) => s.updateQuote)
  const resetQuote = useAppStore((s) => s.resetQuote)
  const premiumUnlocked = useAppStore((s) => s.premiumUnlocked)

  const errors = useMemo(() => validateQuote(quote), [quote])

  function handleChange(e) {
    const { name, value } = e.target
    updateQuote({ [name]: value })
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function handlePresetChange(e) {
    const presetKey = e.target.value
    if (!presetKey) {
      resetQuote()
      setTouched({})
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

  function inputClass(name) {
    return `input ${touched[name] && errors[name] ? 'border-red-300 focus:border-red-300 focus:shadow-none' : ''}`
  }

  return (
    <>
      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-6">
          <div className="flex flex-col gap-5">
            <div className="hero-shell">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap gap-2">
                    <span className="stat-pill">Built for drone operators</span>
                    <span className="feature-chip">Client-ready PDF quotes</span>
                  </div>

                  <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
                    Send professional drone quotes in minutes
                  </h1>

                  <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                    Price travel, editing, licensing, and add-ons clearly...
                    then export a quote that looks polished enough to win the job.
                  </p>
                </div>

                {premiumUnlocked ? (
                  <span className="success-badge">Premium unlocked</span>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsPremiumModalOpen(true)}
                  >
                    Unlock Premium
                  </button>
                )}
              </div>
            </div>

            {!premiumUnlocked && (
              <div className="info-panel">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-lg font-black text-slate-950">
                      Free gets you the quote. Premium makes it look sellable.
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Upgrade once to remove the watermark, upload your logo, use
                      custom brand colors, and restore premium later by email.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                      Launch price
                    </div>
                    <div className="mt-1 text-3xl font-black">$49</div>
                    <div className="text-sm text-slate-300">One-time</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 p-6">
          <section className="form-section">
            <div className="section-title">Quick Start</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <label className="label" htmlFor="preset-select">
                  Load a Preset
                </label>
                <select
                  id="preset-select"
                  className="input"
                  defaultValue=""
                  onChange={handlePresetChange}
                >
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

          <section className="form-section">
            <div className="section-title">Client Info</div>
            <div className="field-grid mt-4">
              <div>
                <label className="label" htmlFor="clientName">
                  Client Name
                </label>
                <input
                  id="clientName"
                  className={inputClass('clientName')}
                  name="clientName"
                  value={quote.clientName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FieldError error={touched.clientName ? errors.clientName : ''} />
              </div>

              <div>
                <label className="label" htmlFor="clientCompany">
                  Company
                </label>
                <input
                  id="clientCompany"
                  className="input"
                  name="clientCompany"
                  value={quote.clientCompany}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="label" htmlFor="clientEmail">
                  Client Email
                </label>
                <input
                  id="clientEmail"
                  className={inputClass('clientEmail')}
                  name="clientEmail"
                  value={quote.clientEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FieldError error={touched.clientEmail ? errors.clientEmail : ''} />
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="section-title">Project</div>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="label" htmlFor="projectTitle">
                  Project Title
                </label>
                <input
                  id="projectTitle"
                  className={inputClass('projectTitle')}
                  name="projectTitle"
                  value={quote.projectTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FieldError error={touched.projectTitle ? errors.projectTitle : ''} />
              </div>

              <div>
                <label className="label" htmlFor="deliverables">
                  Deliverables
                </label>
                <textarea
                  id="deliverables"
                  className={`${inputClass('deliverables')} min-h-32`}
                  name="deliverables"
                  value={quote.deliverables}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="helper">
                  Describe exactly what the client gets: photo count, video length, revisions, or delivery format.
                </p>
                <FieldError error={touched.deliverables ? errors.deliverables : ''} />
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="section-title">Pricing</div>
            <div className="field-grid mt-4">
              <div>
                <label className="label" htmlFor="shootingFee">
                  Flight / Shooting Fee
                </label>
                <input id="shootingFee" className={inputClass('shootingFee')} type="number" min="0" name="shootingFee" value={quote.shootingFee} onChange={handleChange} onBlur={handleBlur} />
                <FieldError error={touched.shootingFee ? errors.shootingFee : ''} />
              </div>

              <div>
                <label className="label" htmlFor="editingFee">
                  Editing Fee
                </label>
                <input id="editingFee" className={inputClass('editingFee')} type="number" min="0" name="editingFee" value={quote.editingFee} onChange={handleChange} onBlur={handleBlur} />
                <FieldError error={touched.editingFee ? errors.editingFee : ''} />
              </div>

              <div>
                <label className="label" htmlFor="licensingFee">
                  Licensing / Usage Fee
                </label>
                <input id="licensingFee" className={inputClass('licensingFee')} type="number" min="0" name="licensingFee" value={quote.licensingFee} onChange={handleChange} onBlur={handleBlur} />
                <FieldError error={touched.licensingFee ? errors.licensingFee : ''} />
              </div>

              <div>
                <label className="label" htmlFor="addonsFee">
                  Optional Add-ons
                </label>
                <input id="addonsFee" className={inputClass('addonsFee')} type="number" min="0" name="addonsFee" value={quote.addonsFee} onChange={handleChange} onBlur={handleBlur} />
                <FieldError error={touched.addonsFee ? errors.addonsFee : ''} />
              </div>

              <div>
                <label className="label" htmlFor="revisionFee">
                  Revision Buffer
                </label>
                <input id="revisionFee" className={inputClass('revisionFee')} type="number" min="0" name="revisionFee" value={quote.revisionFee} onChange={handleChange} onBlur={handleBlur} />
                <FieldError error={touched.revisionFee ? errors.revisionFee : ''} />
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="section-title">Travel</div>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="label" htmlFor="travelMode">
                  Travel Mode
                </label>
                <select id="travelMode" className="input" name="travelMode" value={quote.travelMode} onChange={handleChange}>
                  <option value="mileage">IRS mileage</option>
                  <option value="custom">Custom flat travel fee</option>
                </select>
              </div>

              {quote.travelMode === 'mileage' ? (
                <div>
                  <label className="label" htmlFor="travelMiles">
                    Round-trip Miles
                  </label>
                  <input
                    id="travelMiles"
                    className={inputClass('travelMiles')}
                    type="number"
                    min="0"
                    name="travelMiles"
                    value={quote.travelMiles}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className="helper">
                    Using IRS mileage rate: ${IRS_MILEAGE_RATE.toFixed(2)} per mile
                  </p>
                  <FieldError error={touched.travelMiles ? errors.travelMiles : ''} />
                </div>
              ) : (
                <div>
                  <label className="label" htmlFor="customTravelFee">
                    Custom Travel Fee
                  </label>
                  <input
                    id="customTravelFee"
                    className={inputClass('customTravelFee')}
                    type="number"
                    min="0"
                    name="customTravelFee"
                    value={quote.customTravelFee}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FieldError error={touched.customTravelFee ? errors.customTravelFee : ''} />
                </div>
              )}
            </div>
          </section>

          <section className="form-section">
            <div className="section-title">Branding & Terms</div>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="label" htmlFor="businessName">
                  Business Name
                </label>
                <input id="businessName" className="input" name="businessName" value={quote.businessName} onChange={handleChange} />
              </div>

              <div>
                <label className="label" htmlFor="notes">
                  Notes / Terms
                </label>
                <textarea id="notes" className="input min-h-32" name="notes" value={quote.notes} onChange={handleChange} />
              </div>

              <div className="field-grid">
                <div>
                  <label className="label" htmlFor="validDays">
                    Estimate Valid For (Days)
                  </label>
                  <input
                    id="validDays"
                    className={inputClass('validDays')}
                    type="number"
                    min="1"
                    name="validDays"
                    value={quote.validDays}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FieldError error={touched.validDays ? errors.validDays : ''} />
                </div>

                <div>
                  <label className="label" htmlFor="accentColor">
                    Accent Color
                  </label>
                  <input
                    id="accentColor"
                    className="input h-12"
                    type="color"
                    name="accentColor"
                    value={quote.accentColor}
                    onChange={handleChange}
                    disabled={!premiumUnlocked}
                  />
                  {!premiumUnlocked && (
                    <p className="locked-note">Premium only</p>
                  )}
                </div>
              </div>

              <div>
                <label className="label">Logo Upload</label>

                {!premiumUnlocked ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm text-slate-500">
                    Premium only. Upload your logo to brand exported quotes.
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <input className="input" type="file" accept="image/*" onChange={handleLogoUpload} />

                    {quote.logoDataUrl ? (
                      <div className="rounded-3xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                          Logo Preview
                        </div>
                        <img
                          src={quote.logoDataUrl}
                          alt="Uploaded logo preview"
                          className="mt-3 max-h-20 max-w-full object-contain"
                        />
                        <button type="button" className="btn btn-secondary mt-4" onClick={removeLogo}>
                          Remove Logo
                        </button>
                      </div>
                    ) : (
                      <p className="helper">Use a clean PNG or JPG under 2MB.</p>
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