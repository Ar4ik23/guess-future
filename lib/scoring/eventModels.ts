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

export const EVENT_CATALOG: EventModel[] = [
  {
    id: 'job_change',
    label: 'Смена работы / занятости',
    direction: 'neutral',
    beta0: -1.5,
    features: [
      { key: 'burnout',        beta: 0.15 },
      { key: 'job_dissatisfy', beta: 0.12 },
      { key: 'job_loss_risk',  beta: 0.10 },
      { key: 'conscientiousness', beta: -0.08 },
      { key: 'tenure_short',   beta: 0.10 },
    ],
  },
  {
    id: 'income_growth',
    label: 'Рост дохода на 20%+',
    direction: 'positive',
    beta0: -2.0,
    features: [
      { key: 'conscientiousness', beta: 0.20 },
      { key: 'self_efficacy',  beta: 0.15 },
      { key: 'income_surplus', beta: 0.10 },
      { key: 'env_growing',    beta: 0.12 },
    ],
  },
  {
    id: 'job_loss',
    label: 'Потеря работы / дохода',
    direction: 'negative',
    beta0: -2.5,
    features: [
      { key: 'job_loss_risk',  beta: 0.20 },
      { key: 'burnout',        beta: 0.10 },
      { key: 'phq9_high',      beta: 0.08 },
    ],
  },
  {
    id: 'new_relationship',
    label: 'Начало серьёзных отношений',
    direction: 'positive',
    beta0: -2.0,
    features: [
      { key: 'single',         beta: 0.30 },
      { key: 'extraversion',   beta: 0.15 },
      { key: 'soc_quality',    beta: 0.10 },
      { key: 'not_lonely',     beta: 0.08 },
    ],
  },
  {
    id: 'relationship_break',
    label: 'Разрыв текущих отношений',
    direction: 'negative',
    beta0: -3.0,
    features: [
      { key: 'in_relationship', beta: 0.10 },
      { key: 'rel_dissatisfy', beta: 0.25 },
      { key: 'phq9_high',      beta: 0.08 },
      { key: 'conflict_high',  beta: 0.10 },
    ],
  },
  {
    id: 'marriage',
    label: 'Вступление в брак',
    direction: 'positive',
    beta0: -3.5,
    features: [
      { key: 'in_relationship', beta: 0.15 },
      { key: 'rel_length_long', beta: 0.20 },
      { key: 'rel_satisfy',    beta: 0.15 },
      { key: 'plans_align',    beta: 0.12 },
    ],
  },
  {
    id: 'child_born',
    label: 'Рождение ребёнка',
    direction: 'positive',
    beta0: -4.0,
    features: [
      { key: 'in_relationship', beta: 0.10 },
      { key: 'age_fertility',  beta: 0.15 },
      { key: 'plans_align',    beta: 0.20 },
      { key: 'finance_stable', beta: 0.10 },
    ],
  },
  {
    id: 'relocation',
    label: 'Переезд в другой город/страну',
    direction: 'neutral',
    beta0: -2.5,
    features: [
      { key: 'openness',       beta: 0.15 },
      { key: 'single',         beta: 0.08 },
      { key: 'job_dissatisfy', beta: 0.10 },
      { key: 'finance_stable', beta: 0.08 },
    ],
  },
  {
    id: 'health_problem',
    label: 'Серьёзное ухудшение здоровья',
    direction: 'negative',
    beta0: -3.0,
    features: [
      { key: 'chronic_count',  beta: 0.12 },
      { key: 'bmi_high',       beta: 0.08 },
      { key: 'low_activity',   beta: 0.08 },
      { key: 'phq9_high',      beta: 0.10 },
      { key: 'age_risk',       beta: 0.10 },
    ],
  },
  {
    id: 'start_therapy',
    label: 'Начало психотерапии',
    direction: 'positive',
    beta0: -3.0,
    features: [
      { key: 'phq9_high',      beta: 0.25 },
      { key: 'gad7_high',      beta: 0.20 },
      { key: 'openness',       beta: 0.10 },
      { key: 'finance_stable', beta: 0.08 },
    ],
  },
  {
    id: 'launch_project',
    label: 'Запуск своего проекта/бизнеса',
    direction: 'positive',
    beta0: -2.5,
    features: [
      { key: 'conscientiousness', beta: 0.20 },
      { key: 'openness',       beta: 0.15 },
      { key: 'self_efficacy',  beta: 0.15 },
      { key: 'env_growing',    beta: 0.10 },
    ],
  },
  {
    id: 'financial_shock',
    label: 'Финансовый шок (потеря 3+ мес. дохода)',
    direction: 'negative',
    beta0: -3.0,
    features: [
      { key: 'low_runway',     beta: 0.20 },
      { key: 'debt_high',      beta: 0.15 },
      { key: 'job_loss_risk',  beta: 0.12 },
      { key: 'bl_lambda',      beta: 0.10 },
    ],
  },
  {
    id: 'circle_shock',
    label: 'Кризис в ближайшем окружении',
    direction: 'negative',
    beta0: -2.0,
    features: [
      { key: 'bl_lambda',      beta: 0.30 },
      { key: 'degrading_count',beta: 0.10 },
    ],
  },
  {
    id: 'complete_learning',
    label: 'Завершение крупного обучения/курса',
    direction: 'positive',
    beta0: -2.5,
    features: [
      { key: 'conscientiousness', beta: 0.25 },
      { key: 'self_efficacy',  beta: 0.15 },
      { key: 'openness',       beta: 0.10 },
      { key: 'planning_good',  beta: 0.10 },
    ],
  },
  {
    id: 'drop_learning',
    label: 'Начать и бросить обучение',
    direction: 'negative',
    beta0: -1.5,
    features: [
      { key: 'planning_bad',   beta: 0.20 },
      { key: 'burnout',        beta: 0.12 },
      { key: 'conscientiousness', beta: -0.15 },
    ],
  },
]

