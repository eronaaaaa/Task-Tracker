"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import TagPicker from "@/components/TagPicker";
import { getTags } from "@/lib/tasks";
import type { Tag } from "@/lib/tasks";

export default function AddTaskDialog() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags().then(setAvailableTags);
  }, []);

  function handleSubmit() {
    if (!title.trim()) return;
    console.log("New task:", { title, dueDate, tags: selectedTags });
    toast.success("Task created!");
    setTitle("");
    setDueDate("");
    setSelectedTags([]);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="rounded-xl bg-gray-900 hover:bg-gray-700 text-white cursor-pointer"
        >
          + Add task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl border border-gray-100 shadow-sm p-0 gap-0 overflow-hidden bg-white ring-0">
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-gray-50">
          <DialogTitle className="text-base font-semibold text-gray-900">
            New task
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-5 py-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="title"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Write tests"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="dueDate"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Due date
              <span className="text-gray-300 font-normal normal-case ml-1">
                (optional)
              </span>
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-500"
            />
          </div>

          <TagPicker
            availableTags={availableTags}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />
        </div>

        <DialogFooter className="px-5 py-4 bg-gray-50/60 border-t border-gray-50 flex gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-gray-200 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              size="sm"
              className="rounded-xl bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
              onClick={handleSubmit}
            >
              Create task
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
