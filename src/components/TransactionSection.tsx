import { motion } from 'framer-motion'

import TransactionCard from './TransactionCard'

type Props = {
  title: string
  transactions: any[]
  onDeleted: () => void
}

export default function TransactionSection({
  title,
  transactions,
  onDeleted,
}: Props) {
  if (transactions.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-3">

      <h2 className="text-sm uppercase tracking-wider text-gray-400 font-semibold px-1">
        {title}
      </h2>

      <div className="flex flex-col gap-2">

        {transactions.map(
          (transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.03,
              }}
            >
              <TransactionCard
                transaction={
                  transaction
                }
                onDeleted={
                  onDeleted
                }
              />
            </motion.div>
          )
        )}

      </div>

    </div>
  )
}