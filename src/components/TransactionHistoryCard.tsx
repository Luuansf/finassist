import { Trash2 } from 'lucide-react'

import { formatCurrency } from '../utils/formatCurrency'

import { getCategoryStyle } from '../utils/categoryStyles'

type Props = {
  transaction: any
  onDelete: (id: string) => void
  onEdit: () => void
}

export default function TransactionHistoryCard({
  transaction,
  onDelete,
  onEdit,
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

  function getTypeLabel() {
    switch (transaction.type) {
      case 'income':
        return 'Receita'

      case 'expense':
        return 'Despesa'

      case 'investment_add':
        return 'Investimento'

      case 'investment_remove':
        return 'Retirada investimento'

      case 'saved_add':
        return 'Guardado'

      case 'saved_remove':
        return 'Retirada guardado'

      default:
        return 'Movimentação'
    }
  }

  return (
    <div
      onClick={onEdit}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
    >

      <div className="flex items-center gap-3">

        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${style.color}`}
        >
          {style.icon}
        </div>

        <div className="flex flex-col">

          <h3 className="font-semibold">
            {transaction.category}
          </h3>

          <p className="text-sm text-gray-400">
            {transaction.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">

            <span className="text-xs bg-gray-800 px-2 py-1 rounded-full text-gray-300">
              {getTypeLabel()}
            </span>

            {transaction.recurring && (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                Recorrente
              </span>
            )}

            {transaction.installment_total && (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                Parcela{' '}
                {
                  transaction.installment_number
                }
                /
                {
                  transaction.installment_total
                }
              </span>
            )}

          </div>

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
          onClick={(e) => {
            e.stopPropagation()

            onDelete(transaction.id)
          }}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  )
}