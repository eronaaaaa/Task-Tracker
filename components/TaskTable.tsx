"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TaskActionsDropdown from "@/components/TaskActionsDropdown";
import type { Task } from "@/lib/tasks";
import AddTaskDialog from "./AddTaskDialog";

type Props = {
  tasks: Task[];
  filter?: "all" | "todo" | "done";
};

export default function TaskTable({ tasks, filter = "all" }: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/80 border-b border-gray-100 hover:bg-gray-50/80">
            <TableHead className="w-[40%] text-xs font-semibold text-gray-400 uppercase tracking-wide py-3 px-4">
              Task
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-400 uppercase tracking-wide py-3">
              Status
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-400 uppercase tracking-wide py-3">
              Due date
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-400 uppercase tracking-wide py-3">
              Created
            </TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5} className="py-0">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <svg
                      className="w-5 h-5 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {filter === "all"
                      ? "No tasks yet"
                      : filter === "done"
                        ? "No completed tasks"
                        : "No pending tasks"}
                  </p>
                  <p className="text-xs text-gray-300 mb-5">
                    {filter === "all"
                      ? "Add your first task to get started"
                      : filter === "done"
                        ? "Complete a task and it will appear here"
                        : "All your tasks are done — nice work!"}
                  </p>
                  {filter === "all" && <AddTaskDialog />}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow
                key={task.id}
                className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
              >
                <TableCell className="py-3 px-4">
                  <Link
                    href={`/tasks/${task.id}`}
                    className="font-medium text-gray-800 hover:text-indigo-600 transition-colors text-sm"
                  >
                    {task.title}
                  </Link>
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    variant="outline"
                    className={
                      task.status === "done"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50 text-xs font-medium"
                        : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-50 text-xs font-medium"
                    }
                  >
                    {task.status === "done" ? "Done" : "To do"}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-400 text-sm">
                  {task.dueDate ?? <span className="text-gray-200">—</span>}
                </TableCell>
                <TableCell className="py-3 text-gray-400 text-sm">
                  {task.createdAt}
                </TableCell>
                <TableCell className="py-3 pr-3">
                  <TaskActionsDropdown task={task} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
