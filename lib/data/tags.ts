import { createClient } from '@/lib/supabase/server'

export type Tag = {
  id: string
  name: string
  color: string
}

export async function getTags() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  if (error) {
    console.error('getTags error:', error)
    return []
  }

  return data as Tag[]
}