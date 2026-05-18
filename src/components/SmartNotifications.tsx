type Goal = {
  title: string
  target: number
}

type Props = {
  incomes: number
  expenses: number
  balance: number
  investments: number
  goals: Goal[]
  saved: number
}

export default function SmartNotifications({
  incomes,
  expenses,
  balance,
  investments,
  goals,
  saved,
}: Props) {
  const notifications: string[] =
    []

  if (
    incomes > 0 &&
    expenses >=
      incomes * 0.8
  ) {
    notifications.push(
      '⚠️ Seus gastos passaram de 80% da sua receita'
    )
  }

  if (balance <= 300) {
    notifications.push(
      '🚨 Seu saldo disponível está baixo'
    )
  }

  if (investments > 0) {
    notifications.push(
      '📈 Seus investimentos estão crescendo'
    )
  }

  goals.forEach((goal) => {
    const progress =
      (saved /
        goal.target) *
      100

    if (
      progress >= 80 &&
      progress < 100
    ) {
      notifications.push(
        `🎯 Você está perto de concluir a meta "${goal.title}"`
      )
    }

    if (progress >= 100) {
      notifications.push(
        `🏆 Meta "${goal.title}" concluída`
      )
    }
  })

  if (
    incomes > expenses &&
    balance > 1000
  ) {
    notifications.push(
      '💰 Excelente mês financeiro'
    )
  }

  if (
    notifications.length ===
    0
  ) {
    notifications.push(
      '✅ Tudo sob controle nas suas finanças'
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="mb-4">

        <h2 className="text-lg font-bold">
          Central inteligente
        </h2>

        <p className="text-sm text-gray-400">
          Alertas automáticos
        </p>

      </div>

      <div className="flex flex-col gap-3">

        {notifications.map(
          (
            notification,
            index
          ) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-3 text-sm"
            >
              {notification}
            </div>
          )
        )}

      </div>

    </div>
  )
}