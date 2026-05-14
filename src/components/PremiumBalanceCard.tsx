type Props = {
  title: string
  amount: string
  subtitle?: string
  gradient: string
}

export default function PremiumBalanceCard({
  title,
  amount,
  subtitle,
  gradient,
}: Props) {
  return (
    <div
      className={`
        ${gradient}
        rounded-3xl
        p-6
        shadow-2xl
        border border-white/10
        backdrop-blur-xl
      `}
    >
      <p className="text-sm opacity-80">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {amount}
      </h2>

      {subtitle && (
        <p className="text-xs opacity-70 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  )
}