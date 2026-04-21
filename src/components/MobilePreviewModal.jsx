import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import QuoteDocument from '../pdf/QuoteDocument'

export default function MobilePreviewModal({
  isOpen,
  onClose,
  quote,
  premiumUnlocked,
}) {
  if (!isOpen) return null

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

        <div className="flex-1 bg-slate-100">
          <PDFViewer width="100%" height="100%" showToolbar={false}>
            <QuoteDocument quote={quote} premiumUnlocked={premiumUnlocked} />
          </PDFViewer>
        </div>

        <div className="border-t border-slate-200 bg-white p-4">
          <PDFDownloadLink
            document={<QuoteDocument quote={quote} premiumUnlocked={premiumUnlocked} />}
            fileName="quoterotor-estimate.pdf"
            className="btn btn-primary w-full"
          >
            {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  )
}