'use client'

import { useState, useTransition } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import EditTaskDialog from '@/components/EditTaskDialog'
import DeleteTaskDialog from '@/components/DeleteTaskDialog'
import { toggleTaskStatus } from '@/lib/actions/tasks'
import { toast } from 'sonner'
import type { Task } from '@/lib/data/tasks'

type Props = {
  task: Task
}

export default function TaskActionsDropdown({ task }: Props) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleToggleStatus() {
    startTransition(async () => {
      const result = await toggleTaskStatus(task.id, task.status)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(
          task.status === 'done'
            ? 'Marked as to do'
            : 'Marked as done'
        )
      }
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-lg"
            disabled={isPending}
          >
            ···
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-40 p-1.5 rounded-xl border border-gray-100 bg-white shadow-sm ring-0"
        >
          <DropdownMenuItem
            className="rounded-lg px-2.5 py-2 text-sm cursor-pointer hover:bg-gray-50"
            onClick={() => setEditOpen(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-lg px-2.5 py-2 text-sm cursor-pointer hover:bg-gray-50"
            onClick={handleToggleStatus}
          >
            {task.status === 'done' ? 'Mark as todo' : 'Mark as done'}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-100 my-1" />
          <DropdownMenuItem
            className="rounded-lg px-2.5 py-2 text-sm cursor-pointer text-red-500 hover:bg-red-50 focus:text-red-500"
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTaskDialog
        task={task}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <DeleteTaskDialog
        task={task}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </>
  )
}