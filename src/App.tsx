import { useEffect, useState } from 'react'

import AppRoutes from './routes/AppRoutes'

import {
  supabase,
} from './services/supabase'

import SplashScreen from './components/SplashScreen'

import Onboarding from './components/Onboarding'

export default function App() {
  const [user, setUser] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  const [showOnboarding, setShowOnboarding] =
    useState(false)

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } =
        await supabase.auth.getSession()

      setUser(session?.user || null)

      const alreadySeen =
        localStorage.getItem(
          'finassist-onboarding'
        )

      if (!alreadySeen) {
        setShowOnboarding(true)
      }

      setTimeout(() => {
        setLoading(false)
      }, 1800)
    }

    getUser()

    const {
      data: authListener,
    } =
      supabase.auth.onAuthStateChange(
        (_, session) => {
          setUser(
            session?.user || null
          )
        }
      )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  function finishOnboarding() {
    localStorage.setItem(
      'finassist-onboarding',
      'true'
    )

    setShowOnboarding(false)
  }

  return (
    <>
      <SplashScreen loading={loading} />

      {!loading &&
        showOnboarding && (
          <Onboarding
            onFinish={
              finishOnboarding
            }
          />
        )}

      {!loading &&
        !showOnboarding && (
          <AppRoutes
            user={user}
            handleLogout={async () => {
              await supabase.auth.signOut()
            }}
          />
        )}
    </>
  )
}