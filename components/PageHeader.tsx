type PageHeaderProps = {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{title}</h1>
      {description && (
        <p style={{ color: '#6b7280', marginTop: '0.25rem', fontSize: '0.875rem' }}>
          {description}
        </p>
      )}
    </div>
  )
}