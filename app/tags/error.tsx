'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function TagsError({ error, reset }: Props) {
  useEffect(() => {
    console.error('Tags error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
        <span className="text-red-400 text-xl">#</span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Couldn&apos;t load tags
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        There was a problem fetching your tags.
      </p>
      <Button onClick={reset} size="sm" className="rounded-xl">
        Try again
      </Button>
    </div>
  )
}