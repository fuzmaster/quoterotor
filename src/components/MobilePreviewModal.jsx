import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import QuoteDocument from '../pdf/QuoteDocument'
import { isQuoteValid } from '../utils/validation'

export default function MobilePreviewModal({
  isOpen,
  onClose,
  quote,
  premiumUnlocked,
}) {
  if (!isOpen) return null

  const valid = isQuoteValid(quote)

  return (
    <div className="fixed inset-0 z-50 bg-black/60 md:hidden">
      <div className="flex h-full flex-col bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">Quote Preview</div>
            <div className="text-xs text-slate-500">Mobile PDF preview</div>
          </div>

          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="relative flex-1 bg-slate-100">
          {!valid && (
            <div className="absolute inset-x-4 top-4 z-10 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
              Complete the required fields before exporting the PDF.
            </div>
          )}

          <PDFViewer width="100%" height="100%" showToolbar={false}>
            <QuoteDocument quote={quote} premiumUnlocked={premiumUnlocked} />
          </PDFViewer>
        </div>

        <div className="border-t border-slate-200 bg-white p-4">
          <PDFDownloadLink
            document={<QuoteDocument quote={quote} premiumUnlocked={premiumUnlocked} />}
            fileName="quoterotor-estimate.pdf"
            className={`btn w-full ${valid ? 'btn-primary' : 'btn-secondary pointer-events-none opacity-60'}`}
          >
            {({ loading }) =>
              loading ? 'Preparing PDF...' : valid ? 'Download PDF' : 'Form Incomplete'
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  )
}