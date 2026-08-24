import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../context/AppContext.jsx'

export default function XpToast() {
  const { toast } = useApp()

  return (
    <div className="fixed top-4 inset-x-0 z-[60] flex justify-center pointer-events-none px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.key}
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="pointer-events-auto flex items-center gap-2 rounded-full bg-brand-900 text-white pl-2 pr-4 py-2 shadow-soft"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-brand-950 text-sm font-extrabold">
              +{toast.amount}
            </span>
            <span className="text-sm font-medium">{toast.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
