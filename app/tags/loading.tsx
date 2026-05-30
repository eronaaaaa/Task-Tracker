import { Skeleton } from '@/components/ui/skeleton'

export default function TagsLoading() {
  return (
    <main className="p-6 max-w-full">
      <div className="mb-6 flex flex-col gap-2">
        <Skeleton className="h-7 w-24 rounded-xl" />
        <Skeleton className="h-4 w-48 rounded-lg" />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-3 w-10 rounded-md" />
          </div>
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>

        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="px-5 py-3.5 flex items-center justify-between border-b border-gray-50 last:border-0"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-7 w-10 rounded-xl" />
              <Skeleton className="h-7 w-14 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}