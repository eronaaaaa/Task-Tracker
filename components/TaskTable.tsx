'use client'

import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import TaskActionsDropdown from '@/components/TaskActionsDropdown'
import type { Task } from '@/lib/tasks'

type Props = {
  tasks: Task[]
}

export default function TaskTable({ tasks }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[40%]">Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due date</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-gray-400 py-8"
              >
                No tasks yet. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-gray-50">
                <TableCell>
                  <Link
                    href={`/tasks/${task.id}`}
                    className="font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                  >
                    {task.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={task.status === 'done' ? 'default' : 'outline'}
                    className={
                      task.status === 'done'
                        ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-100'
                        : 'text-gray-600'
                    }
                  >
                    {task.status === 'done' ? 'Done' : 'To do'}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {task.dueDate ?? '—'}
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {task.createdAt}
                </TableCell>
                <TableCell>
                  <TaskActionsDropdown task={task} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}