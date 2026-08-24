import { useEffect, useState } from 'react'
import { PHASES, phaseFromBirthDate, relevantVaccines } from '../data/vaccines.js'
import { useApp } from '../context/AppContext.jsx'
import LevelBar from '../components/LevelBar.jsx'
import PatientForm, { isPatientFormValid } from '../components/PatientForm.jsx'

export default function Perfil() {
  const { profile, setProfile, takenVaccines, quizAnswered, xp, streakDays } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(profile)

  const relevant = relevantVaccines(profile.phase)
  const taken = relevant.filter((v) => takenVaccines.includes(v.id)).length
  const phaseInfo = PHASES.find((p) => p.id === profile.phase)

  const stats = [
    { label: 'XP total', value: xp },
    { label: 'Vacinas marcadas', value: takenVaccines.length },
    { label: 'Perguntas do quiz', value: quizAnswered.length },
    { label: 'Sequência', value: `${streakDays}d` },
  ]

  const startEdit = () => {
    setForm(profile)
    setEditing(true)
  }

  // Pré-visualização ao vivo da cor enquanto edita — some testar as duas
  // opções antes de salvar. Cancelar restaura a paleta salva.
  useEffect(() => {
    if (editing && form.gender) document.documentElement.dataset.gender = form.gender
  }, [editing, form.gender])

  const cancelEdit = () => {
    document.documentElement.dataset.gender = profile.gender
    setEditing(false)
  }

  const save = () => {
    const phase = phaseFromBirthDate(form.birthDate)
    setProfile({ ...form, name: form.name.trim(), phase })
    setEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-950">Seu perfil</h1>
          <p className="mt-1 text-sm text-brand-900/55">Dados salvos só neste dispositivo, usados para personalizar seu conteúdo.</p>
        </div>
        {!editing && (
          <button
            onClick={startEdit}
            className="shrink-0 rounded-full border border-brand-900/10 bg-white px-4 py-2 text-xs font-bold text-brand-700 shadow-card"
          >
            Editar cadastro
          </button>
        )}
      </div>

      {editing ? (
        <div className="rounded-3xl bg-white p-5 md:p-6 shadow-card">
          <PatientForm value={form} onChange={setForm} />
          <div className="mt-5 flex gap-2">
            <button
              onClick={cancelEdit}
              className="flex-1 rounded-xl border border-brand-900/10 py-3 text-sm font-bold text-brand-900/60"
            >
              Cancelar
            </button>
            <button
              onClick={save}
              disabled={!isPatientFormValid(form)}
              className="flex-1 rounded-xl bg-brand-600 py-3 text-sm font-bold text-white shadow-soft disabled:opacity-40"
            >
              Salvar
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-5 md:p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-2xl">
              {phaseInfo?.icon || profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-extrabold text-brand-950">{profile.name}</p>
              <p className="text-sm text-brand-900/50">
                {phaseInfo?.label} · {taken}/{relevant.length} vacinas em dia
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 text-sm">
            <div className="rounded-lg bg-brand-50/60 p-2.5">
              <p className="text-[11px] font-bold uppercase tracking-wide text-brand-700">E-mail</p>
              <p className="mt-0.5 text-brand-900/70 truncate">{profile.email || '—'}</p>
            </div>
            <div className="rounded-lg bg-brand-50/60 p-2.5">
              <p className="text-[11px] font-bold uppercase tracking-wide text-brand-700">CPF</p>
              <p className="mt-0.5 text-brand-900/70">{profile.cpf || '—'}</p>
            </div>
            <div className="rounded-lg bg-brand-50/60 p-2.5">
              <p className="text-[11px] font-bold uppercase tracking-wide text-brand-700">Telefone</p>
              <p className="mt-0.5 text-brand-900/70">{profile.telefone || '—'}</p>
            </div>
          </div>

          <div className="mt-5">
            <LevelBar />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-4 text-center shadow-card">
            <p className="text-xl font-extrabold text-brand-800">{s.value}</p>
            <p className="mt-0.5 text-[11px] font-medium text-brand-900/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-brand-900/15 p-4 text-xs text-brand-900/45">
        Este é um protótipo educativo (hackathon). As informações seguem o Calendário Nacional de Vacinação e fontes oficiais, mas
        não substituem avaliação médica individual — confirme sempre sua situação vacinal em uma UBS.
      </div>

      <a
        href="#/empresa/login"
        className="block rounded-2xl border border-brand-900/10 bg-white/60 p-4 text-center text-xs font-semibold text-brand-900/40 hover:text-brand-700"
      >
        Sou uma prefeitura ou operadora de saúde →
      </a>
    </div>
  )
}
