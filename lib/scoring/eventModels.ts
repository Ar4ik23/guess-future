import { sigmoid, clamp } from './normalize'
import { Responses, get } from './indices'

export interface EventModel {
  id: string
  label: string
  direction: 'positive' | 'negative' | 'neutral'
  beta0: number
  features: { key: string; beta: number }[]
}

export interface EventResult {
  eventId: string
  label: string
  probability: number
  direction: 'positive' | 'negative' | 'neutral'
  reasoning: string
}

// beta0 = logit(base_rate) so sigmoid(beta0) equals realistic annual base rate
// when all features = 0 (neutral / unanswered)
export const EVENT_CATALOG: EventModel[] = [
  {
    id: 'job_change',
    label: 'Смена работы / занятости',
    direction: 'neutral',
    beta0: -1.1,   // base ~25%
    features: [
      { key: 'burnout',            beta:  0.55 },
      { key: 'job_dissatisfy',     beta:  0.45 },
      { key: 'job_loss_risk',      beta:  0.40 },
      { key: 'conscientiousness',  beta: -0.35 },
      { key: 'tenure_short',       beta:  0.30 },
    ],
  },
  {
    id: 'income_growth',
    label: 'Рост дохода на 20%+',
    direction: 'positive',
    beta0: -1.5,   // base ~18%
    features: [
      { key: 'conscientiousness',  beta:  0.55 },
      { key: 'self_efficacy',      beta:  0.45 },
      { key: 'income_surplus',     beta:  0.35 },
      { key: 'env_growing',        beta:  0.30 },
    ],
  },
  {
    id: 'job_loss',
    label: 'Потеря работы / дохода',
    direction: 'negative',
    beta0: -2.4,   // base ~8%
    features: [
      { key: 'job_loss_risk',      beta:  0.70 },
      { key: 'burnout',            beta:  0.40 },
      { key: 'phq9_high',          beta:  0.30 },
    ],
  },
  {
    id: 'new_relationship',
    label: 'Начало серьёзных отношений',
    direction: 'positive',
    beta0: -1.7,   // base ~15%
    features: [
      { key: 'single',             beta:  0.70 },
      { key: 'extraversion',       beta:  0.40 },
      { key: 'soc_quality',        beta:  0.30 },
      { key: 'not_lonely',         beta:  0.25 },
    ],
  },
  {
    id: 'relationship_break',
    label: 'Разрыв текущих отношений',
    direction: 'negative',
    beta0: -2.0,   // base ~12%
    features: [
      { key: 'in_relationship',    beta:  0.30 },
      { key: 'rel_dissatisfy',     beta:  0.65 },
      { key: 'phq9_high',          beta:  0.30 },
      { key: 'conflict_high',      beta:  0.40 },
    ],
  },
  {
    id: 'marriage',
    label: 'Вступление в брак',
    direction: 'positive',
    beta0: -2.75,  // base ~6%
    features: [
      { key: 'in_relationship',    beta:  0.40 },
      { key: 'rel_length_long',    beta:  0.55 },
      { key: 'rel_satisfy',        beta:  0.40 },
      { key: 'plans_align',        beta:  0.35 },
    ],
  },
  {
    id: 'child_born',
    label: 'Рождение ребёнка',
    direction: 'positive',
    beta0: -3.2,   // base ~4%
    features: [
      { key: 'in_relationship',    beta:  0.40 },
      { key: 'age_fertility',      beta:  0.55 },
      { key: 'plans_align',        beta:  0.45 },
      { key: 'finance_stable',     beta:  0.30 },
    ],
  },
  {
    id: 'relocation',
    label: 'Переезд в другой город/страну',
    direction: 'neutral',
    beta0: -2.75,  // base ~6%
    features: [
      { key: 'openness',           beta:  0.45 },
      { key: 'single',             beta:  0.30 },
      { key: 'job_dissatisfy',     beta:  0.35 },
      { key: 'finance_stable',     beta:  0.25 },
    ],
  },
  {
    id: 'health_problem',
    label: 'Серьёзное ухудшение здоровья',
    direction: 'negative',
    beta0: -2.75,  // base ~6%
    features: [
      { key: 'chronic_count',      beta:  0.45 },
      { key: 'bmi_high',           beta:  0.40 },
      { key: 'low_activity',       beta:  0.35 },
      { key: 'phq9_high',          beta:  0.30 },
      { key: 'age_risk',           beta:  0.45 },
    ],
  },
  {
    id: 'start_therapy',
    label: 'Начало психотерапии',
    direction: 'positive',
    beta0: -2.4,   // base ~8%
    features: [
      { key: 'phq9_high',          beta:  0.65 },
      { key: 'gad7_high',          beta:  0.55 },
      { key: 'openness',           beta:  0.30 },
      { key: 'finance_stable',     beta:  0.20 },
    ],
  },
  {
    id: 'launch_project',
    label: 'Запуск своего проекта/бизнеса',
    direction: 'positive',
    beta0: -2.0,   // base ~12%
    features: [
      { key: 'conscientiousness',  beta:  0.50 },
      { key: 'openness',           beta:  0.40 },
      { key: 'self_efficacy',      beta:  0.50 },
      { key: 'env_growing',        beta:  0.30 },
    ],
  },
  {
    id: 'financial_shock',
    label: 'Финансовый шок (потеря 3+ мес. дохода)',
    direction: 'negative',
    beta0: -2.75,  // base ~6%
    features: [
      { key: 'low_runway',         beta:  0.65 },
      { key: 'debt_high',          beta:  0.55 },
      { key: 'job_loss_risk',      beta:  0.40 },
      { key: 'bl_lambda',          beta:  0.30 },
    ],
  },
  {
    id: 'circle_shock',
    label: 'Кризис в ближайшем окружении',
    direction: 'negative',
    beta0: -1.7,   // base ~15%
    features: [
      { key: 'bl_lambda',          beta:  0.70 },
      { key: 'degrading_count',    beta:  0.50 },
    ],
  },
  {
    id: 'complete_learning',
    label: 'Завершение крупного обучения/курса',
    direction: 'positive',
    beta0: -1.7,   // base ~15%
    features: [
      { key: 'conscientiousness',  beta:  0.55 },
      { key: 'self_efficacy',      beta:  0.40 },
      { key: 'openness',           beta:  0.30 },
      { key: 'planning_good',      beta:  0.40 },
    ],
  },
  {
    id: 'drop_learning',
    label: 'Начать и бросить обучение',
    direction: 'negative',
    beta0: -1.4,   // base ~20%
    features: [
      { key: 'planning_bad',       beta:  0.55 },
      { key: 'burnout',            beta:  0.40 },
      { key: 'conscientiousness',  beta: -0.50 },
    ],
  },
]

