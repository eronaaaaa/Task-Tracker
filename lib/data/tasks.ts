import { createClient } from '@/lib/supabase/server'

export type Tag = {
  id: string
  name: string
  color: string
}

export type Task = {
  id: string
  title: string
  status: 'todo' | 'done'
  due_date: string | null
  created_at: string
  description: string | null
  tags: Tag[]
}

export async function getTasks() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      task_tags (
        tags (
          id,
          name,
          color
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getTasks error:', error)
    return []
  }

  return data.map((task) => ({
    ...task,
    tags: task.task_tags?.map((tt: Task) => tt.tags).filter(Boolean) ?? [],
  })) as Task[]
}

export async function getTaskById(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      task_tags (
        tags (
          id,
          name,
          color
        )
      )
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) return null

  return {
    ...data,
    tags: data.task_tags?.map((tt: Task) => tt.tags).filter(Boolean) ?? [],
  } as Task
}

export async function getTaskStats() {
  const tasks = await getTasks()

  return {
    total: tasks.length,
    done: tasks.filter((t) => t.status === 'done').length,
    todo: tasks.filter((t) => t.status === 'todo').length,
  }
}