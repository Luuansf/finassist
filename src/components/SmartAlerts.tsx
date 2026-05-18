type Props = {
  balance: number
  expenses: number
  incomes: number
}

export default function SmartAlerts({
  balance,
  expenses,
  incomes,
}: Props) {
  const alerts = []

  if (balance <= 0) {
    alerts.push(
      'Seu saldo disponível acabou.'
    )
  }

  if (expenses > incomes) {
    alerts.push(
      'Você gastou mais do que recebeu este mês.'
    )
  }

  if (expenses > incomes * 0.8) {
    alerts.push(
      'Suas despesas estão muito altas.'
    )
  }

  if (alerts.length === 0) {
    alerts.push(
      'Sua saúde financeira está estável.'
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <h2 className="text-lg font-bold mb-4">
        Alertas inteligentes
      </h2>

      <div className="flex flex-col gap-3">

        {alerts.map(
          (alert, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-3 text-sm"
            >
              {alert}
            </div>
          )
        )}

      </div>

    </div>
  )
}