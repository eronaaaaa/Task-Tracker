import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TaskNotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
        <span className="text-2xl">🔍</span>
      </div>
      <h1 className="text-lg font-semibold text-gray-900 mb-1">
        Task not found
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        This task may have been deleted or doesn&apos;t exist.
      </p>
      <Button asChild size="sm" className="rounded-xl">
        <Link href="/dashboard">Back to Dashboard</Link>
      </Button>
    </main>
  );
}
