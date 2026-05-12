import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

import ProtectedRoute from '../components/ProtectedRoute'

type Props = {
  user: any
  handleLogout: () => void
}

export default function AppRoutes({
  user,
  handleLogout,
}: Props) {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Login onLogin={() => {}} />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>

            <Dashboard
              userId={user?.id}
              onLogout={handleLogout}
            />

          </ProtectedRoute>
        }
      />

    </Routes>
  )
}