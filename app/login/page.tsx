'use client'

import Link from 'next/link'
import { useState, useTransition, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signIn } from '@/lib/auth/actions'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

function LoginForm() {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await signIn(formData)

      if (result?.error) {
        setError(result.error)
        return
      }

      const supabase = createClient()
      await supabase.auth.refreshSession()

      router.push(redirectTo || '/dashboard')
      router.refresh()
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-5 border-b border-gray-50">
            <h1 className="text-lg font-semibold text-gray-900">
              Sign in
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Enter your credentials to access your tasks
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 flex flex-col gap-4">
              {redirectTo && (
                <div className="px-3 py-2.5 bg-indigo-50 border border-indigo-100 rounded-xl">
                  <p className="text-xs text-indigo-600">
                    Please sign in to continue
                  </p>
                </div>
              )}

              {error && (
                <div className="px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

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

              <input
                type="hidden"
                name="redirectTo"
                value={redirectTo ?? ''}
              />
            </div>

            <div className="px-6 py-4 bg-gray-50/60 border-t border-gray-50 flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full rounded-xl"
                disabled={isPending}
              >
                {isPending ? 'Signing in...' : 'Sign in'}
              </Button>

              <p className="text-center text-xs text-gray-400">
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}