import { createClient } from '@/lib/supabase/server'

export type Comment = {
  id: string
  task_id: string
  user_id: string
  body: string
  created_at: string
  user: {
    name: string
    email: string
  }
}

export async function getComments(taskId: string): Promise<Comment[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      user:users (
        name,
        email
      )
    `)
    .eq('task_id', taskId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('getComments error:', error)
    return []
  }

  return data as Comment[]
}