'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useUser } from '@/lib/auth/useUser'
import { signOut } from '@/lib/auth/actions'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Tags', href: '/tags' },
  { label: 'Settings', href: '/settings' },
]

export default function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { user, loading } = useUser()

  const name = user?.user_metadata?.name || user?.email?.split('@')[0] || ''
  const initials = name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="md:hidden border-b border-gray-100 bg-white">
      <div className="flex items-center justify-between px-4 h-14">
        <span className="font-semibold text-indigo-600 text-sm">
          Task Tracker
        </span>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-xs font-semibold text-indigo-600">
              {loading ? '?' : initials}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(!open)}
            className="rounded-lg h-8 w-8 p-0 text-gray-500"
          >
            {open ? '✕' : '☰'}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col px-3 pb-3 gap-0.5 border-t border-gray-50">
          <div className="px-3 py-3 mb-1">
            <p className="text-xs font-semibold text-gray-700">{name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => signOut()}
            className="mt-1 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
          >
            Sign out
          </button>
        </nav>
      )}
    </div>
  )
}