import { formatCurrency } from '../utils/formatCurrency'

type Props = {
  transactions: any[]
}

export default function InvestmentWallets({
  transactions,
}: Props) {

  const wallets: Record<
    string,
    number
  > = {}

  transactions.forEach((t) => {

    if (
      t.type !== 'investment_add' &&
      t.type !==
        'investment_withdraw'
    ) {
      return
    }

    const category =
      t.category || 'Sem nome'

    if (!wallets[category]) {
      wallets[category] = 0
    }

    if (
      t.type === 'investment_add'
    ) {
      wallets[category] +=
        Number(t.amount)
    }

    if (
      t.type ===
      'investment_withdraw'
    ) {
      wallets[category] -=
        Number(t.amount)
    }

  })

  const walletEntries =
    Object.entries(wallets)

  if (walletEntries.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <h2 className="text-xl font-bold mb-4">
        Carteiras de investimento
      </h2>

      <div className="flex flex-col gap-3">

        {walletEntries.map(
          ([name, balance]) => (

            <div
              key={name}
              className="bg-gray-800 rounded-xl p-4 flex items-center justify-between"
            >

              <div>

                <p className="text-sm text-gray-400">
                  Carteira
                </p>

                <h3 className="font-bold text-lg">
                  {name}
                </h3>

              </div>

              <div className="text-right">

                <p className="text-sm text-gray-400">
                  Saldo
                </p>

                <h3 className="font-bold text-green-400">
                  {formatCurrency(
                    balance
                  )}
                </h3>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  )
}