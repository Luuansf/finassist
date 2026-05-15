type Props = {
  incomes: number
  expenses: number
  availableBalance: number
  investments: number
  saved: number
}

export default function SmartAlerts({
  incomes,
  expenses,
  availableBalance,
  investments,
  saved,
}: Props) {
  const alerts: string[] = []

  // =========================
  // GASTOS ALTOS
  // =========================

  if (
    incomes > 0 &&
    expenses >= incomes * 0.8
  ) {
    alerts.push(
      'Seus gastos já consumiram mais de 80% da sua receita mensal.'
    )
  }

  // =========================
  // SALDO BAIXO
  // =========================

  if (
    availableBalance > 0 &&
    availableBalance <=
      incomes * 0.1
  ) {
    alerts.push(
      'Seu saldo disponível está muito baixo.'
    )
  }

  // =========================
  // SEM RESERVA
  // =========================

  if (
    investments + saved <= 0
  ) {
    alerts.push(
      'Você ainda não possui reserva financeira.'
    )
  }

  // =========================
  // DESPESAS MAIORES
  // =========================

  if (
    expenses > incomes &&
    incomes > 0
  ) {
    alerts.push(
      'Suas despesas ultrapassaram sua receita mensal.'
    )
  }

  // =========================
  // SEM ALERTAS
  // =========================

  if (alerts.length === 0) {
    return (
      <div className="bg-emerald-900/30 border border-emerald-700 rounded-2xl p-4">
        <p className="text-emerald-400 font-semibold">
          Sua saúde financeira está estável.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">

      <div>

        <h2 className="text-lg font-bold">
          Alertas inteligentes
        </h2>

        <p className="text-sm text-gray-400">
          Análise automática das suas finanças
        </p>

      </div>

      {alerts.map(
        (alert, index) => (
          <div
            key={index}
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3"
          >
            <p className="text-sm text-yellow-300">
              ⚠️ {alert}
            </p>
          </div>
        )
      )}

    </div>
  )
}