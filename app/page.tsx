'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUser } from '@/lib/auth/useUser'

export default function HomePage() {
  const { user, loading } = useUser()

  return (
    <main className="min-h-screen">

      <div className="flex flex-col items-center text-center px-8 pt-16 pb-10">
        <h1 className="text-4xl font-semibold text-gray-900 leading-tight tracking-tight mb-4 max-w-lg">
          Stay on top of everything that matters
        </h1>

        <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">
          A focused task manager designed to capture, organise,
          and ship — without the noise of heavyweight project tools.
        </p>

        <div className="flex gap-2.5 flex-wrap justify-center">
          <Button asChild size="lg" className="rounded-xl">
            <Link href={user ? '/dashboard' : '/signup'}>
              {user ? 'Go to Dashboard' : 'Get started for free'}
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </Button>
          {!loading && !user && (
            <Button asChild variant="outline" size="lg" className="rounded-xl border-gray-200 text-gray-500">
              <Link href="/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-12 px-8 py-6 border-y border-gray-50 mb-8">
        {[
          { value: '∞', label: 'Tasks' },
          { value: '0ms', label: 'Setup time' },
          { value: '100%', label: 'Yours' },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-8 pb-12">
        {[
          {
            icon: (
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: 'Full CRUD',
            desc: 'Create, edit, complete and delete tasks with instant updates',
          },
          {
            icon: (
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
            ),
            title: 'Smart tags',
            desc: 'Organise tasks with colour-coded tags and filter instantly',
          },
          {
            icon: (
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            ),
            title: 'Secure auth',
            desc: 'Email auth with Row Level Security — your data stays yours',
          },
          {
            icon: (
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3h3m-3 3h3" />
              </svg>
            ),
            title: 'Responsive',
            desc: 'Works on desktop and mobile with a clean sidebar layout',
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-gray-50/60 border border-gray-100 rounded-2xl p-4"
          >
            <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-3">
              {icon}
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
            <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}