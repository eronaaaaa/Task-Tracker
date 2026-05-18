import { NextResponse } from 'next/server'

type Params = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params

  // Will fetch from Supabase on Day 22
  return NextResponse.json({
    data: {
      id,
      title: 'Example task',
      status: 'todo',
      due_date: null,
      created_at: new Date().toISOString(),
    },
  })
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  const body = await request.json()

  if (!body.title && !body.status && !body.due_date) {
    return NextResponse.json(
      { error: 'No fields to update' },
      { status: 400 }
    )
  }

  // Will update in Supabase on Day 22
  return NextResponse.json({
    data: { id, ...body },
    message: 'Task updated',
  })
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params

  // Will delete from Supabase on Day 22
  return NextResponse.json({
    message: `Task ${id} deleted`,
  })
}