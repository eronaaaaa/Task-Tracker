import { NextResponse } from 'next/server'

export async function GET() {
  // Will fetch from Supabase on Day 22
  return NextResponse.json({
    data: [
      { id: '1', name: 'work', color: '#6366f1' },
      { id: '2', name: 'personal', color: '#f59e0b' },
      { id: '3', name: 'urgent', color: '#ef4444' },
    ],
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.name || typeof body.name !== 'string') {
    return NextResponse.json(
      { error: 'Name is required' },
      { status: 400 }
    )
  }

  if (!body.color || typeof body.color !== 'string') {
    return NextResponse.json(
      { error: 'Color is required' },
      { status: 400 }
    )
  }

  // Will insert into Supabase on Day 22
  const newTag = {
    id: Math.random().toString(36).slice(2),
    name: body.name.trim().toLowerCase(),
    color: body.color,
  }

  return NextResponse.json(
    { data: newTag, message: 'Tag created' },
    { status: 201 }
  )
}