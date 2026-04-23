import { EventResult } from '../scoring/eventModels'

export interface Scenario {
  label: string
  probability: number
  description: string
  type: 'optimistic' | 'base' | 'pessimistic'
}

export interface SimulationResult {
  scenarios: Scenario[]
  entropy: number
  topEvents: EventResult[]
}

function sampleBernoulli(p: number): boolean {
  return Math.random() < p
}

function calcEntropy(probs: number[]): number {
  return -probs.reduce((s, p) => {
    if (p <= 0 || p >= 1) return s
    return s + p * Math.log2(p) + (1 - p) * Math.log2(1 - p)
  }, 0) / probs.length
}

export function runSimulation(
  eventProbs: EventResult[],
  blLambda: number,
  n = 10000,
  lang: 'en' | 'ru' = 'ru'
): SimulationResult {
  const positives = eventProbs.filter(e => e.direction === 'positive')
  const negatives = eventProbs.filter(e => e.direction === 'negative')

  let optCount = 0
  let pesCount = 0
  let baseCount = 0

  const blShockProb = 1 - Math.exp(-blLambda)

  // Адаптивные пороги — основаны на ожидаемой сумме событий (не фиксированные),
  // чтобы избежать перекоса, когда все вероятности низкие
  const expectedPos = positives.reduce((s, e) => s + e.probability, 0)
  const expectedNeg = negatives.reduce((s, e) => s + e.probability, 0) + blShockProb
  const expectedNet = expectedPos - expectedNeg * 1.2
  const threshold = Math.max(0.6, (expectedPos + expectedNeg) * 0.35)

  for (let i = 0; i < n; i++) {
    let posScore = 0
    let negScore = 0

    for (const ev of positives) {
      if (sampleBernoulli(ev.probability)) posScore++
    }
    for (const ev of negatives) {
      if (sampleBernoulli(ev.probability)) negScore++
    }
    const blShock = sampleBernoulli(blShockProb) ? 1 : 0
    negScore += blShock

    const net = posScore - negScore * 1.2
    const deviation = net - expectedNet
    if (deviation >= threshold) optCount++
    else if (deviation <= -threshold) pesCount++
    else baseCount++
  }

  const total = n
  const optP  = optCount / total
  const pesP  = pesCount / total
  const baseP = baseCount / total

  const topPos = positives.filter(e => e.probability > 0.3).slice(0, 2).map(e => e.label).join(', ')
  const topNeg = negatives.filter(e => e.probability > 0.25).slice(0, 2).map(e => e.label).join(', ')

  const scenarios: Scenario[] = (lang === 'en' ? [
    {
      label: 'Base scenario',
      probability: Math.round(baseP * 100),
      description: `A moderate year without dramatic shifts. ${topPos ? `Likely: ${topPos}.` : ''} ${topNeg ? `Risks: ${topNeg}.` : ''}`,
      type: 'base' as const,
    },
    {
      label: 'Optimistic scenario',
      probability: Math.round(optP * 100),
      description: `A year of growth and positive change. Key goals are achieved, social circle is supportive. ${topPos ? `Includes: ${topPos}.` : ''}`,
      type: 'optimistic' as const,
    },
    {
      label: 'Pessimistic scenario',
      probability: Math.round(pesP * 100),
      description: `A challenging year. Stress accumulates; unexpected setbacks from surroundings are possible. ${topNeg ? `Risks: ${topNeg}.` : ''}`,
      type: 'pessimistic' as const,
    },
  ] : [
    {
      label: 'Базовый сценарий',
      probability: Math.round(baseP * 100),
      description: `Умеренный год без резких перемен. ${topPos ? `Возможны: ${topPos}.` : ''} ${topNeg ? `Риски: ${topNeg}.` : ''}`,
      type: 'base' as const,
    },
    {
      label: 'Оптимистичный сценарий',
      probability: Math.round(optP * 100),
      description: `Год роста и позитивных изменений. Несколько ключевых целей достигаются, окружение поддерживает. ${topPos ? `Включает: ${topPos}.` : ''}`,
      type: 'optimistic' as const,
    },
    {
      label: 'Пессимистичный сценарий',
      probability: Math.round(pesP * 100),
      description: `Год испытаний. Накопление стрессов, возможны неожиданные удары из окружения. ${topNeg ? `Риски: ${topNeg}.` : ''}`,
      type: 'pessimistic' as const,
    },
  ] as Scenario[]).sort((a, b) => b.probability - a.probability)

  const entropy = calcEntropy(eventProbs.map(e => e.probability))

  return {
    scenarios,
    entropy,
    topEvents: eventProbs.slice(0, 10),
  }
}
