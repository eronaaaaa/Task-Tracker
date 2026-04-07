'use client'

import Link from 'next/link'
import { Card, CardContent, Chip, Typography, Box } from '@mui/material'
import type { Task } from '@/lib/tasks'

type TaskCardProps = {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card variant="outlined" elevation={0}>
      <CardContent>
        <Link
          href={`/tasks/${task.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography
            fontWeight={500}
            mb={1}
            sx={{ '&:hover': { color: 'primary.main' } }}
          >
            {task.title}
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={task.status === 'done' ? 'Done' : 'To do'}
            size="small"
            color={task.status === 'done' ? 'success' : 'default'}
            variant={task.status === 'done' ? 'filled' : 'outlined'}
          />
          {task.dueDate && (
            <Typography variant="caption" color="text.secondary">
              Due {task.dueDate}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}