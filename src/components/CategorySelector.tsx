type Props = {
  type: string
  selected: string
  onSelect: (
    category: string
  ) => void
}

const categories: Record<
  string,
  {
    label: string
    icon: string
  }[]
> = {
  income: [
    {
      label: 'Salário',
      icon: '💰',
    },
    {
      label: 'Freelance',
      icon: '🧑‍💻',
    },
    {
      label: 'Vendas',
      icon: '🛒',
    },
    {
      label: 'Extra',
      icon: '📈',
    },
  ],

  expense: [
    {
      label: 'Mercado',
      icon: '🛍️',
    },
    {
      label: 'Transporte',
      icon: '🚗',
    },
    {
      label: 'Casa',
      icon: '🏠',
    },
    {
      label: 'Lazer',
      icon: '🎮',
    },
    {
      label: 'Saúde',
      icon: '💊',
    },
    {
      label: 'Comida',
      icon: '🍔',
    },
  ],

  investment: [
    {
      label: 'Ações',
      icon: '📊',
    },
    {
      label: 'Crypto',
      icon: '₿',
    },
    {
      label: 'Reserva',
      icon: '🏦',
    },
  ],

  saved: [
    {
      label: 'Guardado',
      icon: '💵',
    },
    {
      label: 'Emergência',
      icon: '🚨',
    },
  ],
}

export default function CategorySelector({
  type,
  selected,
  onSelect,
}: Props) {
  if (!type) return null

  return (
    <div className="grid grid-cols-2 gap-2">

      {categories[type]?.map(
        (category) => (
          <button
            key={category.label}
            type="button"
            onClick={() =>
              onSelect(
                category.label
              )
            }
            className={`p-3 rounded-xl border transition ${
              selected ===
              category.label
                ? 'bg-green-500 border-green-400 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-300'
            }`}
          >
            <div className="text-2xl">
              {category.icon}
            </div>

            <div className="text-sm mt-1">
              {category.label}
            </div>
          </button>
        )
      )}

    </div>
  )
}