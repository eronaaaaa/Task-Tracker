'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Login', href: '/login' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      background: 'white',
      borderRight: '1px solid #e5e7eb',
      padding: '1.5rem 1rem',
      flexShrink: 0
    }}>
      <p style={{
        fontWeight: 600,
        fontSize: '1rem',
        marginBottom: '1.5rem',
        paddingLeft: '0.5rem'
      }}>
        Task Tracker
      </p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: '0.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              background: pathname === item.href ? '#eef2ff' : 'transparent',
              color: pathname === item.href ? '#4f46e5' : '#374151',
              fontWeight: pathname === item.href ? 500 : 400
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}