import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from 'recharts'

import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  data: {
    month: string
    value: number
  }[]
}

export default function MonthlyEvolutionChart({
  data,
}: Props) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="mb-4">

        <h2 className="text-lg font-bold">
          Evolução financeira
        </h2>

        <p className="text-sm text-gray-400">
          Crescimento patrimonial
        </p>

      </div>

      <div className="w-full h-72">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <XAxis
              dataKey="month"
            />

            <Tooltip
              formatter={(value) =>
                formatCurrency(
                  Number(value)
                )
              }
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.2}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}