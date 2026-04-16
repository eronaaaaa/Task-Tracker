import { getTaskById } from "@/lib/tasks";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import TaskDetailActions from "@/components/TaskDetailActions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailPage({ params }: Props) {
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6"
      >
        ← Back to Dashboard
      </Link>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-gray-900">
              {task.title}
            </h1>
            <Badge
              variant="outline"
              className={
                task.status === "done"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100 w-fit text-xs font-medium"
                  : "bg-amber-50 text-amber-600 border-amber-100 w-fit text-xs font-medium"
              }
            >
              {task.status === "done" ? "Done" : "To do"}
            </Badge>
          </div>

          <TaskDetailActions task={task} />
        </div>

        <div className="px-6 py-5 border-b border-gray-50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Description
          </p>
          {task.description ? (
            <p className="text-sm text-gray-600 leading-relaxed">
              {task.description}
            </p>
          ) : (
            <p className="text-sm text-gray-300 italic">
              No description added yet.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-50">
          <div className="px-6 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              Due date
            </p>
            <p className="text-sm text-gray-700">
              {task.dueDate ?? <span className="text-gray-300">Not set</span>}
            </p>
          </div>
          <div className="px-6 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              Created
            </p>
            <p className="text-sm text-gray-700">{task.createdAt}</p>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-gray-50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
            Comments
          </p>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-3">
              <span className="text-gray-300 text-lg">💬</span>
            </div>
            <p className="text-sm text-gray-400">No comments yet</p>
            <p className="text-xs text-gray-300 mt-0.5">
              Comments will appear here once auth is connected
            </p>
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add a comment..."
              disabled
              className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl text-gray-400 placeholder:text-gray-300 cursor-not-allowed"
            />
            <Button size="sm" disabled className="rounded-xl">
              Post
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
