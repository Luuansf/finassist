import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  title: string
  amount: number
  type: 'investment' | 'saved'
  onClick?: () => void
}

export default function SummaryCard({
  title,
  amount,
  type,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-all"
    >

      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h2
        className={`text-2xl font-bold mt-2 ${
          type === 'investment'
            ? 'text-green-400'
            : 'text-blue-400'
        }`}
      >
        {formatCurrency(amount)}
      </h2>

    </div>
  )
}