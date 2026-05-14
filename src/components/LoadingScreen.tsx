type Props = {
  text?: string
}

export default function LoadingScreen({
  text = 'Carregando...',
}: Props) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">

      <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />

      <h1 className="text-3xl font-bold text-white mt-6">
        FinAssist
      </h1>

      <p className="text-gray-400 mt-2">
        {text}
      </p>

    </div>
  )
}