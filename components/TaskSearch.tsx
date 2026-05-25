'use client'

import { useState } from 'react'
import type { Task } from '@/lib/data/tasks'
import TaskTable from '@/components/TaskTable'

type Props = {
  tasks: Task[]
}

export default function TaskSearch({ tasks }: Props) {
  const [query, setQuery] = useState('')

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors placeholder:text-gray-300"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {query && (
        <p className="text-xs text-gray-400">
          {filtered.length === 0
            ? 'No tasks match your search'
            : `${filtered.length} task${filtered.length === 1 ? '' : 's'} found`}
        </p>
      )}

      <TaskTable tasks={filtered} />
    </div>
  )
}