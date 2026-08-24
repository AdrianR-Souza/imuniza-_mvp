import { motion } from 'framer-motion'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import { COVERAGE_TARGET, REGION_COVERAGE, MYTHS_RANKING, KPIS, COVERAGE_TREND } from '../data/mockAnalytics.js'

const GOOD = '#16A34A' // >= meta
const WARN = '#D97706' // < meta
const SERIES_HUE = '#4F46E5' // indigo-600 — série única (ranking de mitos), sem necessidade de legenda

function KpiTile({ icon, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <span className="text-base leading-none">{icon}</span>
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p>
      {hint && <p className="mt-0.5 text-[11px] text-slate-400">{hint}</p>}
    </div>
  )
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-extrabold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  )
}

function CoverageBarRow({ region, coverage }) {
  const good = coverage >= COVERAGE_TARGET
  const color = good ? GOOD : WARN
  return (
    <div className="group">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="flex items-center gap-1.5 font-semibold text-slate-700">
          <span aria-hidden="true">{good ? '✅' : '⚠️'}</span>
          {region}
        </span>
        <span className="font-bold tabular-nums" style={{ color }}>
          {coverage}%
        </span>
      </div>
      <div className="relative h-3 rounded-full bg-slate-100">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${coverage}%`, backgroundColor: color }}
        />
        <div
          className="absolute inset-y-0 border-l-2 border-dashed border-slate-400/60"
          style={{ left: `${COVERAGE_TARGET}%` }}
        />
        {/* tooltip on hover */}
        <div
          className="pointer-events-none absolute -top-8 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
          style={{ left: `${coverage}%` }}
        >
          {region}: {coverage}% {good ? '(dentro da meta)' : '(abaixo da meta)'}
        </div>
      </div>
    </div>
  )
}

function MythBarRow({ rank, claim, verdict, count, maxCount }) {
  const width = Math.max(6, Math.round((count / maxCount) * 100))
  return (
    <div className="group">
      <div className="flex items-start justify-between gap-3 text-xs mb-1">
        <span className="flex-1 font-semibold text-slate-700 leading-snug">
          <span className="mr-1.5 inline-block w-4 text-slate-300">{rank}.</span>
          "{claim}"
        </span>
        <span className="shrink-0 font-bold tabular-nums text-indigo-600">{count}</span>
      </div>
      <div className="relative ml-6 h-2.5 rounded-full bg-slate-100">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${width}%`, backgroundColor: SERIES_HUE }}
        />
        <div
          className="pointer-events-none absolute -top-8 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
          style={{ left: `${width}%` }}
        >
          {count} consultas este mês · {verdict}
        </div>
      </div>
    </div>
  )
}

function TrendSparkline({ data }) {
  const w = 320
  const h = 88
  const pad = 14
  const values = data.map((d) => d.coverage)
  const min = Math.min(...values) - 4
  const max = Math.max(...values) + 4
  const x = (i) => pad + (i / (data.length - 1)) * (w - pad * 2)
  const y = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2)
  const points = data.map((d, i) => `${x(i)},${y(d.coverage)}`).join(' ')

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxWidth: w }}>
        <polyline points={points} fill="none" stroke={SERIES_HUE} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {data.map((d, i) => (
          <g key={d.month} className="group/dot">
            <circle cx={x(i)} cy={y(d.coverage)} r="8" fill="transparent" />
            <circle cx={x(i)} cy={y(d.coverage)} r="3.5" fill={SERIES_HUE} stroke="white" strokeWidth="1.5" />
            <title>
              {d.month}: {d.coverage}%
            </title>
          </g>
        ))}
      </svg>
      <div className="mt-1 flex justify-between px-3 text-[10px] font-semibold text-slate-400">
        {data.map((d) => (
          <span key={d.month}>{d.month}</span>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { settings } = useAdminAuth()
  const maxMythCount = Math.max(...MYTHS_RANKING.map((m) => m.count))
  const topMyths = MYTHS_RANKING.slice(0, 8)

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900">
          Painel {settings.institution ? `· ${settings.institution}` : ''}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Visão agregada e anônima da cobertura vacinal e das dúvidas/mitos mais consultados pelos cidadãos.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-800">
        <span className="text-sm leading-none">🧪</span>
        <p>
          <strong>Dados de demonstração.</strong> Em produção, os números abaixo viriam da agregação anônima das
          marcações da caderneta e das perguntas feitas no chat de dúvidas dos cidadãos cadastrados — nunca de dados
          individuais ou identificáveis (CPF, nome).
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiTile icon="👥" label="Cidadãos cadastrados" value={KPIS.citizensRegistered.toLocaleString('pt-BR')} />
        <KpiTile icon="📈" label="Cobertura média" value={`${KPIS.avgCoverage}%`} hint={`Meta: ${COVERAGE_TARGET}%`} />
        <KpiTile icon="💬" label="Dúvidas checadas (mês)" value={KPIS.mythsCheckedThisMonth.toLocaleString('pt-BR')} />
        <KpiTile
          icon="⚠️"
          label="Regiões abaixo da meta"
          value={KPIS.regionsBelowTarget}
          hint={`de ${REGION_COVERAGE.length} regiões`}
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <SectionCard title="Cobertura vacinal por região" subtitle={`Linha tracejada = meta de ${COVERAGE_TARGET}%`}>
            <div className="space-y-4">
              {REGION_COVERAGE.slice()
                .sort((a, b) => b.coverage - a.coverage)
                .map((r) => (
                  <CoverageBarRow key={r.region} {...r} />
                ))}
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-2">
          <SectionCard title="Evolução da cobertura média" subtitle="Últimos 6 meses">
            <TrendSparkline data={COVERAGE_TREND} />
          </SectionCard>
        </div>
      </div>

      <SectionCard title="Mitos e dúvidas mais consultados" subtitle="Ranking por nº de consultas ao chat neste mês">
        <div className="space-y-4">
          {topMyths.map((m, i) => (
            <MythBarRow key={m.id} rank={i + 1} maxCount={maxMythCount} {...m} />
          ))}
        </div>
      </SectionCard>
    </motion.div>
  )
}
