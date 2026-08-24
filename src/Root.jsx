import { Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import AdminApp from './admin/AdminApp.jsx'
import { AdminAuthProvider } from './admin/context/AdminAuthContext.jsx'

// Duas áreas completamente separadas dentro do mesmo app:
// - "/"        → paciente (cadastro, caderneta, dúvidas, aprender) — AppProvider
// - "/empresa" → prefeitura/operadora que contrata o Imuniza+ — AdminAuthProvider
// Cada uma tem seu próprio contexto/estado (chaves distintas no localStorage),
// então logar como empresa não mexe no cadastro do paciente e vice-versa.
export default function Root() {
  return (
    <Routes>
      <Route
        path="/empresa/*"
        element={
          <AdminAuthProvider>
            <AdminApp />
          </AdminAuthProvider>
        }
      />
      <Route
        path="/*"
        element={
          <AppProvider>
            <App />
          </AppProvider>
        }
      />
    </Routes>
  )
}
