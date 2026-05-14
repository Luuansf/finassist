import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { supabase } from '../services/supabase'

type Props = {
  onLogin: (user: any) => void
}

export default function Login({
  onLogin,
}: Props) {
  const navigate = useNavigate()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [name, setName] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  async function handleLogin() {
    setLoading(true)

    const { data, error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      )

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    if (data?.user) {
      onLogin(data.user)

      navigate('/dashboard')
    }

    setLoading(false)
  }

  async function handleRegister() {
    setLoading(true)

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    alert(
      'Conta criada com sucesso!'
    )

    if (data?.user) {
      onLogin(data.user)

      navigate('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col gap-4 shadow-2xl">

        <div className="text-center mb-2">

          <h1 className="text-4xl font-black text-green-400">
            FinAssist
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Seu assistente financeiro inteligente
          </p>

        </div>

        <input
          type="text"
          placeholder="Seu nome"
          className="p-3 rounded-xl bg-gray-800 text-white"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Seu email"
          className="p-3 rounded-xl bg-gray-800 text-white"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Sua senha"
          className="p-3 rounded-xl bg-gray-800 text-white"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 transition-all p-3 rounded-xl font-bold"
        >
          {loading
            ? 'Entrando...'
            : 'Entrar'}
        </button>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-gray-800 hover:bg-gray-700 transition-all p-3 rounded-xl font-bold"
        >
          Criar conta
        </button>

      </div>

    </div>
  )
}