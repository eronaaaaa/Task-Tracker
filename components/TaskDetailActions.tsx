"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import EditTaskDialog from "@/components/EditTaskDialog";
import DeleteTaskDialog from "@/components/DeleteTaskDialog";
import type { Task } from "@/lib/tasks";

type Props = {
  task: Task;
};

export default function TaskDetailActions({ task }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-gray-200 text-gray-500 hover:text-gray-700 text-xs"
          onClick={() => setEditOpen(true)}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-red-100 text-red-400 hover:text-red-600 hover:bg-red-50 text-xs"
          onClick={() => setDeleteOpen(true)}
        >
          Delete
        </Button>
      </div>

      <EditTaskDialog
        task={task}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <DeleteTaskDialog
        task={task}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </>
  );
}
