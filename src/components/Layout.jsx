import { NavLink } from 'react-router-dom'
import LevelBar from './LevelBar.jsx'
import XpToast from './XpToast.jsx'

const NAV = [
  { to: '/', label: 'Início', icon: '🏠' },
  { to: '/vacinas', label: 'Vacinas', icon: '💉' },
  { to: '/duvidas', label: 'Dúvidas', icon: '💬' },
  { to: '/aprender', label: 'Aprender', icon: '🎯' },
  { to: '/beneficios', label: 'Benefícios', icon: '🎁' },
  { to: '/perfil', label: 'Perfil', icon: '👤' },
]

function NavItemMobile({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
          isActive ? 'text-brand-600' : 'text-brand-900/40'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`text-lg leading-none transition-transform ${isActive ? 'scale-110' : ''}`}>{icon}</span>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  )
}

function NavItemDesktop({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
          isActive ? 'bg-brand-50 text-brand-700' : 'text-brand-900/55 hover:bg-brand-50/60 hover:text-brand-800'
        }`
      }
    >
      <span className="text-base leading-none">{icon}</span>
      {label}
    </NavLink>
  )
}

export default function Layout({ children }) {
  return (
    <div className="min-h-full bg-sand-50 text-brand-950">
      <XpToast />

      {/* Header (desktop) */}
      <header className="hidden md:block sticky top-0 z-40 border-b border-brand-900/5 bg-sand-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-3">
          <div className="flex items-center gap-2 font-extrabold text-brand-800">
            <span className="text-xl">💉</span>
            <span className="text-lg">
              Imuniza<span className="text-gold-500">+</span>
            </span>
          </div>
          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <NavItemDesktop key={item.to} {...item} />
            ))}
          </nav>
          <div className="w-40">
            <LevelBar compact />
          </div>
        </div>
      </header>

      {/* Header (mobile) */}
      <header className="md:hidden sticky top-0 z-40 border-b border-brand-900/5 bg-sand-50/90 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1.5 font-extrabold text-brand-800">
            <span className="text-lg">💉</span>
            <span>
              Imuniza<span className="text-gold-500">+</span>
            </span>
          </div>
          <div className="w-32">
            <LevelBar compact />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 md:px-6 pt-4 md:pt-8 pb-28 md:pb-16">{children}</main>

      {/* Bottom nav (mobile) */}
      <nav className="md:hidden safe-bottom fixed bottom-0 inset-x-0 z-40 border-t border-brand-900/5 bg-white/95 backdrop-blur flex">
        {NAV.map((item) => (
          <NavItemMobile key={item.to} {...item} />
        ))}
      </nav>
    </div>
  )
}
