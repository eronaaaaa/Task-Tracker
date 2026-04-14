'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Tasks', href: '/tasks' },
  { label: 'Login', href: '/login' },
]

export default function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 h-14">
        <span className="font-semibold text-indigo-600">Task Tracker</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </Button>
      </div>

      {open && (
        <nav className="flex flex-col px-4 pb-4 gap-1">
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
        </nav>
      )}
    </div>
  )
}