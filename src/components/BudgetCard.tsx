import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  budget: number
  expenses: number
}

export default function BudgetCard({
  budget,
  expenses,
}: Props) {
  const percentage =
    budget > 0
      ? Math.min(
          (expenses / budget) *
            100,
          100
        )
      : 0

  const remaining =
    budget - expenses

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="flex items-center justify-between mb-4">

        <div>

          <h2 className="text-lg font-bold">
            Orçamento mensal
          </h2>

          <p className="text-sm text-gray-400">
            Controle do limite de gastos
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-400">
            Utilizado
          </p>

          <p className="font-bold">
            {percentage.toFixed(0)}%
          </p>

        </div>

      </div>

      <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">

        <div
          className={`h-full transition-all ${
            percentage >= 90
              ? 'bg-red-500'
              : percentage >= 70
              ? 'bg-yellow-500'
              : 'bg-green-500'
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="flex justify-between mt-4 text-sm">

        <div>

          <p className="text-gray-400">
            Limite
          </p>

          <p className="font-bold">
            {formatCurrency(
              budget
            )}
          </p>

        </div>

        <div className="text-right">

          <p className="text-gray-400">
            Restante
          </p>

          <p
            className={`font-bold ${
              remaining <= 0
                ? 'text-red-400'
                : 'text-green-400'
            }`}
          >
            {formatCurrency(
              remaining
            )}
          </p>

        </div>

      </div>

    </div>
  )
}