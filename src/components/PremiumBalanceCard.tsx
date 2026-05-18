import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  balance: number
}

export default function PremiumBalanceCard({
  balance,
}: Props) {
  return (
    <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-5 shadow-2xl">

      <p className="text-sm text-green-100 mb-2">
        Saldo disponível
      </p>

      <h2 className="text-4xl font-black text-white">
        {formatCurrency(balance)}
      </h2>

    </div>
  )
}