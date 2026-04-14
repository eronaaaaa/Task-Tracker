'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { Task } from '@/lib/tasks'

type Props = {
  task: Task
}

export default function TaskActionsDropdown({ task }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          ···
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => console.log('Edit:', task.id)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => console.log('Mark done:', task.id)}
        >
          {task.status === 'done' ? 'Mark as todo' : 'Mark as done'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={() => console.log('Delete:', task.id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}