function extractFeatures(r: Responses, scores: Record<string, number>): Record<string, number> {
  const phq9 = scores.PHQ9 ?? 0
  const gad7 = scores.GAD7 ?? 0
  const closeCircle = clamp(get(r, 'F01'), 0, 10)

  // Likert 1-5 → [-1, 1]. Returns 0 when unanswered (raw = 0).
  const l5 = (raw: number): number => {
    if (!raw) return 0
    return clamp((raw - 3) / 2, -1, 1)
  }

  // Likert 1-10 → [-1, 1]. Returns 0 when unanswered.
  const l10 = (raw: number): number => {
    if (!raw) return 0
    return clamp((raw - 5.5) / 4.5, -1, 1)
  }

  // Big5 trait: only use if at least one source question was answered.
  const big5feat = (trait: string, q1: string, q2: string): number => {
    if (!get(r, q1) && !get(r, q2)) return 0
    return l5(scores[trait] ?? 3)
  }

  const relStatus = r['F41'] as string | undefined
  // Russian: 'Отношения…' or 'В браке'; English: 'Relationship…' or 'Married'
  const isInRel = relStatus !== undefined && (
    relStatus.startsWith('Отношения') || relStatus === 'В браке' ||
    relStatus.startsWith('Relationship') || relStatus === 'Married'
  )
  const isSingle = relStatus !== undefined && !isInRel
  // Long-term: 1-3 years or more
  const isLongRel = isInRel && (
    relStatus.includes('1–3') ||
    relStatus.includes('более 3') || relStatus.includes('over 3') ||
    relStatus === 'В браке' || relStatus === 'Married'
  )

  return {
    burnout:           l10(get(r, 'B22')),
    job_dissatisfy:    -l10(get(r, 'B21')),    // high satisfaction → negative feature
    job_loss_risk:     l10(get(r, 'B23')),
    conscientiousness: big5feat('Conscientiousness', 'A05', 'A06'),
    tenure_short:      (() => {
      const t = get(r, 'B15')
      if (!t) return 0
      return t < 2 ? 0.7 : t > 4 ? -0.4 : 0
    })(),
    self_efficacy:     (() => {
      const s = get(r, 'A15') + get(r, 'A16') + get(r, 'A17')
      if (!s) return 0
      return clamp((s / 15 - 0.5) * 2, -1, 1)
    })(),
    income_surplus:    (() => {
      const inc = get(r, 'B16'), exp = get(r, 'B17')
      if (!inc && !exp) return 0
      if (!exp) return 0
      return clamp((inc - exp) / Math.max(exp, 1) * 0.3, -1, 1)
    })(),
    env_growing:       closeCircle > 0 ? (() => {
      const v = get(r, 'F24')
      if (!v) return 0
      return clamp((v / closeCircle - 0.5) * 2, -1, 1)
    })() : 0,
    phq9_high:         phq9 > 0 ? clamp((phq9 / 27 - 0.5) * 2, -1, 1) : 0,
    single:            relStatus !== undefined ? (isSingle ? 0.7 : -0.4) : 0,
    in_relationship:   relStatus !== undefined ? (isInRel ? 0.7 : -0.4) : 0,
    extraversion:      big5feat('Extraversion', 'A02', 'A01'),
    soc_quality:       scores.Soc !== undefined ? clamp(scores.Soc / 2, -1, 1) : 0,
    not_lonely:        (() => {
      const a38 = get(r, 'A38'), a39 = get(r, 'A39'), a40 = get(r, 'A40')
      if (!a38 && !a39 && !a40) return 0
      const sum = a38 + a39 + a40
      return -clamp((sum / 9 - 0.5) * 2, -1, 1)
    })(),
    rel_dissatisfy:    get(r, 'F42') ? -l10(get(r, 'F42')) : 0,
    rel_satisfy:       l10(get(r, 'F42')),
    rel_length_long:   relStatus !== undefined ? (isLongRel ? 0.7 : -0.4) : 0,
    conflict_high:     l10(get(r, 'F21')),
    plans_align:       l5(get(r, 'F43')),
    age_fertility:     (() => {
      const a = get(r, 'B01')
      if (!a) return 0
      return a >= 20 && a <= 38 ? 0.7 : a > 38 && a <= 45 ? -0.2 : -0.7
    })(),
    finance_stable:    (() => {
      const m = get(r, 'B18')
      if (!m) return 0
      return clamp((m / 6 - 0.5) * 2, -1, 1)
    })(),
    openness:          big5feat('Openness', 'A09', 'A10'),
    chronic_count:     (() => {
      const arr = r['B09'] as string[] | undefined
      if (!arr) return 0
      const n = arr.filter(x =>
        !x.includes('Нет') && x !== 'None' && !x.toLowerCase().includes('no chronic')
      ).length
      return clamp((n / 4 - 0.5) * 2, -1, 1)
    })(),
    bmi_high:          (() => {
      const h = get(r, 'B03'), w = get(r, 'B04')
      if (!h || !w) return 0
      const bmi = w / Math.pow(h / 100, 2)
      return bmi > 30 ? 0.7 : bmi > 25 ? 0.1 : -0.4
    })(),
    low_activity:      (() => {
      const a = get(r, 'B11')
      if (!a) return 0
      return a < 3 ? 0.7 : a < 6 ? 0 : -0.5
    })(),
    age_risk:          (() => {
      const a = get(r, 'B01')
      if (!a) return 0
      return a >= 55 ? 0.7 : a >= 45 ? 0.2 : -0.3
    })(),
    gad7_high:         gad7 > 0 ? clamp((gad7 / 21 - 0.5) * 2, -1, 1) : 0,
    low_runway:        (() => {
      const m = get(r, 'B18')
      if (!m) return 0
      return m < 1 ? 0.8 : m < 3 ? 0 : -0.6
    })(),
    debt_high:         (() => {
      const d = r['B19'] as string | undefined
      if (!d) return 0
      if (d.includes('просроченн') || d.toLowerCase().includes('overdue')) return 0.9
      if (d === 'Нет' || d === 'No' || d === 'No debts' || d.includes('Долгов нет')) return -0.5
      return 0.3
    })(),
    bl_lambda:         scores.BLLambda !== undefined
      ? clamp((scores.BLLambda / 0.25 - 0.5) * 2, -1, 1)
      : 0,
    degrading_count:   (() => {
      const v = get(r, 'F26')
      if (!v) return 0
      return clamp((v / 5 - 0.5) * 2, -1, 1)
    })(),
    planning_good:     scores.PlanningRealism !== undefined
      ? clamp((scores.PlanningRealism - 0.5) * 2, -1, 1)
      : 0,
    planning_bad:      scores.PlanningRealism !== undefined
      ? clamp(((1 - scores.PlanningRealism) - 0.5) * 2, -1, 1)
      : 0,
  }
}

