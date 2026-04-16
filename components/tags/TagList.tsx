"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Tag } from "@/lib/tasks";
import TagRow from "./TagRow";
import CreateTagDialog from "./CreateTagDialog";

type Props = {
  initialTags: Tag[];
};

export default function TagList({ initialTags }: Props) {
  const [tags, setTags] = useState(initialTags);
  const [createOpen, setCreateOpen] = useState(false);

  function handleCreate(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function handleDelete(id: string) {
    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  function handleUpdate(updated: Tag) {
    setTags((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">All tags</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {tags.length} {tags.length === 1 ? "tag" : "tags"}
            </p>
          </div>
          <Button
            size="sm"
            className="rounded-xl"
            onClick={() => setCreateOpen(true)}
          >
            + New tag
          </Button>
        </div>

        {tags.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-3">
              <span className="text-gray-300 text-lg">#</span>
            </div>
            <p className="text-sm text-gray-400">No tags yet</p>
            <p className="text-xs text-gray-300 mt-0.5">
              Create a tag to start organising your tasks
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {tags.map((tag) => (
              <TagRow
                key={tag.id}
                tag={tag}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </div>

      <CreateTagDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />
    </>
  );
}
