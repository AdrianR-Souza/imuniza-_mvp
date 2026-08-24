// Trilha de recompensas por engajamento com a carteira de vacinação.
// A contagem usada é o total de vacinas marcadas como tomadas (takenVaccines.length).
// Conteúdo demonstrativo (hackathon) — em produção os prêmios seriam configuráveis
// pela instituição parceira (prefeitura/operadora) na tela de Configurações.

export const REWARDS = [
  {
    id: 'squeeze',
    threshold: 5,
    icon: '🧴',
    title: 'Garrafa squeeze',
    short: 'Squeeze Imuniza+',
    description: 'Uma garrafa squeeze exclusiva Imuniza+ para te lembrar de continuar se cuidando (e se hidratando) no dia a dia.',
  },
  {
    id: 'voucher',
    threshold: 8,
    icon: '🎟️',
    title: 'Voucher de desconto',
    short: 'Desconto em consulta',
    description: 'Voucher de desconto para consultas médicas em clínicas parceiras da sua região.',
  },
  {
    id: 'priority',
    threshold: 10,
    icon: '⚡',
    title: 'Prioridade no agendamento',
    short: 'Agendamento prioritário',
    description: 'Prioridade na fila de agendamento de consultas e exames em unidades parceiras.',
  },
  {
    id: 'freeconsult',
    threshold: 15,
    icon: '🩺',
    title: 'Consulta gratuita',
    short: '1 consulta grátis',
    description: 'Uma consulta médica gratuita, sem custo, em clínica parceira do programa.',
  },
]

export const REWARDS_MAX = REWARDS[REWARDS.length - 1].threshold

export function rewardStatus(count) {
  let nextReward = null
  const withStatus = REWARDS.map((r) => {
    const unlocked = count >= r.threshold
    if (!unlocked && !nextReward) nextReward = r
    return { ...r, unlocked }
  })
  return { rewards: withStatus, nextReward }
}
