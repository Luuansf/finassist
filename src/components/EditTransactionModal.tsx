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

  const [type, setType] =
    useState(transaction.type)

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 w-full max-w-md flex flex-col gap-3">

        <h2 className="text-xl font-bold">
          Editar movimentação
        </h2>

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
          className="p-3 bg-gray-800 rounded-xl"
        >
          <option value="income">
            Receita
          </option>

          <option value="expense">
            Despesa
          </option>

          <option value="investment_add">
            Investimento
          </option>

          <option value="investment_remove">
            Retirar investimento
          </option>

          <option value="saved_add">
            Guardado
          </option>

          <option value="saved_remove">
            Retirar guardado
          </option>

        </select>

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

        {transaction.installment_total && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-sm text-yellow-400">

            Esta movimentação pertence a um parcelamento:
            <br />

            Parcela{' '}
            {
              transaction.installment_number
            }
            /
            {
              transaction.installment_total
            }

          </div>
        )}

        <div className="flex gap-2 mt-2">

          <button
            onClick={() =>
              onSave({
                category,
                amount,
                description,
                type,
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