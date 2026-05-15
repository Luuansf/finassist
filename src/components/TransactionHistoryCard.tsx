import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  transaction: any
}

export default function TransactionHistoryCard({
  transaction,
}: Props) {
  const isIncome =
    transaction.type === 'income'

  const isExpense =
    transaction.type === 'expense'

  const isInvestment =
    transaction.type.includes(
      'investment'
    )

  const isSaved =
    transaction.type.includes(
      'saved'
    )

  function getTitle() {
    switch (transaction.type) {
      case 'income':
        return 'Receita'

      case 'expense':
        return 'Despesa'

      case 'investment_add':
        return 'Investiu'

      case 'investment_remove':
        return 'Retirada investimento'

      case 'saved_add':
        return 'Guardou'

      case 'saved_remove':
        return 'Retirada reserva'

      default:
        return 'Movimentação'
    }
  }

  function getColor() {
    if (isIncome)
      return 'text-green-400'

    if (isExpense)
      return 'text-red-400'

    if (isInvestment)
      return 'text-yellow-400'

    if (isSaved)
      return 'text-purple-400'

    return 'text-white'
  }

  function getEmoji() {
    if (isIncome) return '💰'

    if (isExpense) return '💸'

    if (isInvestment) return '📈'

    if (isSaved) return '🏦'

    return '📌'
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="flex items-start justify-between">

        <div className="flex gap-3">

          <div className="text-2xl">
            {getEmoji()}
          </div>

          <div>

            <h3 className="font-bold">
              {getTitle()}
            </h3>

            <p className="text-sm text-gray-400">
              {transaction.category}
            </p>

            {transaction.description && (
              <p className="text-xs text-gray-500 mt-1">
                {
                  transaction.description
                }
              </p>
            )}

          </div>

        </div>

        <div className="text-right">

          <p
            className={`font-bold ${getColor()}`}
          >
            {formatCurrency(
              Number(
                transaction.amount
              )
            )}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {new Date(
              transaction.created_at
            ).toLocaleDateString(
              'pt-BR'
            )}
          </p>

        </div>

      </div>

    </div>
  )
}