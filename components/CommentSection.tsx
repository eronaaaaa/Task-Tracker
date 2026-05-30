'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createComment, deleteComment } from '@/lib/actions/comments'
import { formatDate } from '@/lib/utils'
import type { Comment } from '@/lib/data/comments'

type Props = {
  taskId: string
  initialComments: Comment[]
  currentUserId: string
}

export default function CommentSection({
  taskId,
  initialComments,
  currentUserId,
}: Props) {
  const [comments, setComments] = useState(initialComments)
  const [body, setBody] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit() {
    if (!body.trim()) return

    const formData = new FormData()
    formData.append('taskId', taskId)
    formData.append('body', body)

    startTransition(async () => {
      const result = await createComment(formData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        setComments((prev) => [...prev, result.data as Comment])
        setBody('')
        toast.success('Comment added')
      }
    })
  }

  function handleDelete(commentId: string) {
    startTransition(async () => {
      const result = await deleteComment(commentId, taskId)

      if (result?.error) {
        toast.error(result.error)
      } else {
        setComments((prev) => prev.filter((c) => c.id !== commentId))
        toast.success('Comment deleted')
      }
    })
  }

  function getInitials(name: string) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="px-6 py-5 border-t border-gray-50">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
        Comments
        {comments.length > 0 && (
          <span className="ml-2 text-gray-300 normal-case font-normal">
            {comments.length}
          </span>
        )}
      </p>

      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-3">
            <span className="text-gray-300 text-lg">💬</span>
          </div>
          <p className="text-sm text-gray-400">No comments yet...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-5">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-indigo-600">
                  {getInitials(comment.user?.name || comment.user?.email || 'U')}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-700">
                    {comment.user?.name || comment.user?.email?.split('@')[0]}
                  </span>
                  <span className="text-xs text-gray-300">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {comment.body}
                  </p>
                </div>
              </div>

              {comment.user_id === currentUserId && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  disabled={isPending}
                  className="text-gray-200 cursor-pointer hover:text-red-400 transition-colors mt-1 flex-shrink-0"
                  aria-label="Delete comment"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          disabled={isPending}
          className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300 disabled:cursor-not-allowed"
        />
        <Button
          size="sm"
          className="rounded-xl flex-shrink-0 cursor-pointer"
          onClick={handleSubmit}
          disabled={isPending || !body.trim()}
        >
          {isPending ? '...' : 'Post'}
        </Button>
      </div>
      <p className="text-xs text-gray-300 mt-1.5">
        Press Enter to post
      </p>
    </div>
  )
}