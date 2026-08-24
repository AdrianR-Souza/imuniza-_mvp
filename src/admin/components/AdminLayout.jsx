import { NavLink } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

const NAV = [
  { to: '/empresa/dashboard', label: 'Painel', icon: '📊' },
  { to: '/empresa/configuracoes', label: 'Configurações', icon: '⚙️' },
]

function NavItem({ to, label, icon, compact }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
          isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
        } ${compact ? 'flex-col gap-0.5 !py-2 !text-[11px]' : ''}`
      }
    >
      <span className={compact ? 'text-lg leading-none' : 'text-base leading-none'}>{icon}</span>
      {label}
    </NavLink>
  )
}

export default function AdminLayout({ children }) {
  const { email, settings, logout } = useAdminAuth()

  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 md:px-6 py-3">
          <div className="flex items-center gap-2 font-extrabold">
            <span className="text-xl">💉</span>
            <span>
              Imuniza<span className="text-indigo-600">+</span>
            </span>
            <span className="ml-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-600">
              Empresa
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-800 leading-tight">{settings.institution || 'Minha instituição'}</p>
              <p className="text-[11px] text-slate-400 leading-tight">{email}</p>
            </div>
            <button
              onClick={logout}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 hover:border-red-200 hover:text-red-600"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-6 px-4 md:px-6 py-6">
        {/* Sidebar (desktop) */}
        <nav className="hidden md:flex w-52 shrink-0 flex-col gap-1">
          {NAV.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        <main className="min-w-0 flex-1 pb-20 md:pb-0">{children}</main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="md:hidden safe-bottom fixed bottom-0 inset-x-0 z-40 flex border-t border-slate-200 bg-white">
        {NAV.map((item) => (
          <div key={item.to} className="flex flex-1 justify-center">
            <NavItem {...item} compact />
          </div>
        ))}
      </nav>
    </div>
  )
}
