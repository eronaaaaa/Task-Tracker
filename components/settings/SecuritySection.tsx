'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { changePassword } from '@/lib/auth/actions'

export default function SecuritySection() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPending, setIsPending] = useState(false)

  async function handleChangePassword() {
    setIsPending(true)
    const formData = new FormData()
    formData.append('newPassword', newPassword)
    formData.append('confirmPassword', confirmPassword)

    const result = await changePassword(formData)
    setIsPending(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Password updated!')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-gray-900">Security</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Change your password
        </p>
      </div>

      <div className="px-6 py-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="new-password"
            className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            New password
          </label>
          <input
            id="new-password"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirm-password"
            className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            Confirm new password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300"
          />
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50/60 border-t border-gray-50 flex justify-end">
        <Button
          size="sm"
          className="rounded-xl"
          onClick={handleChangePassword}
          disabled={isPending || !newPassword || !confirmPassword}
        >
          {isPending ? 'Updating...' : 'Update password'}
        </Button>
      </div>
    </div>
  )
}