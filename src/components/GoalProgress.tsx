import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  current: number
  target: number
}

export default function GoalProgress({
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

      <div className="flex justify-between mb-2">

        <h2 className="font-bold">
          Meta mensal
        </h2>

        <span className="text-green-400 font-bold">
          {progress.toFixed(0)}%
        </span>

      </div>

      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">

        <div
          className="bg-green-500 h-full rounded-full transition-all"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="flex justify-between mt-3 text-sm text-gray-400">

        <span>
          {formatCurrency(current)}
        </span>

        <span>
          {formatCurrency(target)}
        </span>

      </div>

    </div>
  )
}