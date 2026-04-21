import Header from '../components/Header'
import ProfitCheckForm from '../components/ProfitCheckForm'

export default function ProfitCheckPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <ProfitCheckForm />
      </main>
    </div>
  )
}