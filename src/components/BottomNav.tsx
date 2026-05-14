type Props = {
  active: string
  onChange: (
    value: string
  ) => void
}

export default function BottomNav({
  active,
  onChange,
}: Props) {
  const tabs = [
    {
      id: 'home',
      label: 'Início',
      icon: '🏠',
    },
    {
      id: 'reports',
      label: 'Relatórios',
      icon: '📊',
    },
    {
      id: 'add',
      label: 'Adicionar',
      icon: '➕',
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: '👤',
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-gray-950 border-t border-gray-800 flex justify-around items-center z-50 backdrop-blur-lg">

      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() =>
            onChange(tab.id)
          }
          className={`flex flex-col items-center justify-center transition-all duration-200 ${
            active === tab.id
              ? 'text-green-400 scale-110'
              : 'text-gray-500'
          }`}
        >
          <span className="text-xl">
            {tab.icon}
          </span>

          <span className="text-xs mt-1">
            {tab.label}
          </span>
        </button>
      ))}

    </div>
  )
}