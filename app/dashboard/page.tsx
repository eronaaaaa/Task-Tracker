import { getTasks, getTaskStats } from '@/lib/data/tasks'
import { requireUser } from '@/lib/auth/getUser'
import PageHeader from '@/components/PageHeader'
import StatsBar from '@/components/StatsBar'
import AddTaskDialog from '@/components/AddTaskDialog'
import TaskFilter from '@/components/TaskFilter'
import { Box } from '@mui/material'

export default async function DashboardPage() {
  const user = await requireUser()

  const [tasks, stats] = await Promise.all([
    getTasks(),
    getTaskStats(),
  ])

  return (
    <Box sx={{ p: 3 }}>
      <div className="flex justify-between items-start mb-6">
        <PageHeader
          title="Dashboard"
          description={`Welcome back, ${user.user_metadata?.name?.split(' ')[0] || 'there'}!`}
        />
        <AddTaskDialog />
      </div>

      <StatsBar
        total={stats.total}
        done={stats.done}
        todo={stats.todo}
      />

      <TaskFilter tasks={tasks} />
    </Box>
  )
}