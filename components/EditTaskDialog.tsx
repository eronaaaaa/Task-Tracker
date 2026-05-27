'use client'

import { useState, useTransition, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import TagPicker from '@/components/TagPicker'
import { updateTask } from '@/lib/actions/tasks'
import type { Task, Tag } from '@/lib/data/tasks'

type Props = {
  task: Task
  open: boolean
  onClose: () => void
}

export default function EditTaskDialog({ task, open, onClose }: Props) {
  const [title, setTitle] = useState(task.title)
  const [status, setStatus] = useState(task.status)
  const [dueDate, setDueDate] = useState(task.due_date ?? '')
  const [description, setDescription] = useState(task.description ?? '')
  const [selectedTags, setSelectedTags] = useState<Tag[]>(task.tags)
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (open) {
      fetch('/api/tags')
        .then((r) => r.json())
        .then((res) => setAvailableTags(res.data ?? []))
    }
  }, [open])

  function handleSave() {
    if (!title.trim()) return

    const formData = new FormData()
    formData.append('id', task.id)
    formData.append('title', title)
    formData.append('status', status)
    formData.append('dueDate', dueDate)
    formData.append('description', description)
    selectedTags.forEach((tag) => formData.append('tagIds', tag.id))

    startTransition(async () => {
      const result = await updateTask(formData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Task updated!')
        onClose()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-gray-50">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Edit task
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-5 py-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-title"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Status
            </label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as Task['status'])}
            >
              <SelectTrigger className="rounded-xl border-gray-100 bg-gray-50 cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border-gray-100 cursor-pointer">
                <SelectItem value="todo">To do</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-due"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Due date
              <span className="text-gray-400 font-normal normal-case ml-1">
                (optional)
              </span>
            </label>
            <input
              id="edit-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full cursor-pointer px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-description"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Description
              <span className="text-gray-400 font-normal normal-case ml-1">
                (optional)
              </span>
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors resize-none"
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
              className="rounded-xl border-gray-200 text-gray-500 cursor-pointer"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            className="rounded-xl cursor-pointer"
            onClick={handleSave}
            disabled={isPending || !title.trim()}
          >
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}