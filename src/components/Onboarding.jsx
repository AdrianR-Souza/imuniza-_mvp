import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { phaseFromBirthDate } from '../data/vaccines.js'
import { useApp } from '../context/AppContext.jsx'
import PatientForm, { isPatientFormValid } from './PatientForm.jsx'

const EMPTY = { name: '', email: '', cpf: '', telefone: '', birthDate: '', gender: '' }

export default function Onboarding() {
  const { setProfile } = useApp()
  const [form, setForm] = useState(EMPTY)

  // Pré-visualização ao vivo: a paleta muda assim que a pessoa escolhe a cor
  // do app no cadastro, antes mesmo de concluir.
  useEffect(() => {
    if (form.gender) document.documentElement.dataset.gender = form.gender
  }, [form.gender])

  const canContinue = isPatientFormValid(form)

  const submit = () => {
    const phase = phaseFromBirthDate(form.birthDate)
    setProfile({ ...form, name: form.name.trim(), phase })
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-gradient-to-b from-brand-50 to-sand-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-3xl bg-white p-6 md:p-8 shadow-soft"
      >
        <div className="text-3xl mb-2">💉✨</div>
        <h1 className="text-2xl font-extrabold text-brand-900">
          Bem-vindo(a) ao Imuniza<span className="text-gold-500">+</span>
        </h1>
        <p className="mt-2 text-sm text-brand-900/60">
          Complete seu cadastro de paciente para conferirmos sua caderneta de vacinação, tirarmos dúvidas sobre mitos que circulam
          nas redes e liberarmos vacinas e perguntas certas para a sua faixa etária.
        </p>

        <div className="mt-6">
          <PatientForm value={form} onChange={setForm} />
        </div>

        <button
          disabled={!canContinue}
          onClick={submit}
          className="mt-6 w-full rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-soft transition-transform enabled:hover:scale-[1.01] disabled:opacity-40"
        >
          Concluir cadastro
        </button>
        <p className="mt-3 text-center text-[11px] text-brand-900/40">
          Conteúdo educativo, não substitui orientação médica.
        </p>
      </motion.div>
    </div>
  )
}
