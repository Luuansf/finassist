type Props = {
  onFinish: () => void
}

export default function Onboarding({
  onFinish,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black z-[998] flex flex-col justify-center items-center px-6 text-center">

      <img
        src="/logo192.png"
        className="w-28 h-28 mb-6"
      />

      <h1 className="text-4xl font-bold text-green-500">
        Bem-vindo ao FinAssist
      </h1>

      <p className="text-gray-400 mt-4 max-w-sm">
        Controle suas receitas, despesas,
        investimentos e patrimônio de forma simples e inteligente.
      </p>

      <div className="mt-10 flex flex-col gap-3 w-full max-w-sm">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          📊 Visualize seus gastos
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          💰 Controle investimentos
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          🎯 Acompanhe metas financeiras
        </div>

      </div>

      <button
        onClick={onFinish}
        className="mt-10 bg-green-500 px-8 py-4 rounded-2xl font-bold text-lg w-full max-w-sm"
      >
        Começar
      </button>

    </div>
  )
}