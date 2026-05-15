import { formatCurrency } from '../utils/formatCurrency'

import { getCategoryStyle } from '../utils/categoryStyles'

type Props = {
  transaction: any
}

export default function TransactionHistoryCard({
  transaction,
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

        </div>

      </div>

      <div className="text-right">

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

      </div>

    </div>
  )
}