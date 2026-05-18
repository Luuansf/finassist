import { formatCurrency } from '../utils/formatCurrency'

type Transaction = {
  amount: number
  category: string
  description: string
  type: string
}

type Props = {
  transactions: Transaction[]
}

export default function ExpenseAnalytics({
  transactions,
}: Props) {
  const expenses =
    transactions.filter(
      (item) =>
        item.type ===
        'expense'
    )

  const totalExpenses =
    expenses.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    )

  const categoryMap: Record<
    string,
    number
  > = {}

  expenses.forEach((item) => {
    if (
      !categoryMap[
        item.category
      ]
    ) {
      categoryMap[
        item.category
      ] = 0
    }

    categoryMap[
      item.category
    ] += item.amount
  })

  const topCategory =
    Object.entries(
      categoryMap
    ).sort(
      (a, b) => b[1] - a[1]
    )[0]

  const biggestExpense =
    expenses.sort(
      (a, b) =>
        b.amount - a.amount
    )[0]

  const dailyAverage =
    totalExpenses / 30

  const percentage =
    topCategory
      ? (
          (topCategory[1] /
            totalExpenses) *
          100
        ).toFixed(0)
      : 0

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="mb-4">

        <h2 className="text-lg font-bold">
          Análise financeira
        </h2>

        <p className="text-sm text-gray-400">
          Insights automáticos dos seus gastos
        </p>

      </div>

      <div className="flex flex-col gap-4">

        <div className="bg-gray-800 rounded-xl p-3">

          <p className="text-sm text-gray-400">
            Categoria com maior gasto
          </p>

          <p className="font-bold text-lg mt-1">
            {topCategory
              ? topCategory[0]
              : 'Sem dados'}
          </p>

          <p className="text-red-400 font-bold">
            {topCategory
              ? formatCurrency(
                  topCategory[1]
                )
              : 'R$ 0,00'}
          </p>

        </div>

        <div className="bg-gray-800 rounded-xl p-3">

          <p className="text-sm text-gray-400">
            Percentual dos gastos
          </p>

          <p className="font-bold text-lg mt-1">
            {percentage}%
          </p>

        </div>

        <div className="bg-gray-800 rounded-xl p-3">

          <p className="text-sm text-gray-400">
            Maior despesa
          </p>

          <p className="font-bold text-lg mt-1">
            {biggestExpense
              ?.description ||
              'Sem dados'}
          </p>

          <p className="text-red-400 font-bold">
            {biggestExpense
              ? formatCurrency(
                  biggestExpense.amount
                )
              : 'R$ 0,00'}
          </p>

        </div>

        <div className="bg-gray-800 rounded-xl p-3">

          <p className="text-sm text-gray-400">
            Média diária de gastos
          </p>

          <p className="font-bold text-lg mt-1 text-yellow-400">
            {formatCurrency(
              dailyAverage
            )}
          </p>

        </div>

      </div>

    </div>
  )
}