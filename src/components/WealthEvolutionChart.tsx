import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  transactions: any[]
}

export default function WealthEvolutionChart({
  transactions,
}: Props) {
  const monthlyMap: any = {}

  let wealth = 0

  const sorted =
    [...transactions].sort(
      (a, b) =>
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
    )

  sorted.forEach((transaction) => {
    const month =
      transaction.month

    if (
      transaction.type ===
      'investment_add'
    ) {
      wealth += Number(
        transaction.amount
      )
    }

    if (
      transaction.type ===
      'investment_remove'
    ) {
      wealth -= Number(
        transaction.amount
      )
    }

    if (
      transaction.type ===
      'saved_add'
    ) {
      wealth += Number(
        transaction.amount
      )
    }

    if (
      transaction.type ===
      'saved_remove'
    ) {
      wealth -= Number(
        transaction.amount
      )
    }

    if (wealth < 0) {
      wealth = 0
    }

    monthlyMap[month] = wealth
  })

  const data =
    Object.entries(monthlyMap).map(
      ([month, value]) => ({
        month,
        wealth: value,
      })
    )

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 w-full min-h-[320px]">

      <div className="mb-4">

        <h2 className="text-lg font-bold">
          Evolução patrimonial
        </h2>

        <p className="text-sm text-gray-400">
          Crescimento do patrimônio ao longo do tempo
        </p>

      </div>

      <div className="w-full h-[240px] min-h-[240px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>

            <XAxis dataKey="month" />

            <YAxis
              tickFormatter={(value) =>
                formatCurrency(value)
              }
            />

            <Tooltip
              formatter={(value: any) =>
                formatCurrency(value)
              }
            />

            <Line
              type="monotone"
              dataKey="wealth"
              stroke="#22c55e"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  )
}