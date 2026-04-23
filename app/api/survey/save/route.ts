import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { userId, block, answers } = await req.json()

  if (!userId || !block || !answers) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  let user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    user = await prisma.user.create({ data: { id: userId } })
  }

  // Upsert ответы — удаляем старые для этого блока и пишем новые
  await prisma.surveyResponse.deleteMany({ where: { userId, block } })

  const records = Object.entries(answers).map(([questionId, value]) => ({
    userId,
    block,
    questionId,
    valueJson: JSON.stringify(value),
  }))

  if (records.length > 0) {
    await prisma.surveyResponse.createMany({ data: records })
  }

  return NextResponse.json({ ok: true })
}
