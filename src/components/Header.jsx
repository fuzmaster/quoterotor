import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/builder" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-sm">
            QR
          </div>

          <div>
            <div className="text-xl font-black tracking-tight text-slate-950">
              QuoteRotor
            </div>
            <div className="text-sm text-slate-500">
              Professional drone quote builder
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          <NavLink
            to="/profit-check"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Profit Check
          </NavLink>

          <NavLink
            to="/builder"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Builder
          </NavLink>
        </nav>
      </div>
    </header>
  )
}