import { useEffect, useState } from 'react'

import Login from './pages/Login'

import Dashboard from './pages/Dashboard'

import { supabase } from './services/supabase'

export default function App() {
  const [user, setUser] =
    useState<any>(null)

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } =
        await supabase.auth.getSession()

      if (session?.user) {
        setUser(session.user)
      }
    }

    getUser()

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (session?.user) {
            setUser(session.user)
          } else {
            setUser(null)
          }
        }
      )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  if (!user) {
    return (
      <Login
        onLogin={(loggedUser) =>
          setUser(loggedUser)
        }
      />
    )
  }

  return (
    <Dashboard
      userId={user.id}
      onLogout={handleLogout}
    />
  )
}