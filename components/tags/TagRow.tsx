'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import TagBadge from '@/components/TagBadge'
import EditTagDialog from '@/components/tags/EditTagDialog'
import { deleteTag } from '@/lib/actions/tags'
import { toast } from 'sonner'
import type { Tag } from '@/lib/data/tags'

type Props = {
  tag: Tag
  onDelete: (id: string) => void
  onUpdate: (tag: Tag) => void
}

export default function TagRow({ tag, onDelete, onUpdate }: Props) {
  const [editOpen, setEditOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteTag(tag.id)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(`Tag "${tag.name}" deleted`)
        onDelete(tag.id)
      }
    })
  }

  return (
    <>
      <div className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/60 transition-colors">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: tag.color }}
          />
          <TagBadge tag={tag} />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl text-gray-400 hover:text-gray-600 text-xs h-7"
            onClick={() => setEditOpen(true)}
            disabled={isPending}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 text-xs h-7"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>

      <EditTagDialog
        tag={tag}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onUpdate={onUpdate}
      />
    </>
  )
}