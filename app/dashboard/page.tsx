import PageHeader from '@/components/PageHeader'
import TaskCard from '@/components/TaskCard'
import AddTaskButton from '@/components/AddTaskButton'

//this dashboard page in itself is a server component, it has no use client
//but it can render AddTaskButton which is a client component
//server components can render client components, but client components cannot render server components

const tasks = [
  { id: 1, title: 'Write tests', status: 'todo' as const, dueDate: 'Apr 5' },
  { id: 2, title: 'Fix login bug', status: 'done' as const, dueDate: 'Apr 3' },
  { id: 3, title: 'Review PR', status: 'todo' as const, dueDate: 'Apr 6' },
]

export default function DashboardPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '1.5rem'
      }}>
        <PageHeader
          title="Dashboard"
          description="Here's what's on your plate today."
        />
        <AddTaskButton />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            status={task.status}
            dueDate={task.dueDate}
          />
        ))}
      </div>
    </main>
  )
}