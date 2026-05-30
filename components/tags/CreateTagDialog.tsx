'use client'

import { useState, useTransition } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createTag } from '@/lib/actions/tags'
import type { Tag } from '@/lib/data/tags'

const PRESET_COLORS = [
  '#6366f1', '#f59e0b', '#ef4444',
  '#8b5cf6', '#10b981', '#3b82f6',
  '#ec4899', '#14b8a6', '#f97316',
]

type Props = {
  open: boolean
  onClose: () => void
  onCreate: (tag: Tag) => void
}

export default function CreateTagDialog({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#6366f1')
  const [isPending, startTransition] = useTransition()

  function handleCreate() {
    if (!name.trim()) return

    const formData = new FormData()
    formData.append('name', name)
    formData.append('color', color)

    startTransition(async () => {
      const result = await createTag(formData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(`Tag "${name}" created!`)
        onCreate(result.data as Tag)
        setName('')
        setColor('#6366f1')
        onClose()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-gray-50">
          <DialogTitle className="text-base font-semibold text-gray-900">
            New tag
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-5 py-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="tag-name"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Name
            </label>
            <input
              id="tag-name"
              type="text"
              placeholder="e.g. urgent"
              value={name}
              onChange={(e) => setName(e.target.value.toLowerCase())}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300"
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
                >
                  {color === c && (
                    <span className="text-white text-xs font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">Preview:</span>
              {name ? (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    background: `${color}15`,
                    color,
                    border: `1px solid ${color}25`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: color }}
                  />
                  {name}
                </span>
              ) : (
                <span className="text-xs text-gray-300">
                  Enter a name to preview
                </span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="px-5 py-4 bg-gray-50/60 border-t border-gray-50 flex gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-gray-200 text-gray-500"
              onClick={() => { setName(''); setColor('#6366f1') }}
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            className="rounded-xl"
            onClick={handleCreate}
            disabled={!name.trim() || isPending}
          >
            {isPending ? 'Creating...' : 'Create tag'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}