import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  title: string
  current: number
  target: number
}

export default function FinancialGoalCard({
  title,
  current,
  target,
}: Props) {
  const percentage =
    target > 0
      ? Math.min(
          (current / target) * 100,
          100
        )
      : 0

  const remaining =
    Math.max(
      target - current,
      0
    )

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">

      <div className="flex items-center justify-between mb-4">

        <div>

          <p className="text-sm text-gray-400">
            Meta financeira
          </p>

          <h2 className="text-xl font-bold">
            {title}
          </h2>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-400">
            Progresso
          </p>

          <p className="font-bold text-green-400">
            {percentage.toFixed(0)}%
          </p>

        </div>

      </div>

      {/* BARRA */}
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-4">

        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      {/* INFO */}
      <div className="flex flex-col gap-2 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-400">
            Atual
          </span>

          <span className="font-bold">
            {formatCurrency(current)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            Objetivo
          </span>

          <span className="font-bold">
            {formatCurrency(target)}
          </span>
        </div>

        <div className="flex justify-between border-t border-gray-800 pt-3 mt-2">

          <span className="text-gray-400">
            Falta
          </span>

          <span className="font-bold text-yellow-400">
            {formatCurrency(remaining)}
          </span>

        </div>

      </div>

    </div>
  )
}