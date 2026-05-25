import { NextResponse } from 'next/server'
import { getTags } from '@/lib/data/tags'

export async function GET() {
  const tags = await getTags()
  return NextResponse.json({ data: tags })
}