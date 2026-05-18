'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'
import { signUp } from '@/lib/auth/actions'
import { Button } from '@/components/ui/button'

export default function SignUpPage() {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await signUp(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm">

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">

          <div className="px-6 pt-6 pb-5 border-b border-gray-50">
            <h1 className="text-lg font-semibold text-gray-900">
              Create an account
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Sign up to start tracking your tasks
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 flex flex-col gap-4">

              {error && (
                <div className="px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Alice Smith"
                  required
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50/60 border-t border-gray-50 flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full rounded-xl"
                disabled={isPending}
              >
                {isPending ? 'Creating account...' : 'Create account'}
              </Button>

              <p className="text-center text-xs text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}