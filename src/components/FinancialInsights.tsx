type Props = {
  incomes: number
  expenses: number
  investments: number
  saved: number
}

export default function FinancialInsights({
  incomes,
  expenses,
  investments,
  saved,
}: Props) {
  const insights: string[] = []

  // 🚨 gastos maiores que receita
  if (expenses > incomes) {
    insights.push(
      '⚠️ Você gastou mais do que recebeu neste mês.'
    )
  }

  // 💡 despesas altas
  if (
    incomes > 0 &&
    expenses / incomes > 0.7
  ) {
    insights.push(
      '📉 Suas despesas ultrapassaram 70% da receita.'
    )
  }

  // 🏦 investimentos baixos
  if (
    incomes > 0 &&
    investments / incomes < 0.1
  ) {
    insights.push(
      '💰 Seus investimentos estão abaixo de 10% da renda.'
    )
  }

  // 🎉 economia boa
  if (
    incomes > 0 &&
    saved / incomes >= 0.2
  ) {
    insights.push(
      '🚀 Excelente! Você guardou mais de 20% da sua renda.'
    )
  }

  // ✅ estabilidade
  if (
    expenses < incomes &&
    investments > 0
  ) {
    insights.push(
      '✅ Sua saúde financeira está estável.'
    )
  }

  if (insights.length === 0) {
    insights.push(
      '📊 Adicione mais movimentações para gerar análises.'
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-2xl">

      <h2 className="text-lg font-bold mb-3">
        Insights Financeiros
      </h2>

      <div className="flex flex-col gap-2">

        {insights.map(
          (insight, index) => (
            <div
              key={index}
              className="bg-gray-800 p-3 rounded-xl text-sm"
            >
              {insight}
            </div>
          )
        )}

      </div>

    </div>
  )
}