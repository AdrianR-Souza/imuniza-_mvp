import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { levelFromXp } from '../data/quiz'

const AppContext = createContext(null)
const STORAGE_KEY = 'imuniza-mais:v1'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    // ignore malformed storage
  }
  return {
    profile: null, // { name, phase }
    takenVaccines: [],
    quizAnswered: [],
    xp: 0,
    streakDays: 1,
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadInitial)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      // storage may be unavailable — app still works in-memory
    }
  }, [state])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const gainXp = (amount, label) => {
    setState((s) => ({ ...s, xp: s.xp + amount }))
    setToast({ amount, label, key: Date.now() })
  }

  const setProfile = (profile) => setState((s) => ({ ...s, profile }))

  const toggleVaccine = (id) => {
    setState((s) => {
      const has = s.takenVaccines.includes(id)
      const takenVaccines = has ? s.takenVaccines.filter((v) => v !== id) : [...s.takenVaccines, id]
      return { ...s, takenVaccines }
    })
    if (!state.takenVaccines.includes(id)) gainXp(5, 'Vacina registrada')
  }

  const answerQuiz = (id, correct) => {
    if (state.quizAnswered.includes(id)) return
    setState((s) => ({ ...s, quizAnswered: [...s.quizAnswered, id] }))
    if (correct) gainXp(15, 'Resposta certa!')
  }

  const registerMythCheck = () => gainXp(10, 'Dúvida verificada')

  const level = useMemo(() => levelFromXp(state.xp), [state.xp])

  const value = {
    ...state,
    level,
    toast,
    gainXp,
    setProfile,
    toggleVaccine,
    answerQuiz,
    registerMythCheck,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
