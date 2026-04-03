import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        Task Tracker
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Welcome to your task manager.
      </p>
      <Link
        href="/dashboard"
        style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          background: '#4f46e5',
          color: 'white',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '0.875rem'
        }}
      >
        Go to Dashboard
      </Link>
    </main>
  )
}