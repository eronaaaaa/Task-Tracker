"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import EditTaskDialog from "@/components/EditTaskDialog";
import DeleteTaskDialog from "@/components/DeleteTaskDialog";
import type { Task } from "@/lib/tasks";

type Props = {
  task: Task;
};

export default function TaskActionsDropdown({ task }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 cursor-pointer">
            ···
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-40 p-1.5 rounded-xl border-none ring-0 bg-white shadow-sm"
        >
          <DropdownMenuItem
            className="rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-gray-50"
            onClick={() => setEditOpen(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator className=" mx-auto bg-gray-200 w-[98%]" />

          <DropdownMenuItem
            className="rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-gray-50"
            onClick={() => console.log("Toggle status:", task.id)}
          >
            {task.status === "done" ? "Mark as todo" : "Mark as done"}
          </DropdownMenuItem>
          <DropdownMenuSeparator className=" mx-auto bg-gray-200 w-[98%]" />
          <DropdownMenuItem
            className="rounded-lg px-3 py-2 text-sm cursor-pointer text-red-600 hover:bg-red-50 focus:text-red-600"
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
