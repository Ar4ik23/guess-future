import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const prediction = await prisma.prediction.findUnique({ where: { id } })
  if (!prediction) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({
    id: prediction.id,
    status: prediction.status,
    events:    JSON.parse(prediction.events),
    narrative: prediction.narrative,
    scenarios: JSON.parse(prediction.scenarios),
    scores:    JSON.parse(prediction.scores),
  })
}
