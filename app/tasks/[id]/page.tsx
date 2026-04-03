import { getTaskById } from '@/lib/tasks'
import Link from 'next/link'

type Props = {
  params: Promise<{ id: string }>
}

export default async function TaskDetailPage({ params }: Props) {
  const { id } = await params
  const task = await getTaskById(id)

  if (!task) {
    return (
      <main style={{ padding: '2rem' }}>
        <p style={{ color: '#ef4444' }}>Task not found.</p>
        <Link
          href="/dashboard"
          style={{ color: '#4f46e5', fontSize: '0.875rem' }}
        >
          Back to Dashboard
        </Link>
      </main>
    )
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px' }}>
      <Link
        href="/dashboard"
        style={{
          color: '#6b7280',
          fontSize: '0.875rem',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '1.5rem'
        }}
      >
        ← Back to Dashboard
      </Link>

      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
        {task.title}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280', width: '80px' }}>
            Status
          </span>
          <span style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '20px',
            background: task.status === 'done' ? '#dcfce7' : '#f3f4f6',
            color: task.status === 'done' ? '#166534' : '#374151',
            fontWeight: 500
          }}>
            {task.status === 'done' ? 'Done' : 'To do'}
          </span>
        </div>

        {task.dueDate && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280', width: '80px' }}>
              Due date
            </span>
            <span style={{ fontSize: '0.875rem' }}>{task.dueDate}</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280', width: '80px' }}>
            Created
          </span>
          <span style={{ fontSize: '0.875rem' }}>{task.createdAt}</span>
        </div>
      </div>
    </main>
  )
}