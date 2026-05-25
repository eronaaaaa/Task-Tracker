'use client'

import { useState, useEffect, useTransition } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import TagPicker from '@/components/TagPicker'
import { getTags } from '@/lib/data/tags'
import { createTask } from '@/lib/actions/tasks'
import type { Tag } from '@/lib/data/tasks'

export default function AddTaskDialog() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [isPending, startTransition] = useTransition()

useEffect(() => {
  fetch('/api/tags')
    .then((r) => r.json())
    .then((res) => setAvailableTags(res.data ?? []))
}, [open]) // refetch when dialog opens

  function handleClose() {
    setOpen(false)
    setTitle('')
    setDueDate('')
    setSelectedTags([])
  }

  async function handleSubmit() {
    if (!title.trim()) return

    const formData = new FormData()
    formData.append('title', title)
    formData.append('dueDate', dueDate)
    selectedTags.forEach((tag) => formData.append('tagIds', tag.id))

    startTransition(async () => {
      const result = await createTask(formData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Task created!')
        handleClose()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-xl">
          + Add task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-0 gap-0 overflow-hidden">
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
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-gray-200 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="rounded-xl"
            onClick={handleSubmit}
            disabled={isPending || !title.trim()}
          >
            {isPending ? 'Creating...' : 'Create task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}