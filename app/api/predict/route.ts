import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { runPredictionPipeline } from '@/lib/scoring/pipeline'

export async function POST(req: NextRequest) {
  const { userId, answers, lang } = await req.json()

  if (!userId) {
    return NextResponse.json({ error: 'No userId' }, { status: 400 })
  }

  let user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    user = await prisma.user.create({ data: { id: userId } })
  }

  const prediction = await prisma.prediction.create({
    data: { userId, status: 'processing' },
  })

  // Run pipeline async (we wait for it since we need the result)
  try {
    const result = await runPredictionPipeline(answers, (lang === 'en' ? 'en' : 'ru') as 'en' | 'ru')

    if (result.crisis) {
      await prisma.prediction.update({
        where: { id: prediction.id },
        data: { status: 'crisis' },
      })
      return NextResponse.json({ crisis: true })
    }

    // Store extra fields inside scores JSON until DB migration is possible
    const bundledScores = {
      ...result.scores,
      __summary:               result.summary,
      __advice:                result.advice,
      __strengths:             result.strengths,
      __risks:                 result.risks,
      __eventExplanations:     result.eventExplanations,
      __scenarioExplanations:  result.scenarioExplanations,
    }

    await prisma.prediction.update({
      where: { id: prediction.id },
      data: {
        status: 'done',
        events:    JSON.stringify(result.events),
        narrative: result.narrative,
        scenarios: JSON.stringify(result.scenarios),
        scores:    JSON.stringify(bundledScores),
      },
    })

    return NextResponse.json({ predictionId: prediction.id })
  } catch (err) {
    await prisma.prediction.update({
      where: { id: prediction.id },
      data: { status: 'error' },
    })
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[PREDICT ERROR]', msg)
    return NextResponse.json({ error: 'Pipeline failed', detail: msg }, { status: 500 })
  }
}
