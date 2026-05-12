import { useState } from 'react'

import { supabase } from '../services/supabase'

type Props = {
  currentName: string
  onClose: () => void
  onUpdated: (
    newName: string
  ) => void
}

export default function ProfileModal({
  currentName,
  onClose,
  onUpdated,
}: Props) {
  const [name, setName] =
    useState(currentName)

  async function handleSave() {
    const { error } =
      await supabase.auth.updateUser({
        data: {
          name,
        },
      })

    if (error) {
      alert(error.message)
      return
    }

    onUpdated(name)

    alert(
      'Perfil atualizado!'
    )

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

      <div className="bg-gray-900 w-full max-w-sm rounded-2xl p-4 flex flex-col gap-3">

        <h2 className="text-xl font-bold">
          Editar perfil
        </h2>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Seu apelido"
          className="p-3 bg-gray-800 rounded-xl"
        />

        <button
          onClick={handleSave}
          className="bg-green-500 p-3 rounded-xl font-bold"
        >
          Salvar
        </button>

        <button
          onClick={onClose}
          className="bg-gray-700 p-3 rounded-xl"
        >
          Cancelar
        </button>

      </div>

    </div>
  )
}