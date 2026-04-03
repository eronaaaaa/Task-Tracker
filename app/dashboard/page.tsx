export default function DashboardPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Dashboard</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Here&apos;s what&apos;s on your plate today.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {['Write tests', 'Fix login bug', 'Review PR'].map((task) => (
          <div key={task} style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ fontWeight: 500 }}>{task}</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
              Todo
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}