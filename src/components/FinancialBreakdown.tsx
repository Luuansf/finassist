import { categoryConfig } from '../utils/categoryConfig'

import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  title: string
  type: string
  transactions: any[]
  onClose: () => void
}

export default function FinancialBreakdown({
  title,
  type,
  transactions,
  onClose,
}: Props) {
  const filtered =
    transactions.filter(
      (t) => t.type === type
    )

  const grouped: Record<
    string,
    number
  > = {}

  filtered.forEach((t) => {
    const category =
      t.category?.toLowerCase() ||
      'outros'

    grouped[category] =
      (grouped[category] || 0) +
      Number(t.amount)
  })

  const total = Object.values(
    grouped
  ).reduce((a, b) => a + b, 0)

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

      <div className="bg-gray-900 w-full max-w-md rounded-2xl p-4 flex flex-col gap-3">

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-red-400"
          >
            Fechar
          </button>

        </div>

        {Object.entries(grouped).map(
          ([category, amount]) => {
            const config =
              categoryConfig[
                category
              ] ||
              categoryConfig.outros

            const percentage =
              total > 0
                ? (
                    (amount / total) *
                    100
                  ).toFixed(1)
                : 0

            return (
              <div
                key={category}
                className={`p-3 rounded-xl flex justify-between items-center ${config.color}`}
              >

                <div className="flex items-center gap-3">

                  <span className="text-2xl">
                    {config.icon}
                  </span>

                  <div>
                    <h3 className="capitalize font-bold">
                      {category}
                    </h3>

                    <p className="text-xs">
                      {percentage}% do total
                    </p>
                  </div>

                </div>

                <strong>
                  {formatCurrency(
                    amount
                  )}
                </strong>

              </div>
            )
          }
        )}

      </div>

    </div>
  )
}