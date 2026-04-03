export type Task = {
  id: string
  title: string
  status: 'todo' | 'done'
  dueDate: string | null
  createdAt: string
}

async function simulateDelay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getTasks(): Promise<Task[]> {
  await simulateDelay(100)

  return [
    {
      id: '1',
      title: 'Set up Next.js project',
      status: 'done',
      dueDate: '2026-04-01',
      createdAt: '2026-04-01'
    },
    {
      id: '2',
      title: 'Build login page',
      status: 'done',
      dueDate: '2026-04-02',
      createdAt: '2026-04-01'
    },
    {
      id: '3',
      title: 'Connect Supabase',
      status: 'todo',
      dueDate: '2026-04-10',
      createdAt: '2026-04-02'
    },
    {
      id: '4',
      title: 'Implement auth',
      status: 'todo',
      dueDate: '2026-04-12',
      createdAt: '2026-04-02'
    },
    {
      id: '5',
      title: 'Build CRUD operations',
      status: 'todo',
      dueDate: '2026-04-15',
      createdAt: '2026-04-03'
    },
  ]
}

export async function getTaskById(id: string): Promise<Task | null> {
  const tasks = await getTasks()
  return tasks.find(t => t.id === id) ?? null
}

export async function getTaskStats() {
  const tasks = await getTasks()
  return {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  }
}