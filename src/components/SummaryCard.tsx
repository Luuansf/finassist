type Props = {
  title: string
  amount: string
  color: string
}

export default function SummaryCard({
  title,
  amount,
  color,
}: Props) {
  return (
    <div
      className={`${color} p-4 rounded-2xl`}
    >
      <h2 className="text-sm">
        {title}
      </h2>

      <p className="text-2xl font-bold">
        {amount}
      </p>
    </div>
  )
}