import { createContext, useContext, useEffect, useState } from 'react'

const AdminAuthContext = createContext(null)
const STORAGE_KEY = 'imuniza-mais:admin:v1'

const DEFAULT_SETTINGS = {
  institution: '',
  municipio: '',
  uf: '',
  contactEmail: '',
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    // localStorage indisponível — segue só em memória
  }
  return { loggedIn: false, email: '', settings: DEFAULT_SETTINGS }
}

export function AdminAuthProvider({ children }) {
  const [state, setState] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      // ok seguir só em memória
    }
  }, [state])

  // Login de protótipo: não há backend nesta demo, então qualquer
  // e-mail/senha preenchidos são aceitos. Em produção isso validaria
  // contra o cadastro real da prefeitura/operadora contratante.
  const login = ({ email, institution }) => {
    setState((s) => ({
      ...s,
      loggedIn: true,
      email,
      settings: { ...s.settings, institution: institution || s.settings.institution || 'Minha instituição' },
    }))
  }

  const logout = () => setState((s) => ({ ...s, loggedIn: false }))

  const updateSettings = (partial) => setState((s) => ({ ...s, settings: { ...s.settings, ...partial } }))

  return (
    <AdminAuthContext.Provider value={{ ...state, login, logout, updateSettings }}>{children}</AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
