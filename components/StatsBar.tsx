type StatsBarProps = {
  total: number
  done: number
  todo: number
}

export default function StatsBar({ total, done, todo }: StatsBarProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem'
    }}>
      {[
        { label: 'Total', value: total, bg: '#f3f4f6', color: '#111827' },
        { label: 'To do', value: todo, bg: '#eff6ff', color: '#1d4ed8' },
        { label: 'Done', value: done, bg: '#f0fdf4', color: '#166534' },
      ].map(({ label, value, bg, color }) => (
        <div key={label} style={{
          background: bg,
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          minWidth: '80px'
        }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, color }}>{value}</p>
          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{label}</p>
        </div>
      ))}
    </div>
  )
}