// Dados agregados de DEMONSTRAÇÃO para o painel da empresa.
// Em produção, viriam da agregação anônima das perguntas feitas no chat de
// dúvidas e das marcações da caderneta (nunca de dados individuais/CPF) —
// é exatamente o produto "radar de desinformação" discutido no modelo de
// negócio (licitação/CPSI com prefeituras).

import { MYTHS } from '../../data/myths.js'

export const COVERAGE_TARGET = 95

// Cobertura vacinal média por bairro/região do município (fictício).
export const REGION_COVERAGE = [
  { region: 'Centro', coverage: 91 },
  { region: 'Zona Norte', coverage: 78 },
  { region: 'Zona Sul', coverage: 96 },
  { region: 'Zona Leste', coverage: 68 },
  { region: 'Zona Oeste', coverage: 83 },
  { region: 'Distrito Industrial', coverage: 61 },
  { region: 'Área Rural', coverage: 54 },
]

// Contagem de vezes que cada mito foi consultado no chat de dúvidas neste
// mês (fictício) — reaproveita a base real de mitos do app.
const MOCK_COUNTS = {
  autismo: 214,
  'covid-vacina-DNA': 176,
  infertilidade: 152,
  'rotavirus-intussuscepcao': 121,
  'dengue-quem-nunca-teve': 98,
  'sobrecarga-imunologica': 87,
  'covid-miocardite': 74,
  'mercurio-aluminio': 61,
  'gotinha-poliomielite': 45,
  'hpv-vida-sexual': 38,
}

export const MYTHS_RANKING = Object.entries(MOCK_COUNTS)
  .map(([id, count]) => {
    const myth = MYTHS.find((m) => m.id === id)
    return myth ? { id, claim: myth.claim.replace(/"/g, ''), verdict: myth.verdict, count } : null
  })
  .filter(Boolean)
  .sort((a, b) => b.count - a.count)

export const KPIS = {
  citizensRegistered: 8420,
  avgCoverage: Math.round(REGION_COVERAGE.reduce((s, r) => s + r.coverage, 0) / REGION_COVERAGE.length),
  mythsCheckedThisMonth: MYTHS_RANKING.reduce((s, m) => s + m.count, 0),
  regionsBelowTarget: REGION_COVERAGE.filter((r) => r.coverage < COVERAGE_TARGET).length,
}

// Tendência de cobertura média nos últimos 6 meses (fictício), para o
// mini-gráfico de evolução.
export const COVERAGE_TREND = [
  { month: 'Mar', coverage: 71 },
  { month: 'Abr', coverage: 73 },
  { month: 'Mai', coverage: 75 },
  { month: 'Jun', coverage: 74 },
  { month: 'Jul', coverage: 77 },
  { month: 'Ago', coverage: 79 },
]
