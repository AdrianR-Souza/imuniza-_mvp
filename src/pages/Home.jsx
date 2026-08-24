import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext.jsx'
import { PHASES, relevantVaccines } from '../data/vaccines.js'
import CoverageRing from '../components/CoverageRing.jsx'

const CARDS = [
  {
    to: '/vacinas',
    icon: '💉',
    title: 'Minhas vacinas',
    desc: 'Marque o que já tomou e veja o risco de deixar alguma de fora.',
    color: 'from-brand-500 to-brand-700',
  },
  {
    to: '/duvidas',
    icon: '💬',
    title: 'Tirar uma dúvida',
    desc: 'Viu algo sobre vacina nas redes? Confira com fontes oficiais.',
    color: 'from-sky-500 to-sky-600',
  },
  {
    to: '/aprender',
    icon: '🎯',
    title: 'Modo Aprender',
    desc: 'Responda perguntas rápidas e suba de nível.',
    color: 'from-gold-400 to-gold-500',
  },
]

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
      {children}
    </span>
  )
}

export default function Home() {
  const { profile, takenVaccines, level, streakDays } = useApp()
  const phase = PHASES.find((p) => p.id === profile.phase)
  const relevant = relevantVaccines(profile.phase)
  const takenCount = relevant.filter((v) => takenVaccines.includes(v.id)).length
  const pct = relevant.length ? (takenCount / relevant.length) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Hero: banner de cor cheia (paleta do gênero cadastrado), com selos
          e a caderneta em destaque — inspirado no layout de referência. */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 p-6 md:p-8 text-white shadow-soft"
      >
        <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-wrap items-center gap-2">
          <Pill>
            {phase?.icon} {phase?.label}
          </Pill>
          <Pill>🔥 {streakDays} {streakDays === 1 ? 'dia' : 'dias'}</Pill>
          <Pill>⭐ Nível {level.level}</Pill>
        </div>

        <p className="relative mt-4 text-sm font-medium text-white/70">Olá, {profile.name}</p>
        <h1 className="relative text-2xl md:text-3xl font-extrabold leading-tight text-balance">Sua imunização em dia?</h1>

        <div className="relative mt-5 flex items-center gap-5 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <CoverageRing percent={pct} label="em dia" light />
          <div className="flex-1">
            <p className="text-sm text-white/80">
              Você marcou <span className="font-bold text-white">{takenCount}</span> de{' '}
              <span className="font-bold text-white">{relevant.length}</span> vacinas recomendadas para a fase{' '}
              <span className="font-bold text-white">{phase?.label.toLowerCase()}</span>.
            </p>
            <Link
              to="/vacinas"
              className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-700 shadow-soft transition-transform hover:scale-[1.02]"
            >
              Ver caderneta completa →
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.to}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Link
              to={c.to}
              className="group block h-full rounded-2xl bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-2xl shadow-soft`}>
                {c.icon}
              </div>
              <h3 className="mt-3 font-extrabold text-brand-950">{c.title}</h3>
              <p className="mt-1 text-sm text-brand-900/55 leading-snug">{c.desc}</p>
              <span className="mt-3 inline-block text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
                Abrir →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl bg-brand-950 text-white p-5 md:p-6 flex items-center justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold text-gold-300 uppercase tracking-wide">Nível {level.level}</p>
          <p className="mt-1 text-sm text-white/70">Continue respondendo dúvidas e quizzes para subir de nível.</p>
        </div>
        <Link to="/aprender" className="shrink-0 rounded-full bg-gold-400 px-4 py-2 text-sm font-bold text-brand-950">
          Ganhar XP
        </Link>
      </motion.div>
    </div>
  )
}
