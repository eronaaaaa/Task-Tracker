'use client'

import { useState, useRef, useEffect } from 'react'
import TaskSearch from '@/components/TaskSearch'
import type { Task } from '@/lib/data/tasks'

type StatusFilter = 'all' | 'todo' | 'done'

type Props = {
  tasks: Task[]
}

export default function TaskFilter({ tasks }: Props) {
  const [status, setStatus] = useState<StatusFilter>('all')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const allTags = Array.from(
    new Map(
      tasks.flatMap((t) => t.tags).map((tag) => [tag.id, tag])
    ).values()
  )

  const selectedTagData = allTags.find((t) => t.id === selectedTag)

  const filtered = tasks.filter((t) => {
    const matchesStatus = status === 'all' || t.status === status
    const matchesTag = !selectedTag || t.tags.some((tag) => tag.id === selectedTag)
    return matchesStatus && matchesTag
  })

  const statusFilters: { label: string; value: StatusFilter }[] = [
    { label: `All (${tasks.length})`, value: 'all' },
    { label: `To do (${tasks.filter((t) => t.status === 'todo').length})`, value: 'todo' },
    { label: `Done (${tasks.filter((t) => t.status === 'done').length})`, value: 'done' },
  ]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTagDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">

        <div className="flex gap-1.5 p-1 bg-gray-100/80 rounded-xl w-fit">
          {statusFilters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setStatus(value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                status === value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {allTags.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border ${
                selectedTag
                  ? 'bg-white border-gray-200 text-gray-700 shadow-sm'
                  : 'bg-gray-100/80 border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {selectedTagData ? (
                <>
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: selectedTagData.color }}
                  />
                  <span style={{ color: selectedTagData.color }}>
                    {selectedTagData.name}
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                  Filter by tag
                </>
              )}
              <svg
                className={`w-3 h-3 transition-transform ${tagDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gray-400 hover:bg-gray-600 text-white flex items-center justify-center transition-colors"
                aria-label="Clear tag filter"
              >
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {tagDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-gray-100 rounded-xl shadow-sm z-10 overflow-hidden">
                <div className="p-1.5 max-h-56 overflow-y-auto">
                  {allTags.map((tag) => {
                    const isActive = selectedTag === tag.id
                    return (
                      <button
                        key={tag.id}
                        onClick={() => {
                          setSelectedTag(isActive ? null : tag.id)
                          setTagDropdownOpen(false)
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors text-left"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: tag.color }}
                        />
                        <span className="flex-1 text-gray-700">{tag.name}</span>
                        {isActive && (
                          <svg
                            className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <TaskSearch tasks={filtered} />
    </div>
  )
}
