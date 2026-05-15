type Props = {
  current: number
  goal: number
}

export default function GoalProgress({
  current,
  goal,
}: Props) {
  const progress =
    goal > 0
      ? Math.min(
          (current / goal) * 100,
          100
        )
      : 0

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="flex items-center justify-between mb-3">

        <div>
          <h2 className="font-bold text-lg">
            Meta Financeira
          </h2>

          <p className="text-sm text-gray-400">
            Evolução do patrimônio
          </p>
        </div>

        <div className="text-right">
          <p className="font-bold text-green-400">
            {progress.toFixed(0)}%
          </p>
        </div>

      </div>

      <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="flex justify-between mt-3 text-sm text-gray-400">

        <span>
          Atual: R$ {current.toFixed(2)}
        </span>

        <span>
          Meta: R$ {goal.toFixed(2)}
        </span>

      </div>

    </div>
  )
}