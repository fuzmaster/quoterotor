import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()

  const navClass = (active) =>
    `rounded-xl px-3 py-2 text-sm font-medium ${
      active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
    }`

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div>
          <div className="text-lg font-bold text-slate-900">QuoteRotor</div>
          <div className="text-xs text-slate-500">Drone quote builder</div>
        </div>

        <nav className="flex items-center gap-2">
          <Link to="/profit-check" className={navClass(pathname === '/profit-check')}>
            Profit Check
          </Link>
          <Link to="/builder" className={navClass(pathname !== '/profit-check')}>
            Builder
          </Link>
        </nav>
      </div>
    </header>
  )
}