function reasoningFor(id: string, probability: number): string {
  const pct = Math.round(probability * 100)
  const reasons: Record<string, string> = {
    job_change:         `Вероятность смены работы — ${pct}%, основано на уровне выгорания и удовлетворённости.`,
    income_growth:      `Рост дохода на 20%+ — ${pct}%, прогнозируется по добросовестности и окружению.`,
    job_loss:           `Риск потери работы — ${pct}%.`,
    new_relationship:   `Шанс начать серьёзные отношения — ${pct}%.`,
    relationship_break: `Вероятность разрыва отношений — ${pct}%.`,
    marriage:           `Вероятность вступления в брак — ${pct}%, исходя из длительности отношений.`,
    child_born:         `Вероятность рождения ребёнка — ${pct}%.`,
    relocation:         `Вероятность переезда — ${pct}%.`,
    health_problem:     `Риск ухудшения здоровья — ${pct}%.`,
    start_therapy:      `Вероятность начала терапии — ${pct}%.`,
    launch_project:     `Шанс запустить собственный проект — ${pct}%.`,
    financial_shock:    `Риск финансового шока — ${pct}%, исходя из размера подушки и долгов.`,
    circle_shock:       `Риск кризиса из окружения — ${pct}%, по анализу факторов риска.`,
    complete_learning:  `Вероятность завершить обучение — ${pct}%.`,
    drop_learning:      `Вероятность бросить начатое обучение — ${pct}%.`,
  }
  return reasons[id] ?? `Вероятность — ${pct}%.`
}

export function calcEventProbabilities(
  r: Responses,
  scores: Record<string, number>
): EventResult[] {
  const feats = extractFeatures(r, scores)

  return EVENT_CATALOG.map(ev => {
    const logit = ev.beta0 + ev.features.reduce((s, f) => {
      return s + f.beta * (feats[f.key] ?? 0)
    }, 0)
    const rawP = sigmoid(logit)

    // Blend with user's own event estimate when provided
    const userEvents = r['D01'] as Array<{ label: string; probability: number }> | undefined
    const rho = scores.Rho ?? 0.5
    const rSelf = scores.RSelf ?? 0.5
    const wD = rho * rSelf
    let finalP = rawP
    if (userEvents) {
      const match = userEvents.find(ue =>
        ue.label.toLowerCase().includes(ev.label.substring(0, 6).toLowerCase())
      )
      if (match) {
        const userP = clamp((match.probability ?? 50) / 100, 0, 1)
        finalP = (1 - wD) * rawP + wD * userP
      }
    }

    return {
      eventId: ev.id,
      label: ev.label,
      probability: clamp(finalP, 0.01, 0.99),
      direction: ev.direction,
      reasoning: reasoningFor(ev.id, finalP),
    }
  }).sort((a, b) => b.probability - a.probability)
}
