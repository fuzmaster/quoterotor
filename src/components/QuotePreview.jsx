import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { useAppStore } from '../app/store'
import QuoteDocument from '../pdf/QuoteDocument'

export default function QuotePreview() {
  const quote = useAppStore((s) => s.quote)
  const premiumUnlocked = useAppStore((s) => s.premiumUnlocked)

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">Live Quote Preview</div>
          <div className="text-xs text-slate-500">PDF-ready</div>
        </div>

        <PDFDownloadLink
          document={<QuoteDocument quote={quote} premiumUnlocked={premiumUnlocked} />}
          fileName="quoterotor-estimate.pdf"
          className="btn btn-primary"
        >
          {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>

      <div className="h-[780px] bg-slate-100">
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          <QuoteDocument quote={quote} premiumUnlocked={premiumUnlocked} />
        </PDFViewer>
      </div>
    </div>
  )
}