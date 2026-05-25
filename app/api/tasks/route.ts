import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    data: [
      {
        id: '1',
        title: 'Set up Next.js project',
        status: 'done',
        due_date: '2026-04-01',
        created_at: '2026-04-01',
      },
      {
        id: '2',
        title: 'Connect Supabase',
        status: 'todo',
        due_date: '2026-04-10',
        created_at: '2026-04-02',
      },
    ],
    count: 2,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    )
  }

  const newTask = {
    id: Math.random().toString(36).slice(2),
    title: body.title.trim(),
    status: 'todo',
    due_date: body.due_date ?? null,
    created_at: new Date().toISOString(),
  }

  return NextResponse.json(
    { data: newTask, message: 'Task created' },
    { status: 201 }
  )
}