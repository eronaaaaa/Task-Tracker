'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { requireUser } from '@/lib/auth/getUser'

export async function createTask(formData: FormData) {
  const supabase = await createClient()
  const user = await requireUser()

  const title = formData.get('title') as string
  const dueDate = formData.get('dueDate') as string
  const tagIds = formData.getAll('tagIds') as string[]

  if (!title?.trim()) {
    return { error: 'Title is required' }
  }

  const { data: task, error } = await supabase
    .from('tasks')
    .insert({
      user_id: user.id,
      title: title.trim(),
      due_date: dueDate || null,
      status: 'todo',
    })
    .select()
    .single()

  if (error) return { error: error.message }

  if (tagIds.length > 0) {
    const tagInserts = tagIds.map((tag_id) => ({
      task_id: task.id,
      tag_id,
    }))

    const { error: tagError } = await supabase
      .from('task_tags')
      .insert(tagInserts)

    if (tagError) return { error: tagError.message }
  }

  revalidatePath('/dashboard')

  return { data: task }
}

export async function updateTask(formData: FormData) {
  const supabase = await createClient()
  const user = await requireUser()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const status = formData.get('status') as string
  const dueDate = formData.get('dueDate') as string
  const description = formData.get('description') as string
  const tagIds = formData.getAll('tagIds') as string[]

  if (!id) return { error: 'Task ID is required' }
  if (!title?.trim()) return { error: 'Title is required' }

  const { data: task, error } = await supabase
    .from('tasks')
    .update({
      title: title.trim(),
      status,
      due_date: dueDate || null,
      description: description || null,
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) return { error: error.message }

  await supabase
    .from('task_tags')
    .delete()
    .eq('task_id', id)

  if (tagIds.length > 0) {
    const tagInserts = tagIds.map((tag_id) => ({
      task_id: id,
      tag_id,
    }))

    const { error: tagError } = await supabase
      .from('task_tags')
      .insert(tagInserts)

    if (tagError) return { error: tagError.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/tasks/${id}`)

  return { data: task }
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const user = await requireUser()

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')

  return { success: true }
}

export async function toggleTaskStatus(id: string, currentStatus: string) {
  const supabase = await createClient()
  const user = await requireUser()

  const newStatus = currentStatus === 'done' ? 'todo' : 'done'

  const { error } = await supabase
    .from('tasks')
    .update({ status: newStatus })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath(`/tasks/${id}`)

  return { success: true }
}