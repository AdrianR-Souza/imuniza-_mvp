import { PHASES, phaseFromBirthDate, ageFromBirthDate } from '../data/vaccines.js'
import { formatCPF, formatPhone, isValidEmail, isValidCPF, isValidPhone } from '../utils/format.js'

const todayISO = () => new Date().toISOString().slice(0, 10)

export function isPatientFormValid(v) {
  return (
    v.name.trim().length > 1 &&
    isValidEmail(v.email) &&
    isValidCPF(v.cpf) &&
    isValidPhone(v.telefone) &&
    Boolean(v.birthDate) &&
    Boolean(phaseFromBirthDate(v.birthDate)) &&
    (v.gender === 'homem' || v.gender === 'mulher')
  )
}

const GENDER_OPTIONS = [
  { id: 'homem', label: 'Homem', swatch: '#0E9594' },
  { id: 'mulher', label: 'Mulher', swatch: '#562C2C' },
]

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-brand-900/80">{label}</span>
      {children}
    </label>
  )
}

// Como "Cor do app" envolve um grupo de botões (não um único campo), usamos
// <div>/<p> em vez de <label> — um <label> ao redor de vários controles
// bagunça o nome acessível de cada botão para leitores de tela.
function FieldGroup({ label, children }) {
  return (
    <div className="block">
      <p className="block text-sm font-semibold text-brand-900/80">{label}</p>
      {children}
    </div>
  )
}

const inputClass =
  'mt-1.5 w-full rounded-xl border border-brand-900/10 bg-brand-50/40 px-4 py-3 text-sm font-medium outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200'

export default function PatientForm({ value, onChange }) {
  const set = (key) => (e) => onChange({ ...value, [key]: e.target.value })
  const phase = phaseFromBirthDate(value.birthDate)
  const age = ageFromBirthDate(value.birthDate)
  const phaseInfo = PHASES.find((p) => p.id === phase)

  return (
    <div className="space-y-4">
      <Field label="Nome completo">
        <input value={value.name} onChange={set('name')} placeholder="Seu nome" className={inputClass} autoComplete="name" />
      </Field>

      <FieldGroup label="Cor do app">
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {GENDER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              aria-pressed={value.gender === opt.id}
              onClick={() => onChange({ ...value, gender: opt.id })}
              className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-colors ${
                value.gender === opt.id ? 'border-brand-500 bg-brand-50' : 'border-brand-900/10 hover:border-brand-300'
              }`}
            >
              <span
                className="h-6 w-6 shrink-0 rounded-full border border-black/10 shadow-inner"
                style={{ backgroundColor: opt.swatch }}
                aria-hidden
              />
              <span className="text-sm font-bold text-brand-900">{opt.label}</span>
            </button>
          ))}
        </div>
      </FieldGroup>

      <Field label="E-mail (Gmail)">
        <input
          type="email"
          value={value.email}
          onChange={set('email')}
          placeholder="voce@gmail.com"
          className={inputClass}
          autoComplete="email"
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="CPF">
          <input
            value={value.cpf}
            onChange={(e) => onChange({ ...value, cpf: formatCPF(e.target.value) })}
            placeholder="000.000.000-00"
            inputMode="numeric"
            maxLength={14}
            className={inputClass}
          />
        </Field>
        <Field label="Telefone">
          <input
            value={value.telefone}
            onChange={(e) => onChange({ ...value, telefone: formatPhone(e.target.value) })}
            placeholder="(11) 90000-0000"
            inputMode="numeric"
            maxLength={16}
            className={inputClass}
            autoComplete="tel"
          />
        </Field>
      </div>

      <Field label="Data de nascimento">
        <input
          type="date"
          value={value.birthDate}
          onChange={set('birthDate')}
          max={todayISO()}
          className={inputClass}
          autoComplete="bday"
        />
      </Field>

      <div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
          phaseInfo ? 'border-brand-300 bg-brand-50' : 'border-dashed border-brand-900/15 bg-brand-50/30'
        }`}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-2xl shadow-soft">
          {phaseInfo ? phaseInfo.icon : '❔'}
        </div>
        <div className="text-sm">
          {phaseInfo ? (
            <>
              <p className="font-bold text-brand-900">
                Fase: {phaseInfo.label} ({age} anos)
              </p>
              <p className="text-brand-900/50">
                Avatar e vacinas serão ajustados automaticamente para esta faixa etária.
              </p>
            </>
          ) : (
            <p className="text-brand-900/45">Informe a data de nascimento para calcular sua fase da vida e avatar.</p>
          )}
        </div>
      </div>

      <p className="text-[11px] text-brand-900/40">
        Seus dados ficam salvos apenas neste dispositivo (localStorage) — nada é enviado a um servidor nesta demo.
      </p>
    </div>
  )
}
