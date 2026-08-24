import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

export default function AdminLogin() {
  const { login } = useAdminAuth()
  const [institution, setInstitution] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const canSubmit = institution.trim().length > 1 && email.trim().length > 3 && password.length >= 4

  const submit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    login({ email: email.trim(), institution: institution.trim() })
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-slate-950 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-3xl bg-white p-6 md:p-8 shadow-2xl"
      >
        <div className="flex items-center gap-2 font-extrabold text-slate-900">
          <span className="text-xl">💉</span>
          <span className="text-lg">
            Imuniza<span className="text-indigo-600">+</span>
          </span>
          <span className="ml-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-600">
            Empresa
          </span>
        </div>
        <h1 className="mt-3 text-xl font-extrabold text-slate-900">Painel da instituição</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Acesso para prefeituras, secretarias de saúde e operadoras que oferecem o Imuniza+ aos seus cidadãos/beneficiários.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700">Nome da instituição</span>
            <input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Prefeitura de..."
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contato@prefeitura.gov.br"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-transform enabled:hover:scale-[1.01] disabled:opacity-40"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Protótipo de hackathon: qualquer e-mail/senha preenchidos entram — sem backend real.
        </p>
        <a href="#/" className="mt-3 block text-center text-xs font-semibold text-slate-400 hover:text-indigo-600">
          ← Sou paciente, voltar ao app
        </a>
      </motion.div>
    </div>
  )
}
