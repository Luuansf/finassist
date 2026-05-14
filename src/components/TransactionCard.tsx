import { Trash2 } from 'lucide-react'

import {
  deleteTransaction,
} from '../services/transactions'

import { formatCurrency } from '../utils/formatCurrency'

import { categories } from '../data/categories'

type Props = {
  transaction: any
  onDeleted: () => void
}

export default function TransactionCard({
  transaction,
  onDeleted,
}: Props) {
  async function handleDelete() {
    const confirmDelete =
      confirm(
        'Deseja excluir esta transação?'
      )

    if (!confirmDelete) return

    await deleteTransaction(
      transaction.id
    )

    onDeleted()
  }

  const categoryData =
    categories.find(
      (c) =>
        c.name ===
        transaction.category
    )

  const icon =
    categoryData?.icon || '💸'

  const color =
    transaction.type === 'income'
      ? 'text-green-400'
      : transaction.type ===
          'expense'
        ? 'text-red-400'
        : transaction.type ===
            'investment'
          ? 'text-yellow-400'
          : 'text-purple-400'

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center text-2xl">
          {icon}
        </div>

        <div>

          <h3 className="font-semibold">
            {
              transaction.category
            }
          </h3>

          <p className="text-sm text-gray-400">
            {
              transaction.description
            }
          </p>

        </div>

      </div>

      <div className="flex flex-col items-end gap-2">

        <p
          className={`font-bold ${color}`}
        >
          {formatCurrency(
            transaction.amount
          )}
        </p>

        <button
          onClick={handleDelete}
          className="text-red-400"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  )
}