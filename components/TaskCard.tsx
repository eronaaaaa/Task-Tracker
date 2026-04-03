type TaskCardProps = {
  title: string
  status: 'todo' | 'done'
  dueDate?: string
}

export default function TaskCard({ title, status, dueDate }: TaskCardProps) {
  return (
    <div style={{
      background: 'white',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <p style={{ fontWeight: 500, fontSize: '0.95rem' }}>{title}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{
          fontSize: '0.75rem',
          padding: '2px 8px',
          borderRadius: '20px',
          background: status === 'done' ? '#dcfce7' : '#f3f4f6',
          color: status === 'done' ? '#166534' : '#374151',
          fontWeight: 500
        }}>
          {status === 'done' ? 'Done' : 'To do'}
        </span>
        {dueDate && (
          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
            Due {dueDate}
          </span>
        )}
      </div>
    </div>
  )
}