import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

type Transaction = {
  month: string
  type: string
  amount: number
}

type Props = {
  transactions: Transaction[]
}

export default function MonthlyEvolutionChart({
  transactions,
}: Props) {
  const monthsMap: Record<
    string,
    {
      income: number
      expense: number
    }
  > = {}

  transactions.forEach((t) => {
    if (!monthsMap[t.month]) {
      monthsMap[t.month] = {
        income: 0,
        expense: 0,
      }
    }

    if (t.type === 'income') {
      monthsMap[t.month].income +=
        Number(t.amount)
    }

    if (t.type === 'expense') {
      monthsMap[t.month].expense +=
        Number(t.amount)
    }
  })

  const data = Object.keys(monthsMap)
    .sort()
    .map((month) => ({
      month,
      income:
        monthsMap[month].income,
      expense:
        monthsMap[month].expense,
    }))

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Evolução Mensal
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              name="Receitas"
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              name="Despesas"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}