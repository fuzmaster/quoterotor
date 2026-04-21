import Header from '../components/Header'
import QuoteForm from '../components/QuoteForm'
import QuotePreview from '../components/QuotePreview'

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 xl:grid-cols-[520px_1fr]">
          <QuoteForm />
          <QuotePreview />
        </div>
      </main>
    </div>
  )
}