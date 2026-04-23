import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { EventResult } from '@/lib/scoring/eventModels'
import { Scenario } from '@/lib/simulation/montecarlo'
import { ResultClient } from './ResultClient'
import { AdviceItem } from '@/lib/llm/narrative'

interface PredictionData {
  id: string
  events: EventResult[]
  narrative: string
  summary: string
  scenarios: Scenario[]
  scores: Record<string, number>
  advice: AdviceItem[]
  strengths: string[]
  risks: string[]
  eventExplanations: Record<string, string>
  scenarioExplanations: Record<string, string>
}

async function getPrediction(id: string): Promise<PredictionData | null> {
  const p = await prisma.prediction.findUnique({ where: { id } })
  if (!p || p.status !== 'done') return null

  const rawScores = JSON.parse(p.scores) as Record<string, unknown>
  const summary = typeof rawScores.__summary === 'string' ? rawScores.__summary : ''
  const advice = Array.isArray(rawScores.__advice) ? rawScores.__advice as AdviceItem[] : []
  const strengths = Array.isArray(rawScores.__strengths) ? rawScores.__strengths as string[] : []
  const risks = Array.isArray(rawScores.__risks) ? rawScores.__risks as string[] : []
  const eventExplanations = typeof rawScores.__eventExplanations === 'object' && rawScores.__eventExplanations !== null
    ? rawScores.__eventExplanations as Record<string, string>
    : {}
  const scenarioExplanations = typeof rawScores.__scenarioExplanations === 'object' && rawScores.__scenarioExplanations !== null
    ? rawScores.__scenarioExplanations as Record<string, string>
    : {}

  // Чистим служебные поля, оставляя только числовые scores
  const scores: Record<string, number> = {}
  for (const [k, v] of Object.entries(rawScores)) {
    if (!k.startsWith('__') && typeof v === 'number') scores[k] = v
  }

  return {
    id: p.id,
    events:    JSON.parse(p.events),
    narrative: p.narrative,
    scenarios: JSON.parse(p.scenarios),
    scores,
    summary,
    advice,
    strengths,
    risks,
    eventExplanations,
    scenarioExplanations,
  }
}

export default async function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const prediction = await getPrediction(id)
  if (!prediction) notFound()

  return <ResultClient data={prediction} />
}
