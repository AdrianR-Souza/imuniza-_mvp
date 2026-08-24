import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext.jsx'
import { REWARDS_MAX, rewardStatus } from '../data/rewards.js'

function TrailNode({ reward, isNext }) {
  const leftPct = (reward.threshold / REWARDS_MAX) * 100

  return (
    <div
      className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
      style={{ left: `${leftPct}%` }}
    >
      <div
        className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl shadow-card transition-transform ${
          reward.unlocked
            ? 'bg-brand-500 text-white'
            : isNext
              ? 'bg-white text-brand-900 ring-4 ring-gold-300 scale-105'
              : 'bg-white text-brand-900/30 ring-2 ring-brand-900/10'
        }`}
      >
        <span className={reward.unlocked ? '' : isNext ? '' : 'grayscale opacity-70'}>{reward.icon}</span>
        {reward.unlocked && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs text-white shadow">
            ✓
          </span>
        )}
        {!reward.unlocked && !isNext && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-900/20 text-xs text-white">
            🔒
          </span>
        )}
      </div>
      <div
        className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
          reward.unlocked ? 'bg-brand-100 text-brand-700' : 'bg-white text-brand-900/50 shadow-card'
        }`}
      >
        {reward.threshold} vacinas
      </div>
    </div>
  )
}

function RewardCard({ reward, isNext, remaining }) {
  return (
    <div
      className={`flex items-start gap-3.5 rounded-2xl border p-4 transition-colors ${
        reward.unlocked
          ? 'border-brand-200 bg-brand-50/60'
          : isNext
            ? 'border-gold-300 bg-gold-50/50'
            : 'border-brand-900/8 bg-white'
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${
          reward.unlocked ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-900/50'
        }`}
      >
        {reward.icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-extrabold text-brand-950">{reward.title}</p>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              reward.unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-900/5 text-brand-900/40'
            }`}
          >
            {reward.threshold} vacinas
          </span>
        </div>
        <p className="mt-1 text-sm text-brand-900/60">{reward.description}</p>
        {reward.unlocked ? (
          <p className="mt-2 text-xs font-bold text-emerald-600">✓ Desbloqueado — resgate na sua próxima visita a uma UBS parceira</p>
        ) : isNext ? (
          <p className="mt-2 text-xs font-bold text-gold-600">
            Faltam {remaining} vacina{remaining === 1 ? '' : 's'} para desbloquear
          </p>
        ) : (
          <p className="mt-2 text-xs font-semibold text-brand-900/35">Bloqueado</p>
        )}
      </div>
    </div>
  )
}

export default function Beneficios() {
  const { takenVaccines } = useApp()
  const count = takenVaccines.length
  const { rewards, nextReward } = rewardStatus(count)
  const progressPct = Math.min(100, (count / REWARDS_MAX) * 100)
  const remainingForNext = nextReward ? nextReward.threshold - count : 0

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-950">Benefícios</h1>
        <p className="mt-1 text-sm text-brand-900/55">
          Quanto mais vacinas em dia, mais recompensas você desbloqueia. Você já marcou{' '}
          <span className="font-bold text-brand-700">{count}</span> vacina{count === 1 ? '' : 's'}.
        </p>
      </div>

      {/* Trilha de recompensas — rolagem horizontal, como uma nova aba */}
      <div className="rounded-3xl bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-sm font-extrabold text-brand-950">Sua trilha de recompensas</p>
          {nextReward ? (
            <p className="text-xs font-bold text-gold-600">
              Faltam {remainingForNext} para "{nextReward.title}"
            </p>
          ) : (
            <p className="text-xs font-bold text-emerald-600">Tudo desbloqueado! 🎉</p>
          )}
        </div>

        <div className="mt-6 overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch]">
          <div className="relative h-28" style={{ minWidth: '640px' }}>
            {/* trilho de fundo + preenchido, ambos relativos à mesma largura útil */}
            <div className="absolute inset-x-8 top-1/2 h-2 -translate-y-1/2">
              <div className="absolute inset-0 rounded-full bg-brand-100" />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-brand-500 transition-[width] duration-700 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            {/* nós da trilha, posicionados na mesma largura útil do trilho acima */}
            <div className="absolute inset-x-8 top-1/2 h-0 -translate-y-1/2">
              {rewards.map((r) => (
                <TrailNode key={r.id} reward={r} isNext={nextReward?.id === r.id} />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-1 text-center text-[11px] font-medium text-brand-900/35 md:hidden">← arraste para o lado para ver a trilha →</p>
      </div>

      {/* Lista detalhada — acessível sem depender da rolagem */}
      <div className="space-y-3">
        {rewards.map((r) => (
          <RewardCard key={r.id} reward={r} isNext={nextReward?.id === r.id} remaining={r.threshold - count} />
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-brand-900/15 p-4 text-xs text-brand-900/45">
        Protótipo de hackathon: prêmios ilustrativos, sem integração com estoque ou pagamento real. Em produção, o resgate seria
        confirmado presencialmente em uma UBS ou clínica parceira, usando o cadastro do cidadão.
      </div>
    </motion.div>
  )
}
