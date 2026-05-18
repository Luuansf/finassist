import { useState } from 'react'

type Props = {
  transaction: any
  onClose: () => void
  onSave: (data: any) => void
}

export default function EditTransactionModal({
  transaction,
  onClose,
  onSave,
}: Props) {
  const [category, setCategory] =
    useState(transaction.category)

  const [amount, setAmount] =
    useState(transaction.amount)

  const [description, setDescription] =
    useState(
      transaction.description
    )

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 w-full max-w-md flex flex-col gap-3">

        <h2 className="text-xl font-bold">
          Editar movimentação
        </h2>

        <input
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="p-3 bg-gray-800 rounded-xl"
          placeholder="Categoria"
        />

        <input
          value={amount}
          onChange={(e) =>
            setAmount(
              Number(e.target.value)
            )
          }
          className="p-3 bg-gray-800 rounded-xl"
          placeholder="Valor"
          type="number"
        />

        <input
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="p-3 bg-gray-800 rounded-xl"
          placeholder="Descrição"
        />

        <div className="flex gap-2 mt-2">

          <button
            onClick={() =>
              onSave({
                category,
                amount,
                description,
              })
            }
            className="flex-1 bg-green-500 p-3 rounded-xl font-bold"
          >
            Salvar
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 p-3 rounded-xl font-bold"
          >
            Cancelar
          </button>

        </div>

      </div>

    </div>
  )
}