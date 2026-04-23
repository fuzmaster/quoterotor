import { useEffect, useState } from 'react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { useAppStore } from '../app/store'
import QuoteDocument from '../pdf/QuoteDocument'
import { isQuoteValid } from '../utils/validation'

export default function QuotePreview() {
  const quote = useAppStore((s) => s.quote)
  const premiumUnlocked = useAppStore((s) => s.premiumUnlocked)

  const [previewKey, setPreviewKey] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const valid = isQuoteValid(quote)

  useEffect(() => {
    setIsRefreshing(true)

    const timer = setTimeout(() => {
      setPreviewKey((k) => k + 1)
      setIsRefreshing(false)
    }, 250)

    return () => clearTimeout(timer)
  }, [
    quote.clientName,
    quote.clientCompany,
    quote.clientEmail,
    quote.projectTitle,
    quote.deliverables,
    quote.shootingFee,
    quote.editingFee,
    quote.licensingFee,
    quote.addonsFee,
    quote.revisionFee,
    quote.travelMode,
    quote.travelMiles,
    quote.customTravelFee,
    quote.notes,
    quote.validDays,
    quote.businessName,
    quote.logoDataUrl,
    quote.accentColor,
    premiumUnlocked,
  ])

  return (
    <div className="card hidden overflow-hidden md:block">
      <div className="preview-toolbar flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <div className="text-lg font-black text-slate-950">Live Quote Preview</div>
          <div className="text-sm text-slate-500">
            {valid ? 'Client-facing PDF preview' : 'Complete required fields to export'}
          </div>
        </div>

        <PDFDownloadLink
          document={<QuoteDocument quote={quote} premiumUnlocked={premiumUnlocked} />}
          fileName="quoterotor-estimate.pdf"
          className={`btn ${valid ? 'btn-primary' : 'btn-secondary pointer-events-none opacity-60'}`}
        >
          {({ loading }) =>
            loading ? 'Preparing PDF...' : valid ? 'Download PDF' : 'Form Incomplete'
          }
        </PDFDownloadLink>
      </div>

      <div className="preview-shell bg-slate-100 p-3">
        <div className="relative h-[740px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-inner">
          {isRefreshing && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/75 backdrop-blur-[1px]">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm">
                Updating preview...
              </div>
            </div>
          )}

          {!valid && (
            <div className="absolute inset-x-6 top-6 z-10 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
              Fill in the required fields to generate a client-ready export.
            </div>
          )}

          <PDFViewer key={previewKey} width="100%" height="100%" showToolbar={false}>
            <QuoteDocument quote={quote} premiumUnlocked={premiumUnlocked} />
          </PDFViewer>
        </div>
      </div>
    </div>
  )
}