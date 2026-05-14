export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gray-700" />

          <div className="flex flex-col gap-2">

            <div className="w-28 h-3 bg-gray-700 rounded" />

            <div className="w-20 h-3 bg-gray-800 rounded" />

          </div>

        </div>

        <div className="w-20 h-4 bg-gray-700 rounded" />

      </div>

    </div>
  )
}