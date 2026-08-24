import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PHASES, VACCINES } from '../data/vaccines.js'
import { useApp } from '../context/AppContext.jsx'

function RiskReport({ vaccine }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden"
    >
      <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm">
        <p className="font-bold text-amber-900">⚠️ Possíveis riscos por não estar vacinado(a)</p>
        <p className="mt-1 text-amber-900/80">{vaccine.diseaseDetail}</p>
        <ul className="mt-2 space-y-1">
          {vaccine.consequences.map((c) => (
            <li key={c} className="flex gap-2 text-amber-900/85">
              <span>•</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-white/70 p-2.5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-brand-700">Efeitos esperados da vacina</p>
            <p className="mt-0.5 text-brand-900/70">{vaccine.adverseEffects.join(' · ')}</p>
          </div>
          <div className="rounded-lg bg-white/70 p-2.5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-red-600">Procure atendimento se</p>
            <p className="mt-0.5 text-brand-900/70">{vaccine.seekCareIf.join(' · ')}</p>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-amber-900/50">
          Conteúdo educativo baseado no Calendário Nacional de Vacinação (PNI/Ministério da Saúde). Não substitui avaliação de um
          profissional de saúde — leve sua caderneta a uma UBS para confirmar seu esquema vacinal.
        </p>
      </div>
    </motion.div>
  )
}

function VaccineCard({ vaccine, taken, onToggle }) {
  return (
    <motion.div
      layout
      className={`rounded-2xl border p-4 md:p-5 transition-colors ${
        taken ? 'border-brand-200 bg-brand-50/50' : 'border-brand-900/8 bg-white'
      } shadow-card`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{vaccine.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-brand-950">{vaccine.name}</p>
          <p className="text-xs text-brand-900/50">{vaccine.doseInfo}</p>
          <p className="mt-1 text-sm text-brand-900/70">
            Previne: <span className="font-semibold text-brand-900/85">{vaccine.disease}</span>
          </p>
        </div>
        <button
          onClick={() => onToggle(vaccine.id)}
          aria-pressed={taken}
          aria-label={taken ? 'Marcar como não tomada' : 'Marcar como tomada'}
          className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-full border-2 text-base font-bold transition-all ${
            taken
              ? 'border-brand-500 bg-brand-500 text-white'
              : 'border-brand-900/15 text-brand-900/25 hover:border-brand-400 hover:text-brand-500'
          }`}
        >
          {taken ? '✓' : '✕'}
        </button>
      </div>
      <AnimatePresence>{!taken && <RiskReport vaccine={vaccine} />}</AnimatePresence>
    </motion.div>
  )
}

export default function Vacinas() {
  const { profile, takenVaccines, toggleVaccine } = useApp()

  // Só mostramos a fase atual do paciente e as fases anteriores (cumulativo):
  // alguém adulto já deveria ter tomado as vacinas de criança/adolescente
  // também, mas não faz sentido mostrar vacinas de uma fase futura ainda não
  // alcançada (ex.: uma criança não precisa ver vacinas específicas de idoso).
  const eligiblePhases = useMemo(() => {
    const idx = PHASES.findIndex((p) => p.id === profile.phase)
    return idx === -1 ? PHASES : PHASES.slice(0, idx + 1)
  }, [profile.phase])

  const [tab, setTab] = useState(profile.phase)
  const [onlyPending, setOnlyPending] = useState(false)

  // Se o cadastro mudar (ex.: correção da data de nascimento no Perfil) e a
  // aba selecionada não existir mais entre as fases elegíveis, volta para a
  // fase atual do paciente.
  useEffect(() => {
    if (!eligiblePhases.some((p) => p.id === tab)) setTab(profile.phase)
  }, [eligiblePhases, profile.phase, tab])

  const list = useMemo(() => {
    const byPhase = VACCINES.filter((v) => v.phases.includes(tab))
    return onlyPending ? byPhase.filter((v) => !takenVaccines.includes(v.id)) : byPhase
  }, [tab, onlyPending, takenVaccines])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-950">Sua caderneta de vacinação</h1>
        <p className="mt-1 text-sm text-brand-900/55">
          Mostrando vacinas até a sua faixa etária cadastrada. Marque com um ✕ → ✓ as que você já tomou.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        {eligiblePhases.map((p) => (
          <button
            key={p.id}
            onClick={() => setTab(p.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              tab === p.id ? 'bg-brand-600 text-white shadow-soft' : 'bg-white text-brand-900/60 border border-brand-900/10'
            }`}
          >
            {p.icon} {p.label}
          </button>
        ))}
      </div>

      <label className="flex w-fit items-center gap-2 text-sm font-medium text-brand-900/60">
        <input
          type="checkbox"
          checked={onlyPending}
          onChange={(e) => setOnlyPending(e.target.checked)}
          className="h-4 w-4 rounded accent-brand-600"
        />
        Mostrar só as pendentes
      </label>

      <div className="grid gap-3 md:grid-cols-2">
        {list.map((v) => (
          <VaccineCard key={v.id} vaccine={v} taken={takenVaccines.includes(v.id)} onToggle={toggleVaccine} />
        ))}
        {list.length === 0 && (
          <p className="col-span-full rounded-2xl bg-white p-6 text-center text-sm text-brand-900/50 shadow-card">
            Nenhuma vacina pendente nessa fase. 🎉
          </p>
        )}
      </div>
    </div>
  )
}
