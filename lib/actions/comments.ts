'use server'

import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth/getUser'
import { revalidatePath } from 'next/cache'

export async function createComment(formData: FormData) {
  const supabase = await createClient()
  const user = await requireUser()

  const taskId = formData.get('taskId') as string
  const body = formData.get('body') as string

  if (!taskId) return { error: 'Task ID is required' }
  if (!body?.trim()) return { error: 'Comment cannot be empty' }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      task_id: taskId,
      user_id: user.id,
      body: body.trim(),
    })
    .select(`
      *,
      user:users (
        name,
        email
      )
    `)
    .single()

  if (error) return { error: error.message }

  revalidatePath(`/tasks/${taskId}`)

  return { data }
}

export async function deleteComment(id: string, taskId: string) {
  const supabase = await createClient()
  const user = await requireUser()

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath(`/tasks/${taskId}`)

  return { success: true }
}