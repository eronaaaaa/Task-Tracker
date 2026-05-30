import { getTaskById } from "@/lib/data/tasks";
import { getComments } from "@/lib/data/comments";
import { requireUser } from "@/lib/auth/getUser";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import TaskDetailActions from "@/components/TaskDetailActions";
import TagBadge from "@/components/TagBadge";
import CommentSection from "@/components/CommentSection";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailPage({ params }: Props) {
  const user = await requireUser();
  const { id } = await params;

  const [task, comments] = await Promise.all([
    getTaskById(id),
    getComments(id),
  ]);

  if (!task) notFound();

  function isOverdue(dueDate: string | null, status: string) {
    if (!dueDate || status === "done") return false;
    return new Date(dueDate) < new Date(new Date().toDateString());
  }

  return (
    <main className="p-6 max-w-full">
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

        {task.tags.length > 0 && (
          <div className="px-6 py-4 border-b border-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {task.tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          </div>
        )}

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
            {task.due_date ? (
              <div className="flex items-center gap-2">
                <p
                  className={`text-sm ${
                    isOverdue(task.due_date, task.status)
                      ? "text-red-500 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {formatDate(task.due_date)}
                </p>
                {isOverdue(task.due_date, task.status) && (
                  <span className="text-xs bg-red-50 text-red-500 border border-red-100 px-2 py-0.5 rounded-full">
                    Overdue
                  </span>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-300">Not set</p>
            )}
          </div>
          <div className="px-6 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              Created
            </p>
            <p className="text-sm text-gray-700">
              {formatDate(task.created_at)}
            </p>
          </div>
        </div>

        <CommentSection
          taskId={task.id}
          initialComments={comments}
          currentUserId={user.id}
        />
      </div>
    </main>
  );
}
