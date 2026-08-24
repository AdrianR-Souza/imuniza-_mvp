import { Navigate, Route, Routes } from 'react-router-dom'
import { useAdminAuth } from './context/AdminAuthContext.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminSettings from './pages/AdminSettings.jsx'

export default function AdminApp() {
  const { loggedIn } = useAdminAuth()

  if (!loggedIn) {
    return <AdminLogin />
  }

  // Este <Routes> é descendente do <Route path="/empresa/*"> em Root.jsx,
  // então os caminhos aqui são RELATIVOS ao prefixo já consumido ("/empresa").
  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="configuracoes" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  )
}
