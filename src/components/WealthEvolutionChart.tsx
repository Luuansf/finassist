import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts'

import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  data: {
    name: string
    value: number
  }[]
}

export default function WealthEvolutionChart({
  data,
}: Props) {
  const COLORS = [
    '#22c55e',
    '#3b82f6',
    '#a855f7',
  ]

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="mb-4">

        <h2 className="text-lg font-bold">
          Evolução patrimonial
        </h2>

        <p className="text-sm text-gray-400">
          Crescimento do patrimônio ao longo do tempo
        </p>

      </div>

      <div className="w-full h-[280px]">

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
            >
              {data.map(
                (
                  _entry,
                  index
                ) => (
                  <Cell
                    key={`cell-${index}`}
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
              formatter={(value) =>
                formatCurrency(
                  Number(value)
                )
              }
            />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  )
}