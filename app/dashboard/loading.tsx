import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-32 rounded-xl" />
          <Skeleton className="h-4 w-52 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>

      <div className="flex gap-3 mb-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-24 rounded-2xl" />
        ))}
      </div>

      <div className="flex gap-1.5 p-1 bg-gray-100/80 rounded-xl w-fit mb-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-lg" />
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="bg-gray-50/80 border-b border-gray-100 px-4 py-3 flex gap-6">
          <Skeleton className="h-3.5 w-32 rounded-md" />
          <Skeleton className="h-3.5 w-16 rounded-md" />
          <Skeleton className="h-3.5 w-20 rounded-md" />
          <Skeleton className="h-3.5 w-20 rounded-md" />
        </div>

        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="px-4 py-3.5 border-b border-gray-50 flex items-center gap-6 last:border-0"
          >
            <Skeleton className="h-4 w-48 rounded-lg" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-6 w-6 rounded-lg ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
