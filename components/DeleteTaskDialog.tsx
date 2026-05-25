'use client'

import { useTransition } from 'react'
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
import { deleteTask } from '@/lib/actions/tasks'
import { useRouter } from 'next/navigation'
import type { Task } from '@/lib/data/tasks'

type Props = {
  task: Task
  open: boolean
  onClose: () => void
  redirectAfter?: boolean
}

export default function DeleteTaskDialog({
  task,
  open,
  onClose,
  redirectAfter = false,
}: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteTask(task.id)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Task deleted')
        onClose()
        if (redirectAfter) {
          router.push('/dashboard')
        }
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-sm rounded-2xl border border-gray-100 shadow-sm p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-gray-50">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Delete task
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 py-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Are you sure you want to delete{' '}
            <span className="font-medium text-gray-900">
              &quot;{task.title}&quot;
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <DialogFooter className="px-5 py-4 bg-gray-50/60 border-t border-gray-50 flex gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-gray-200 text-gray-500"
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            className="rounded-xl bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}