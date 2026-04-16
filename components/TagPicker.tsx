"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import TagBadge from "@/components/TagBadge";
import type { Tag } from "@/lib/tasks";

type Props = {
  availableTags: Tag[];
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
};

export default function TagPicker({
  availableTags,
  selectedTags,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  function toggleTag(tag: Tag) {
    const isSelected = selectedTags.some((t) => t.id === tag.id);
    if (isSelected) {
      onChange(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      onChange([...selectedTags, tag]);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Tags
        <span className="text-gray-300 font-normal normal-case ml-1">
          (optional)
        </span>
      </label>

      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {selectedTags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} onRemove={() => toggleTag(tag)} />
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-fit rounded-xl border-gray-100 text-gray-400 hover:text-gray-600 text-xs bg-white"
          >
            + Add tag
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0 rounded-xl border border-gray-100 shadow-sm bg-white">
          <Command>
            <CommandInput
              placeholder="Search tags..."
              className="text-sm h-9"
            />
            <CommandList>
              <CommandEmpty className="py-4 text-center text-xs text-gray-400">
                No tags found
              </CommandEmpty>
              <CommandGroup>
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.some((t) => t.id === tag.id);
                  return (
                    <CommandItem
                      key={tag.id}
                      onSelect={() => toggleTag(tag)}
                      className="flex items-center gap-2 cursor-pointer rounded-lg"
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: tag.color }}
                      />
                      <span className="text-sm">{tag.name}</span>
                      {isSelected && (
                        <span className="ml-auto text-indigo-500 text-xs">
                          ✓
                        </span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
