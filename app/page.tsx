import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="max-w-lg">
        <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full mb-6">
          Built with Next.js + Supabase
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your tasks, organised.
        </h1>

        <p className="text-gray-500 text-lg mb-8">
          A focused task manager built to help you stay on top of
          your work without the overhead of complex project tools.
        </p>

        <div className="flex gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}