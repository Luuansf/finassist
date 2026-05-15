import { Trash2 } from 'lucide-react'

import { formatCurrency } from '../utils/formatCurrency'

import { getCategoryStyle } from '../utils/categoryStyles'

type Props = {
  transaction: any
  onDelete: (id: string) => void
}

export default function TransactionHistoryCard({
  transaction,
  onDelete,
}: Props) {
  const isPositive =
    transaction.type === 'income' ||
    transaction.type ===
      'investment_remove' ||
    transaction.type ===
      'saved_remove'

  const style =
    getCategoryStyle(
      transaction.category || ''
    )

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${style.color}`}
        >
          {style.icon}
        </div>

        <div>

          <h3 className="font-semibold">
            {transaction.category}
          </h3>

          <p className="text-sm text-gray-400">
            {transaction.description}
          </p>

          {transaction.recurring && (
            <p className="text-xs text-green-400 mt-1">
              🔁 Recorrente
            </p>
          )}

        </div>

      </div>

      <div className="text-right flex flex-col items-end gap-2">

        <p
          className={`font-bold ${
            isPositive
              ? 'text-green-400'
              : 'text-red-400'
          }`}
        >
          {isPositive ? '+' : '-'}
          {formatCurrency(
            transaction.amount
          )}
        </p>

        <button
          onClick={() =>
            onDelete(transaction.id)
          }
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  )
}