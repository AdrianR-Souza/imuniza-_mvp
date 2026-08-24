import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext.jsx'

export default function LevelBar({ compact = false }) {
  const { level } = useApp()
  const pct = Math.min(100, Math.round((level.into / level.needed) * 100))

  return (
    <div className={compact ? 'flex items-center gap-2' : 'flex items-center gap-3'}>
      <div
        className={`shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-white font-extrabold shadow-soft ${
          compact ? 'h-8 w-8 text-xs' : 'h-11 w-11 text-sm'
        }`}
        aria-hidden
      >
        {level.level}
      </div>
      <div className="flex-1 min-w-[90px]">
        {!compact && (
          <div className="flex items-center justify-between text-[11px] font-semibold text-brand-900/60 mb-1">
            <span>Nível {level.level}</span>
            <span>
              {level.into}/{level.needed} XP
            </span>
          </div>
        )}
        <div className={`w-full rounded-full bg-brand-100 overflow-hidden ${compact ? 'h-2' : 'h-2.5'}`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
    </div>
  )
}
