import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  transactions: any[]
}

export default function ExpenseAnalytics({
  transactions,
}: Props) {
  const expenseTransactions =
    transactions.filter(
      (t) => t.type === 'expense'
    )

  const grouped =
    expenseTransactions.reduce(
      (acc: any, transaction) => {
        const category =
          transaction.category

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

  const data = Object.entries(
    grouped
  ).map(([name, value]) => ({
    name,
    value,
  }))

  const COLORS = [
    '#22c55e',
    '#ef4444',
    '#eab308',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#14b8a6',
  ]

  if (data.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

        <h2 className="text-lg font-bold mb-3">
          Análise de despesas
        </h2>

        <p className="text-gray-400 text-sm">
          Nenhuma despesa registrada.
        </p>

      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <h2 className="text-lg font-bold mb-4">
        Análise de despesas
      </h2>

      <div className="w-full h-[280px] min-h-[280px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label={(entry) =>
                entry.name
              }
            >

              {data.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip
              formatter={(value: any) =>
                formatCurrency(value)
              }
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}