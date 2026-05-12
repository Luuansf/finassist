import { supabase } from '../services/supabase'

import { formatCurrency } from '../utils/formatCurrency'

import { categoryConfig } from '../utils/categoryConfig'

type Props = {
  transaction: any
  onDeleted: () => void
}

export default function TransactionCard({
  transaction,
  onDeleted,
}: Props) {
  async function handleDelete() {
    const confirmDelete =
      confirm(
        'Deseja remover esta transação?'
      )

    if (!confirmDelete) return

    const { error } =
      await supabase
        .from('transactions')
        .delete()
        .eq('id', transaction.id)

    if (error) {
      alert(error.message)
      return
    }

    onDeleted()
  }

  const categoryKey =
    transaction.category?.toLowerCase() ||
    'outros'

  const category =
    categoryConfig[categoryKey] ||
    categoryConfig.outros

  return (
    <div
      className={`p-4 rounded-2xl flex justify-between items-center ${category.color}`}
    >

      <div className="flex items-center gap-3">

        <div className="text-2xl">
          {category.icon}
        </div>

        <div>
          <h3 className="font-bold capitalize">
            {transaction.category}
          </h3>

          <p className="text-sm opacity-80">
            {transaction.description}
          </p>
        </div>

      </div>

      <div className="flex flex-col items-end gap-2">

        <strong>
          {formatCurrency(
            transaction.amount
          )}
        </strong>

        <button
          onClick={handleDelete}
          className="bg-black/20 px-2 py-1 rounded text-xs"
        >
          Excluir
        </button>

      </div>

    </div>
  )
}