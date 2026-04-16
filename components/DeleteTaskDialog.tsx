"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Task } from "@/lib/tasks";
import { toast } from "sonner";

type Props = {
  task: Task;
  open: boolean;
  onClose: () => void;
};

export default function DeleteTaskDialog({ task, open, onClose }: Props) {
  function handleDelete() {
    // Will wire to Supabase on Day 22
    console.log("Deleting task:", task.id);
    toast.error("Task deleted");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-sm bg-white ring-0">
        <DialogHeader>
          <DialogTitle>Delete task</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 py-2">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-900">
            &quot;{task.title}&quot;
          </span>
          ? This action cannot be undone.
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-xl border-gray-200 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            className="rounded-xl bg-red-600 hover:bg-red-700  text-white cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
