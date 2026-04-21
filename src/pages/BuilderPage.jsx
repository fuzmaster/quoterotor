import { useState } from 'react'
import Header from '../components/Header'
import QuoteForm from '../components/QuoteForm'
import QuotePreview from '../components/QuotePreview'
import MobilePreviewModal from '../components/MobilePreviewModal'
import { useAppStore } from '../app/store'

export default function BuilderPage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const quote = useAppStore((s) => s.quote)
  const premiumUnlocked = useAppStore((s) => s.premiumUnlocked)

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 xl:grid-cols-[520px_1fr]">
          <QuoteForm />
          <QuotePreview />
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-4 md:hidden">
        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={() => setIsPreviewOpen(true)}
        >
          Preview Quote
        </button>
      </div>

      <MobilePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        quote={quote}
        premiumUnlocked={premiumUnlocked}
      />
    </div>
  )
}