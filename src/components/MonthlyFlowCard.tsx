import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  incomes: number
  expenses: number
  investmentsAdded: number
  savedAdded: number
}

export default function MonthlyFlowCard({
  incomes,
  expenses,
}: Props) {
  // =========================
  // FLUXO REAL DO MÊS
  // =========================

  const totalOut = expenses

  const remaining =
    incomes - expenses

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="flex items-center justify-between mb-4">

        <div>
          <h2 className="font-bold text-lg">
            Fluxo do mês
          </h2>

          <p className="text-sm text-gray-400">
            Entrada x saída financeira
          </p>
        </div>

      </div>

      <div className="flex flex-col gap-3">

        <div className="flex justify-between">

          <span className="text-gray-400">
            Recebido
          </span>

          <span className="text-green-400 font-bold">
            {formatCurrency(incomes)}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-400">
            Gasto no mês
          </span>

          <span className="text-red-400 font-bold">
            {formatCurrency(totalOut)}
          </span>

        </div>

        <div className="border-t border-gray-800 pt-3 flex justify-between">

          <span className="font-bold">
            Sobra do mês
          </span>

          <span
            className={`font-bold ${
              remaining >= 0
                ? 'text-green-400'
                : 'text-red-400'
            }`}
          >
            {formatCurrency(remaining)}
          </span>

        </div>

      </div>

    </div>
  )
}