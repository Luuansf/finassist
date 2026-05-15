import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  transactions: any[]
}

export default function ExpenseAnalytics({
  transactions,
}: Props) {
  // =========================
  // FILTRAR DESPESAS
  // =========================

  const expenses =
    transactions.filter(
      (t) => t.type === 'expense'
    )

  // =========================
  // AGRUPAR CATEGORIAS
  // =========================

  const grouped =
    expenses.reduce(
      (acc: any, transaction) => {
        const category =
          transaction.category ||
          'Outros'

        if (!acc[category]) {
          acc[category] = 0
        }

        acc[category] += Number(
          transaction.amount
        )

        return acc
      },
      {}
    )

  // =========================
  // TRANSFORMAR ARRAY
  // =========================

  const categories =
    Object.entries(grouped)
      .map(([name, amount]) => ({
        name,
        amount: Number(amount),
      }))
      .sort(
        (a, b) =>
          b.amount - a.amount
      )

  // =========================
  // TOTAL
  // =========================

  const totalExpenses =
    categories.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    )

  if (categories.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center text-gray-400">
        Nenhuma despesa encontrada
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="mb-5">

        <h2 className="text-xl font-bold">
          Para onde seu dinheiro foi
        </h2>

        <p className="text-sm text-gray-400">
          Ranking de despesas do mês
        </p>

      </div>

      <div className="flex flex-col gap-4">

        {categories.map(
          (category, index) => {
            const percentage =
              (
                (category.amount /
                  totalExpenses) *
                100
              ).toFixed(0)

            return (
              <div
                key={category.name}
                className="flex flex-col gap-2"
              >

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-2">

                    <div className="w-7 h-7 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    <span className="font-medium">
                      {category.name}
                    </span>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-red-400">
                      {formatCurrency(
                        category.amount
                      )}
                    </p>

                    <p className="text-xs text-gray-500">
                      {percentage}%
                    </p>

                  </div>

                </div>

                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">

                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>
            )
          }
        )}

      </div>

    </div>
  )
}