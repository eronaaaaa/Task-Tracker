'use server'

import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth/getUser'
import { revalidatePath } from 'next/cache'

export async function createTag(formData: FormData) {
  const supabase = await createClient()
  const user = await requireUser()

  const name = formData.get('name') as string
  const color = formData.get('color') as string

  if (!name?.trim()) return { error: 'Name is required' }
  if (!color) return { error: 'Color is required' }

  const { data: tag, error } = await supabase
    .from('tags')
    .insert({
      user_id: user.id,
      name: name.trim().toLowerCase(),
      color,
    })
    .select()
    .single()

  if (error) {
    // Handle duplicate tag name
    if (error.code === '23505') {
      return { error: 'A tag with this name already exists' }
    }
    return { error: error.message }
  }

  revalidatePath('/tags')

  return { data: tag }
}

export async function updateTag(formData: FormData) {
  const supabase = await createClient()
  const user = await requireUser()

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const color = formData.get('color') as string

  if (!id) return { error: 'Tag ID is required' }
  if (!name?.trim()) return { error: 'Name is required' }

  const { data: tag, error } = await supabase
    .from('tags')
    .update({
      name: name.trim().toLowerCase(),
      color,
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return { error: 'A tag with this name already exists' }
    }
    return { error: error.message }
  }

  revalidatePath('/tags')
  revalidatePath('/dashboard')

  return { data: tag }
}

export async function deleteTag(id: string) {
  const supabase = await createClient()
  const user = await requireUser()

  const { error } = await supabase
    .from('tags')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/tags')
  revalidatePath('/dashboard')

  return { success: true }
}