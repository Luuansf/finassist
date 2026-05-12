import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

type Props = {
  incomes: number
  expenses: number
  investments: number
  saved: number
}

export default function FinancialChart({
  incomes,
  expenses,
  investments,
  saved,
}: Props) {
  const data = [
    {
      name: 'Receitas',
      value: incomes,
    },
    {
      name: 'Despesas',
      value: expenses,
    },
    {
      name: 'Investimentos',
      value: investments,
    },
    {
      name: 'Guardado',
      value: saved,
    },
  ]

  const COLORS = [
    '#22c55e',
    '#ef4444',
    '#eab308',
    '#9333ea',
  ]

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Visão Financeira
      </h2>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}