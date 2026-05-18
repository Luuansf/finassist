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
  const progress =
    Math.min(
      (current / target) * 100,
      100
    )

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="flex items-center justify-between mb-4">

        <div>

          <h2 className="font-bold text-lg">
            🎯 {title}
          </h2>

          <p className="text-sm text-gray-400">
            Meta financeira
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-400">
            Progresso
          </p>

          <p className="font-bold text-green-400">
            {progress.toFixed(0)}%
          </p>

        </div>

      </div>

      <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">

        <div
          className="h-full bg-green-500 transition-all"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="flex justify-between mt-4 text-sm">

        <div>

          <p className="text-gray-400">
            Atual
          </p>

          <p className="font-bold">
            {formatCurrency(
              current
            )}
          </p>

        </div>

        <div className="text-right">

          <p className="text-gray-400">
            Meta
          </p>

          <p className="font-bold">
            {formatCurrency(
              target
            )}
          </p>

        </div>

      </div>

    </div>
  )
}