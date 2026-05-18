import {
  House,
  Wallet,
  Target,
  User,
} from 'lucide-react'

type Props = {
  activeTab: string
  setActiveTab: (
    value: string
  ) => void
}

export default function BottomNav({
  activeTab,
  setActiveTab,
}: Props) {
  const items = [
    {
      id: 'home',
      icon: House,
      label: 'Home',
    },

    {
      id: 'wallet',
      icon: Wallet,
      label: 'Carteira',
    },

    {
      id: 'goals',
      icon: Target,
      label: 'Metas',
    },

    {
      id: 'profile',
      icon: User,
      label: 'Perfil',
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-800 flex justify-around items-center h-20 z-40">

      {items.map((item) => {
        const Icon = item.icon

        const active =
          activeTab === item.id

        return (
          <button
            key={item.id}
            onClick={() =>
              setActiveTab(
                item.id
              )
            }
            className={`flex flex-col items-center text-xs ${
              active
                ? 'text-green-400'
                : 'text-gray-500'
            }`}
          >
            <Icon size={22} />

            <span className="mt-1">
              {item.label}
            </span>

          </button>
        )
      })}

    </div>
  )
}