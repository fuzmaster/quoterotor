import { useState } from 'react'
import Header from '../components/Header'
import QuoteForm from '../components/QuoteForm'
import QuotePreview from '../components/QuotePreview'
import MobilePreviewModal from '../components/MobilePreviewModal'
import RestorePremiumCard from '../components/RestorePremiumCard'
import { useAppStore } from '../app/store'

export default function BuilderPage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const quote = useAppStore((s) => s.quote)
  const premiumUnlocked = useAppStore((s) => s.premiumUnlocked)

  return (
    <div className="min-h-screen bg-transparent pb-24 md:pb-0">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[560px_1fr]">
          <div className="grid gap-6">
            <QuoteForm />
            {!premiumUnlocked && <RestorePremiumCard />}
          </div>

          <QuotePreview />
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-4 backdrop-blur md:hidden">
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