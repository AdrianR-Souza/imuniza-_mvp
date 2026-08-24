// Perguntas para o modo "Aprender" (estilo Duolingo) — geram XP ao responder.
// `phases`: fases da vida às quais a pergunta é relevante. 'geral' aparece
// para qualquer pessoa cadastrada, independentemente da faixa etária.

import { PHASES } from './vaccines.js'

export const QUIZ = [
  {
    id: 'q1',
    phases: ['crianca'],
    question: 'Qual vacina protege contra a paralisia infantil?',
    options: ['BCG', 'VIP (Poliomielite)', 'Hepatite A', 'HPV'],
    answer: 1,
    explanation: 'A VIP (vacina inativada poliomielite) protege contra o poliovírus, causador da paralisia infantil.',
  },
  {
    id: 'q2',
    phases: ['crianca'],
    question: 'A vacina tríplice viral protege contra quais doenças?',
    options: ['Tétano, difteria e coqueluche', 'Sarampo, caxumba e rubéola', 'Hepatite A, B e C', 'Dengue, zika e chikungunya'],
    answer: 1,
    explanation: 'SCR = Sarampo, Caxumba e Rubéola — por isso o nome "tríplice viral".',
  },
  {
    id: 'q3',
    phases: ['adolescente', 'adulto', 'idoso'],
    question: 'De quanto em quanto tempo é recomendado o reforço da vacina dT (difteria e tétano) em adultos?',
    options: ['A cada 1 ano', 'A cada 5 anos', 'A cada 10 anos', 'Nunca precisa reforçar'],
    answer: 2,
    explanation: 'A proteção contra tétano e difteria diminui com o tempo — o reforço é recomendado a cada 10 anos.',
  },
  {
    id: 'q4',
    phases: ['adolescente'],
    question: 'A vacina contra HPV ajuda a prevenir principalmente qual tipo de câncer?',
    options: ['Câncer de pele', 'Câncer de colo do útero', 'Câncer de pulmão', 'Câncer de mama'],
    answer: 1,
    explanation: 'A vacina HPV reduz fortemente o risco de câncer de colo do útero e outros cânceres associados ao HPV.',
  },
  {
    id: 'q5',
    phases: ['crianca', 'adulto', 'idoso'],
    question: 'A vacina injetável contra gripe pode causar gripe?',
    options: ['Sim, sempre', 'Não, ela usa vírus inativado ou fragmentos do vírus', 'Só em crianças', 'Só se tomada em jejum'],
    answer: 1,
    explanation: 'Como usa vírus inativado, a vacina injetável não pode causar a doença — o mal-estar leve é resposta imune normal.',
  },
  {
    id: 'q6',
    phases: ['crianca'],
    question: 'Por que bebês tomam várias vacinas combinadas (ex: pentavalente) sem "sobrecarregar" a imunidade?',
    options: [
      'Porque o corpo já lida com muito mais estímulos do ambiente todos os dias',
      'Porque as vacinas são fracas',
      'Porque só uma dose realmente funciona',
      'Não é seguro, por isso é feito aos poucos',
    ],
    answer: 0,
    explanation: 'O sistema imunológico lida diariamente com muito mais antígenos do ambiente do que os presentes nas vacinas combinadas.',
  },
  {
    id: 'q7',
    phases: ['geral'],
    question: 'Qual é a origem do mito "vacina causa autismo"?',
    options: [
      'Um estudo grande e confirmado por décadas',
      'Um estudo de 1998 retratado por fraude, do médico Andrew Wakefield',
      'Recomendação oficial da OMS',
      'Estudos brasileiros recentes',
    ],
    answer: 1,
    explanation: 'O estudo original foi retratado pela revista científica por fraude, e o autor perdeu sua licença médica.',
  },
  {
    id: 'q8',
    phases: ['geral'],
    question: 'Vacinas de mRNA (como algumas contra Covid-19) alteram o DNA da pessoa?',
    options: ['Sim, sempre', 'Não — o mRNA não entra no núcleo da célula e é degradado em poucos dias', 'Só em idosos', 'Depende do fabricante'],
    answer: 1,
    explanation: 'O mRNA age no citoplasma da célula, nunca entra no núcleo (onde fica o DNA), e é rapidamente degradado.',
  },
  {
    id: 'q9',
    phases: ['crianca'],
    question: 'Quando a vacina contra febre amarela é recomendada em crianças?',
    options: ['Ao nascer', 'Aos 9 meses, com reforço aos 4 anos', 'Só após os 18 anos', 'Não existe vacina'],
    answer: 1,
    explanation: 'O esquema infantil é 1 dose aos 9 meses e reforço aos 4 anos de idade.',
  },
  {
    id: 'q10',
    phases: ['geral'],
    question: 'Qual sinal exige buscar atendimento de emergência após febre alta em criança pequena?',
    options: [
      'Dor leve no local da vacina',
      'Manchas roxas na pele + rigidez de nuca + dor de cabeça intensa',
      'Choro por 10 minutos',
      'Sono um pouco maior que o normal',
    ],
    answer: 1,
    explanation: 'Esse conjunto de sinais pode indicar meningite/meningococcemia — é uma emergência médica.',
  },
]

// Perguntas relevantes para quem está na fase X: as da própria fase, das
// fases anteriores (cumulativo, igual à lógica de relevantVaccines) e as
// gerais (que valem para qualquer pessoa cadastrada).
export function relevantQuiz(phaseId) {
  const idx = PHASES.findIndex((p) => p.id === phaseId)
  if (idx === -1) return QUIZ
  const eligiblePhaseIds = PHASES.slice(0, idx + 1).map((p) => p.id)
  return QUIZ.filter((q) => q.phases.includes('geral') || q.phases.some((ph) => eligiblePhaseIds.includes(ph)))
}

export const XP_PER_CORRECT = 15
export const XP_PER_VACCINE_MARKED = 5
export const XP_PER_MYTH_CHECKED = 10

export function levelFromXp(xp) {
  // Curva simples: cada nível pede um pouco mais de XP que o anterior.
  let level = 1
  let remaining = xp
  let needed = 50
  while (remaining >= needed) {
    remaining -= needed
    level += 1
    needed = Math.round(needed * 1.25)
  }
  return { level, into: remaining, needed }
}
