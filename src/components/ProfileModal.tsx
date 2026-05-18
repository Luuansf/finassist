type Props = {
  userName: string
  avatar: string | null
  onClose: () => void
}

export default function ProfileModal({
  userName,
  avatar,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 w-full max-w-sm">

        <div className="flex flex-col items-center gap-4">

          {avatar ? (
            <img
              src={avatar}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-3xl font-bold">
              {userName
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <h2 className="text-2xl font-bold">
            {userName}
          </h2>

          <button
            onClick={onClose}
            className="w-full bg-green-500 p-3 rounded-xl font-bold"
          >
            Fechar
          </button>

        </div>

      </div>

    </div>
  )
}