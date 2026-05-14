type Props = {
  loading: boolean
}

export default function SplashScreen({
  loading,
}: Props) {
  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[999]">

      <div className="animate-pulse">

        <img
          src="/logo192.png"
          alt="FinAssist"
          className="w-28 h-28"
        />

      </div>

      <h1 className="text-4xl font-bold mt-6 text-green-500">
        FinAssist
      </h1>

      <p className="text-gray-400 mt-2">
        Seu controle financeiro inteligente
      </p>

      <div className="mt-10 w-52 h-2 bg-gray-800 rounded-full overflow-hidden">

        <div className="h-full bg-green-500 animate-loading-bar" />

      </div>

    </div>
  )
}