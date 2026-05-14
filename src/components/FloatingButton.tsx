import { Plus } from 'lucide-react'

type Props = {
  onClick: () => void
}

export default function FloatingButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-5 z-40 w-16 h-16 rounded-full bg-green-500 text-black flex items-center justify-center shadow-2xl"
    >
      <Plus size={30} />
    </button>
  )
}