function extractFeatures(r: Responses, scores: Record<string, number>): Record<string, number> {
  const phq9 = scores.PHQ9 ?? 0
  const gad7 = scores.GAD7 ?? 0
  const bmi = get(r,'B04') / Math.pow(get(r,'B03',170) / 100, 2)
  const big5 = scores as Record<string, number>
  const closeCircle = clamp(get(r,'F01'), 0, 10)

  return {
    burnout:         get(r,'B22', 5) / 10,
    job_dissatisfy:  (10 - get(r,'B21', 5)) / 10,
    job_loss_risk:   get(r,'B23', 5) / 10,
    conscientiousness: clamp(scores.Conscientiousness ?? 3, 1, 5) / 5,
    tenure_short:    get(r,'B15', 3) < 2 ? 0.8 : 0.2,
    self_efficacy:   clamp(get(r,'A15') + get(r,'A16') + get(r,'A17'), 3, 15) / 15,
    income_surplus:  clamp((get(r,'B16',1) - get(r,'B17',1)) / Math.max(get(r,'B17',1), 1), -1, 1) * 0.5 + 0.5,
    env_growing:     clamp(get(r,'F24') / Math.max(closeCircle, 1), 0, 1),
    phq9_high:       phq9 >= 10 ? 0.8 : phq9 / 27,
    single:          (() => {
      const s = r['F41'] as string | undefined
      return (s === 'Не в отношениях' || s === 'Свидания / знакомства без обязательств' || s === undefined) ? 1 : 0
    })(),
    in_relationship: (() => {
      const s = r['F41'] as string | undefined
      return (s === 'Отношения меньше года' || s === 'Отношения 1–3 года' || s === 'Отношения более 3 лет' || s === 'В браке') ? 1 : 0
    })(),
    extraversion:    clamp(scores.Extraversion ?? 3, 1, 5) / 5,
    soc_quality:     clamp((scores.Soc ?? 0) + 2, 0, 4) / 4,
    not_lonely:      1 - clamp((get(r,'A38') + get(r,'A39') + get(r,'A40')) / 9, 0, 1),
    rel_dissatisfy:  (10 - get(r,'F42', 5)) / 10,
    rel_satisfy:     get(r,'F42', 5) / 10,
    rel_length_long: (() => {
      const s = r['F41'] as string | undefined
      if (s === 'Отношения 1–3 года' || s === 'Отношения более 3 лет' || s === 'В браке') return 0.8
      if (s === 'Отношения меньше года') return 0.4
      return 0.1
    })(),
    conflict_high:   get(r,'F21', 5) >= 7 ? 0.8 : get(r,'F21', 5) / 10,
    plans_align:     get(r,'F43', 3) / 5,
    age_fertility:   (() => { const a = get(r,'B01', 30); return a >= 20 && a <= 40 ? 0.7 : 0.2 })(),
    finance_stable:  clamp(get(r,'B18', 0) / 6, 0, 1),
    openness:        clamp(scores.Openness ?? 3, 1, 5) / 5,
    chronic_count:   clamp(((r['B09'] as string[] | undefined)?.filter(x => x !== 'Нет').length ?? 0) / 4, 0, 1),
    bmi_high:        bmi > 30 ? 0.7 : 0,
    low_activity:    get(r,'B11', 5) < 2 ? 0.7 : 0.2,
    age_risk:        get(r,'B01', 30) >= 50 ? 0.6 : 0.2,
    gad7_high:       gad7 >= 10 ? 0.7 : gad7 / 21,
    low_runway:      get(r,'B18', 0) < 1 ? 0.8 : 0.2,
    debt_high:       r['B19'] === 'Есть просроченные долги' ? 0.9 : r['B19'] === 'Нет' ? 0 : 0.4,
    bl_lambda:       clamp(scores.BLLambda ?? 0, 0, 1),
    degrading_count: clamp(get(r,'F26') / 5, 0, 1),
    planning_good:   scores.PlanningRealism >= 0.7 ? 0.8 : 0.3,
    planning_bad:    scores.PlanningRealism <= 0.3 ? 0.8 : 0.2,
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

    // Смешиваем с мнением пользователя если он назвал это событие
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
