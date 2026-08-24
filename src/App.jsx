import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useApp } from './context/AppContext.jsx'
import Layout from './components/Layout.jsx'
import Onboarding from './components/Onboarding.jsx'
import Home from './pages/Home.jsx'
import Vacinas from './pages/Vacinas.jsx'
import Duvidas from './pages/Duvidas.jsx'
import Aprender from './pages/Aprender.jsx'
import Beneficios from './pages/Beneficios.jsx'
import Perfil from './pages/Perfil.jsx'

export default function App() {
  const { profile } = useApp()

  // Aplica a paleta (azul-petróleo/homem ou vinho/mulher) cadastrada pelo
  // paciente em toda a aplicação, via atributo em <html> lido pelas
  // variáveis CSS --brand-* (ver index.css).
  useEffect(() => {
    if (!profile?.gender) return
    document.documentElement.dataset.gender = profile.gender
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', profile.gender === 'mulher' ? '#562C2C' : '#0E9594')
  }, [profile?.gender])

  if (!profile) {
    return <Onboarding />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vacinas" element={<Vacinas />} />
        <Route path="/duvidas" element={<Duvidas />} />
        <Route path="/aprender" element={<Aprender />} />
        <Route path="/beneficios" element={<Beneficios />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  )
}
