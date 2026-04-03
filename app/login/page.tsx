export default function LoginPage() {
  return (
    <main style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh' 
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          Sign in
        </h1>

        <div style={{ marginBottom: '1rem' }}>
          <label 
            htmlFor="email" 
            style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="password" 
            style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <button style={{
          width: '100%',
          padding: '0.625rem',
          background: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Sign in
        </button>
      </div>
    </main>
  )
}