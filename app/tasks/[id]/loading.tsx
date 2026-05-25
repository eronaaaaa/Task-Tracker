import { Skeleton } from '@/components/ui/skeleton'

export default function TaskDetailLoading() {
  return (
    <main className="p-6 max-w-3xl">
      <Skeleton className="h-4 w-32 rounded-lg mb-6" />

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-64 rounded-xl" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-14 rounded-xl" />
            <Skeleton className="h-8 w-16 rounded-xl" />
          </div>
        </div>

        <div className="px-6 py-5 border-b border-gray-50">
          <Skeleton className="h-3 w-20 rounded-md mb-3" />
          <Skeleton className="h-4 w-full rounded-lg mb-2" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-50">
          <div className="px-6 py-4">
            <Skeleton className="h-3 w-16 rounded-md mb-2" />
            <Skeleton className="h-4 w-24 rounded-lg" />
          </div>
          <div className="px-6 py-4">
            <Skeleton className="h-3 w-16 rounded-md mb-2" />
            <Skeleton className="h-4 w-24 rounded-lg" />
          </div>
        </div>

        <div className="px-6 py-5 border-t border-gray-50">
          <Skeleton className="h-3 w-20 rounded-md mb-4" />
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-10 rounded-xl" />
            <Skeleton className="w-16 h-10 rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  )
}