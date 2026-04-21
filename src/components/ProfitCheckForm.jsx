import { Link } from 'react-router-dom'
import { useAppStore } from '../app/store'
import { calculateProfitCheck } from '../utils/calculations'
import { formatCurrency } from '../utils/format'

export default function ProfitCheckForm() {
  const profitCheck = useAppStore((s) => s.profitCheck)
  const updateProfitCheck = useAppStore((s) => s.updateProfitCheck)

  const result = calculateProfitCheck(profitCheck)

  function handleChange(e) {
    const { name, value } = e.target
    updateProfitCheck({ [name]: value })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-slate-900">Drone Profit Reality Check</h1>
        <p className="mt-2 text-sm text-slate-600">
          See what your quote is actually paying you after travel, editing, and taxes.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Total Job Quote ($)</label>
            <input className="input" type="number" name="totalQuote" value={profitCheck.totalQuote} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Travel Hours (Round Trip)</label>
            <input className="input" type="number" step="0.1" name="travelHours" value={profitCheck.travelHours} onChange={handleChange} />
          </div>
          <div>
            <label className="label">On-Site Hours</label>
            <input className="input" type="number" step="0.1" name="onSiteHours" value={profitCheck.onSiteHours} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Editing Hours</label>
            <input className="input" type="number" step="0.1" name="editHours" value={profitCheck.editHours} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Estimated Tax Rate (%)</label>
            <input className="input" type="number" name="taxRate" value={profitCheck.taxRate} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="section-title">Reality</div>
        <div className="mt-4 grid gap-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Gross Hourly</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{formatCurrency(result.grossHourly)}</div>
          </div>

          <div className={`rounded-2xl p-4 ${result.underpriced ? 'bg-red-50' : 'bg-emerald-50'}`}>
            <div className={`text-xs font-semibold uppercase tracking-wide ${result.underpriced ? 'text-red-600' : 'text-emerald-700'}`}>
              True Take-Home Hourly
            </div>
            <div className={`mt-2 text-4xl font-bold ${result.underpriced ? 'text-red-700' : 'text-emerald-700'}`}>
              {formatCurrency(result.takeHomeHourly)}
            </div>
            <p className={`mt-2 text-sm ${result.underpriced ? 'text-red-700' : 'text-emerald-700'}`}>
              {result.underpriced
                ? 'This job is probably underpriced. Travel and edits are eating your margin.'
                : 'This quote is at least protecting your time better.'}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="text-sm text-slate-600">
              Total hours: <strong>{result.totalHours.toFixed(1)}</strong>
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Estimated take-home after tax: <strong>{formatCurrency(result.netTakeHome)}</strong>
            </div>
          </div>

          <Link to="/builder" className="btn btn-primary w-full">
            Build a Quote That Protects Your Margins
          </Link>
        </div>
      </div>
    </div>
  )
}