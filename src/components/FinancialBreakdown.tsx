import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  transactions: any[]
  type: string
  title: string
  onClose: () => void
}

export default function FinancialBreakdown({
  transactions,
  type,
  title,
  onClose,
}: Props) {
  const filtered =
    transactions.filter(
      (t) => t.type === type
    )

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 w-full max-w-md max-h-[80vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-red-400"
          >
            Fechar
          </button>

        </div>

        <div className="flex flex-col gap-3">

          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl p-3 flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {item.category}
                </p>

                <p className="text-sm text-gray-400">
                  {item.description}
                </p>
              </div>

              <p className="font-bold">
                {formatCurrency(
                  item.amount
                )}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}