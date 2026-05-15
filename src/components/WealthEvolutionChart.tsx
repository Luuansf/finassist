import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  transactions: any[]
}

export default function WealthEvolutionChart({
  transactions,
}: Props) {
  const grouped: any = {}

  transactions.forEach((t) => {
    const month = t.month

    if (!grouped[month]) {
      grouped[month] = 0
    }

    if (
      t.type === 'investment_add' ||
      t.type === 'saved_add'
    ) {
      grouped[month] += Number(
        t.amount
      )
    }

    if (
      t.type ===
        'investment_remove' ||
      t.type === 'saved_remove'
    ) {
      grouped[month] -= Number(
        t.amount
      )
    }
  })

  const orderedMonths =
    Object.keys(grouped).sort()

  let accumulated = 0

  const data = orderedMonths.map(
    (month) => {
      accumulated += grouped[month]

      return {
        month,
        patrimonio: accumulated,
      }
    }
  )

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <h2 className="text-lg font-bold mb-4">
        Evolução Patrimonial
      </h2>

      <div className="w-full h-64">

        <ResponsiveContainer>
          <LineChart data={data}>

            <XAxis dataKey="month" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="patrimonio"
              stroke="#22c55e"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  )
}