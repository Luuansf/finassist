import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Dashboard from '../pages/Dashboard'

import Login from '../pages/Login'

import ProtectedRoute from './ProtectedRoute'

type Props = {
  user: any
  setUser: (user: any) => void
}

export default function AppRoutes({
  user,
  setUser,
}: Props) {
  return (
    <Routes>

      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login
              onLogin={setUser}
            />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            user={user}
          >
            <Dashboard
              user={user}
            />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}