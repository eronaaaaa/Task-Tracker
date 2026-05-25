'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UserMenu from '@/components/UserMenu'
import { useUser } from '@/lib/auth/useUser'

const DRAWER_WIDTH = 220

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Tags', href: '/tags' },
    { label: 'Settings', href: '/settings' },
    // Only show Login when not authenticated
    ...(!user ? [{ label: 'Login', href: '/login' }] : []),
  ]

  return (
    <aside
      className="hidden md:flex flex-col fixed top-0 left-0 h-screen bg-white border-r border-gray-100"
      style={{ width: DRAWER_WIDTH }}
    >
      <div className="px-4 py-4 flex-shrink-0">
        <span className="text-sm font-semibold text-indigo-600">
          Task Tracker
        </span>
      </div>

      <div className="h-px bg-gray-100 flex-shrink-0" />

      <nav className="flex-1 px-2 pt-2 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="h-px bg-gray-100 flex-shrink-0" />

      <div className="p-2 flex-shrink-0">
        {user ? (
          <UserMenu />
        ) : (
          <Link
            href="/login"
            className="flex items-center justify-center px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Sign in
          </Link>
        )}
      </div>
    </aside>
  )
}