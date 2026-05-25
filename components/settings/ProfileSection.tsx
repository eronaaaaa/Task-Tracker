'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { updateProfile } from '@/lib/auth/actions'

type Props = {
  initialName: string
  initialEmail: string
}

export default function ProfileSection({ initialName, initialEmail }: Props) {
  const [name, setName] = useState(initialName)
  const [email] = useState(initialEmail)
  const [isPending, setIsPending] = useState(false)

  async function handleSave() {
    setIsPending(true)
    const formData = new FormData()
    formData.append('name', name)
    const result = await updateProfile(formData)
    setIsPending(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Profile updated!')
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Update your display name
        </p>
      </div>

      <div className="px-6 py-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl text-gray-400 cursor-not-allowed"
          />
          <p className="text-xs text-gray-300">
            Email cannot be changed after signup
          </p>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50/60 border-t border-gray-50 flex justify-end">
        <Button
          size="sm"
          className="rounded-xl"
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </div>
  )
}