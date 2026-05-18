import { useEffect, useState } from 'react'

import { supabase } from './services/supabase'

import AppRoutes from './routes/AppRoutes'

export default function App() {
  const [user, setUser] =
    useState<any>(null)

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data }) => {
        setUser(data.user)
      })

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (
          _event,
          session
        ) => {
          setUser(
            session?.user ??
              null
          )
        }
      )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AppRoutes
      user={user}
      setUser={setUser}
    />
  )
}