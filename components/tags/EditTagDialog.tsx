"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Tag } from "@/lib/tasks";

const PRESET_COLORS = [
  "#6366f1",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#10b981",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

type Props = {
  tag: Tag;
  open: boolean;
  onClose: () => void;
  onUpdate: (tag: Tag) => void;
};

export default function EditTagDialog({ tag, open, onClose, onUpdate }: Props) {
  const [name, setName] = useState(tag.name);
  const [color, setColor] = useState(tag.color);

  function handleSave() {
    if (!name.trim()) return;
    const updated: Tag = { ...tag, name: name.trim().toLowerCase(), color };
    // Will wire to Supabase on Day 22
    console.log("Updating tag:", updated);
    toast.success(`Tag updated!`);
    onUpdate(updated);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-sm rounded-2xl border border-gray-100 shadow-sm p-0 gap-0 overflow-hidden bg-white ring-0">
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-gray-50">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Edit tag
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-5 py-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-tag-name"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Name
            </label>
            <input
              id="edit-tag-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.toLowerCase())}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className="w-7 h-7 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                  style={{ background: c }}
                  aria-label={`Select color ${c}`}
                >
                  {color === c && (
                    <span className="text-white text-xs font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">Preview:</span>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: `${color}15`,
                  color: color,
                  border: `1px solid ${color}25`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: color }}
                />
                {name || tag.name}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="px-5 py-4 bg-gray-50/60 border-t border-gray-50 flex gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-gray-200 text-gray-500"
              onClick={onClose}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            className="rounded-xl"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
