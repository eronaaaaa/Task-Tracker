import { Skeleton } from "@/components/ui/skeleton";
import { Box } from "@mui/material";

export default function DashboardLoading() {
  return (
    <Box sx={{ p: 3 }}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-52" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>

      <div className="flex gap-3 mb-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-24 rounded-lg" />
        ))}
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-24" />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="px-4 py-3 border-t border-gray-100 flex gap-4"
          >
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </Box>
  );
}
