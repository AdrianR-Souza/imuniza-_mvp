import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

const UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
    </label>
  )
}

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'

export default function AdminSettings() {
  const { settings, email, updateSettings } = useAdminAuth()
  const [form, setForm] = useState(settings)
  const [savedAt, setSavedAt] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const save = (e) => {
    e.preventDefault()
    updateSettings(form)
    setSavedAt(Date.now())
    setTimeout(() => setSavedAt(null), 2500)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900">Configurações</h1>
        <p className="mt-1 text-sm text-slate-500">Dados da instituição exibidos no painel e usados para identificar a conta.</p>
      </div>

      <form onSubmit={save} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <Field label="Nome da instituição">
          <input value={form.institution} onChange={set('institution')} placeholder="Prefeitura de..." className={inputClass} />
        </Field>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <Field label="Município">
              <input value={form.municipio} onChange={set('municipio')} placeholder="Ex: Campinas" className={inputClass} />
            </Field>
          </div>
          <Field label="UF">
            <select value={form.uf} onChange={set('uf')} className={inputClass}>
              <option value="">--</option>
              {UFS.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="E-mail de contato" hint="Usado para notificações sobre quedas de cobertura vacinal (demo).">
          <input
            type="email"
            value={form.contactEmail}
            onChange={set('contactEmail')}
            placeholder="contato@prefeitura.gov.br"
            className={inputClass}
          />
        </Field>

        <Field label="E-mail de login">
          <input value={email} disabled className={`${inputClass} cursor-not-allowed opacity-60`} />
        </Field>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-transform hover:scale-[1.01]"
          >
            Salvar alterações
          </button>
          {savedAt && <span className="text-xs font-semibold text-emerald-600">✓ Configurações salvas</span>}
        </div>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
        🔒 Protótipo de hackathon: estas configurações ficam salvas apenas neste dispositivo (localStorage) — nada é
        enviado a um servidor nesta demo.
      </div>
    </motion.div>
  )
}
