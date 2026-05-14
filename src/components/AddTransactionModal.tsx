import { useState } from 'react'

import { X } from 'lucide-react'

import { categories } from '../data/categories'

type Props = {
  open: boolean

  onClose: () => void

  onSubmit: (data: {
    type: string
    category: string
    amount: string
    description: string
  }) => void
}

export default function AddTransactionModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [type, setType] =
    useState('expense')

  const [category, setCategory] =
    useState('')

  const [amount, setAmount] =
    useState('')

  const [description, setDescription] =
    useState('')

  if (!open) return null

  const filteredCategories =
    categories.filter(
      (c) => c.type === type
    )

  function handleSubmit() {
    if (
      !category ||
      !amount
    ) {
      alert(
        'Preencha os campos'
      )
      return
    }

    onSubmit({
      type,
      category,
      amount,
      description,
    })

    setType('expense')
    setCategory('')
    setAmount('')
    setDescription('')

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end">

      <div className="bg-gray-950 w-full rounded-t-3xl p-5 animate-slideup max-h-[95vh] overflow-y-auto">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-xl font-bold">
            Nova transação
          </h2>

          <button
            onClick={onClose}
          >
            <X />
          </button>

        </div>

        {/* TIPOS */}

        <div className="grid grid-cols-2 gap-2 mb-5">

          <button
            onClick={() =>
              setType(
                'expense'
              )
            }
            className={`p-3 rounded-2xl font-semibold ${
              type ===
              'expense'
                ? 'bg-red-500'
                : 'bg-gray-800'
            }`}
          >
            Despesa
          </button>

          <button
            onClick={() =>
              setType(
                'income'
              )
            }
            className={`p-3 rounded-2xl font-semibold ${
              type ===
              'income'
                ? 'bg-green-500'
                : 'bg-gray-800'
            }`}
          >
            Receita
          </button>

          <button
            onClick={() =>
              setType(
                'investment'
              )
            }
            className={`p-3 rounded-2xl font-semibold ${
              type ===
              'investment'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800'
            }`}
          >
            Investimento
          </button>

          <button
            onClick={() =>
              setType('saved')
            }
            className={`p-3 rounded-2xl font-semibold ${
              type ===
              'saved'
                ? 'bg-purple-500'
                : 'bg-gray-800'
            }`}
          >
            Guardado
          </button>

        </div>

        {/* CATEGORIAS */}

        <div className="grid grid-cols-2 gap-2 mb-5">

          {filteredCategories.map(
            (item) => (
              <button
                key={item.name}
                onClick={() =>
                  setCategory(
                    item.name
                  )
                }
                className={`p-3 rounded-2xl border text-left ${
                  category ===
                  item.name
                    ? 'border-green-500 bg-green-500/20'
                    : 'border-gray-800 bg-gray-900'
                }`}
              >
                <div className="text-2xl mb-1">
                  {item.icon}
                </div>

                <p className="font-medium">
                  {item.name}
                </p>

              </button>
            )
          )}

        </div>

        {/* VALOR */}

        <input
          placeholder="Valor"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          className="w-full p-4 rounded-2xl bg-gray-900 mb-3 outline-none"
        />

        {/* DESCRIÇÃO */}

        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full p-4 rounded-2xl bg-gray-900 mb-5 outline-none"
        />

        {/* BOTÃO */}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-black font-bold p-4 rounded-2xl"
        >
          Salvar transação
        </button>

      </div>

    </div>
  )
}