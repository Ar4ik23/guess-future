import { zScore, sigmoid, clamp, reverseItem } from './normalize'

type Responses = Record<string, number | string | number[] | string[] | object[]>

function get(r: Responses, id: string, fallback = 0): number {
  const v = r[id]
  if (v === undefined || v === null) return fallback
  if (typeof v === 'number') return v
  if (typeof v === 'string') return parseFloat(v) || fallback
  return fallback
}

// ─── PHQ-9 (ids A18-A26) ──────────────────────────────────────────────────────
export function calcPHQ9(r: Responses): number {
  const ids = ['A18','A19','A20','A21','A22','A23','A24','A25','A26']
  return ids.reduce((s, id) => s + get(r, id), 0)
}

// ─── GAD-7 (ids A27-A33) ──────────────────────────────────────────────────────
export function calcGAD7(r: Responses): number {
  const ids = ['A27','A28','A29','A30','A31','A32','A33']
  return ids.reduce((s, id) => s + get(r, id), 0)
}

// ─── PSS-4 (ids A34-A37) ──────────────────────────────────────────────────────
// Шкала 0..4, positive items A34/A37 берём как есть, negative A35/A36 инвертируем
export function calcPSS4(r: Responses): number {
  const pos = [get(r,'A34'), get(r,'A37')]
  const neg = [4 - get(r,'A35'), 4 - get(r,'A36')]
  return pos.reduce((a,b)=>a+b,0) + neg.reduce((a,b)=>a+b,0)
}

// ─── BFI-10 ───────────────────────────────────────────────────────────────────
function bfiBig5(r: Responses) {
  const score = (a: string, b: string, maxB = 5) =>
    (get(r, a) + reverseItem(get(r, b, 3), maxB)) / 2
  return {
    Extraversion:     score('A02', 'A01'),
    Agreeableness:    score('A04', 'A03'),
    Conscientiousness:score('A05', 'A06'),
    Neuroticism:      (get(r,'A07') + reverseItem(get(r,'A08',3),5)) / 2,
    Openness:         score('A09', 'A10'),
  }
}

// ─── Overconfidence ───────────────────────────────────────────────────────────
// Ответы хранятся как {answer, low, high}, правильные ответы захардкожены
const INTERVAL_ANSWERS: Record<string, number> = {
  A49: 1879, // Эйнштейн
  A50: 384400, // Луна (км)
  A51: 26,  // Австралия (млн)
  A52: 1876, // телефон
  A53: 6650, // Нил (км)
}

export function calcOverconfidence(r: Responses): number {
  const ids = ['A49','A50','A51','A52','A53']
  let hits = 0
  let total = 0
  for (const id of ids) {
    const val = r[id] as { answer?: number; low?: number; high?: number } | undefined
    if (!val || val.low === undefined || val.high === undefined) continue
    total++
    if (INTERVAL_ANSWERS[id] >= val.low && INTERVAL_ANSWERS[id] <= val.high) hits++
  }
  return total > 0 ? hits / total : 0.5
}

// ─── Планинг-фоллэси ──────────────────────────────────────────────────────────
export function calcPlanningRealism(r: Responses): number {
  const a54 = get(r, 'A54', 2) // 1-4, меньше = реалистичнее
  const a55 = get(r, 'A55', 2) // 1-5, 1 = быстрее, 5 = сильно медленнее
  return 1 - clamp((a54 - 1) / 3 * 0.5 + (a55 - 1) / 4 * 0.5, 0, 1)
}

// ─── ρ (коэффициент рациональности) ──────────────────────────────────────────
export function calcRho(r: Responses): number {
  const big5 = bfiBig5(r)
  const oc = calcOverconfidence(r)
  const pr = calcPlanningRealism(r)
  const neuZ = zScore(big5.Neuroticism, 'Neuroticism')
  const rho = 0.5 * oc + 0.3 * pr + 0.2 * (1 - clamp(neuZ / 3, 0, 1))
  return clamp(rho, 0.1, 1.0)
}

// ─── r_self (реализм прошлого года) ──────────────────────────────────────────
export function calcRSelf(r: Responses): { rSelf: number; calibration: number; rSelfWeighted: number } {
  const goals = r['C01'] as Array<{ importance: number; statedProb: number; outcome: number }> | undefined
  if (!goals || goals.length === 0) return { rSelf: 0.5, calibration: 0.5, rSelfWeighted: 0.25 }

  let weightedOutcome = 0
  let weightedTotal = 0
  let brierSum = 0

  for (const g of goals) {
    const imp = clamp(g.importance || 5, 1, 10)
    const outcome = clamp(g.outcome ?? 0, 0, 1)
    const stated = clamp((g.statedProb ?? 50) / 100, 0, 1)
    weightedOutcome += outcome * imp
    weightedTotal += imp
    brierSum += Math.pow(stated - outcome, 2)
  }

  const rSelf = weightedTotal > 0 ? weightedOutcome / weightedTotal : 0.5
  const brier = brierSum / goals.length
  const calibration = 1 - brier
  const realism = 0.6 * rSelf + 0.4 * calibration
  return { rSelf: realism, calibration, rSelfWeighted: realism * 0.5 } // confidence_C=0.5 (по памяти)
}

// ─── Soc (социальный композит) ────────────────────────────────────────────────
export function calcSoc(r: Responses): number {
  const closeCircle = clamp(get(r,'F01'), 0, 10)
  const midCircle   = clamp(get(r,'F02'), 0, 100)
  const longFriends5 = get(r,'F05')
  const longFriends10 = get(r,'F06')
  const Structure = clamp(
    (closeCircle / 5) * 0.3 + Math.min(midCircle / 20, 1) * 0.2 + Math.min((longFriends5 + longFriends10) / 10, 1) * 0.5,
    0, 1
  )

  // MSPSS-3: F11 (семья) + F15 (друзья) + F13 (значимый другой), шкала 1-7
  const mspssRaw = get(r,'F11',4) + get(r,'F15',4) + get(r,'F13',4)
  const mspss = mspssRaw * 4 // нормализуем к шкале MSPSS-12 (3*4=12)
  const mspssZ = zScore(mspss, 'MSPSS')
  const has3am = get(r,'F08') === 1 || r['F08'] === 'Да' ? 1 : -1
  const conflict = clamp(get(r,'F21'), 1, 10)
  const Quality = clamp(mspssZ * 0.5 + has3am * 0.3 - (conflict - 1) / 9 * 0.2, -1, 1)

  const growing   = get(r,'F24')
  const degrading = get(r,'F26')
  const Env = clamp((growing - degrading) / Math.max(closeCircle, 1), -1, 1)

  // Семья
  const relMother = r['F30'] === 'Нет' ? 0 : get(r,'F29', 5) / 10
  const relFather = r['F34'] === 'Нет' ? 0 : get(r,'F33', 5) / 10
  const patterns = (r['F39'] as string[] | undefined)?.filter(p => p !== 'Ничего из перечисленного').length ?? 0
  const Family = clamp(relMother * 0.35 + relFather * 0.35 + (patterns === 0 ? 0.3 : -0.1 * patterns), 0, 1)

  // Романтика (F41 теперь статус, B07 — семейный статус)
  const relStatus = r['F41'] as string | undefined
  const inRel = relStatus != null && relStatus !== 'Не в отношениях' && relStatus !== 'Свидания / знакомства без обязательств'
  const relSat = inRel ? get(r,'F42', 5) / 10 : 0
  const plansAlign = inRel ? (get(r,'F43', 3) - 1) / 4 : 0
  const Romance = inRel ? relSat * 0.5 + plansAlign * 0.5 : 0

  // BL-риски
  const blRisks =
    (r['F51'] === 'Да' ? 0.05 : 0) +
    (r['F52'] === 'Да' ? 0.08 : 0) +
    get(r,'F53') * 0.04 +
    (r['F54'] === 'Да' ? 0.10 : 0) +
    get(r,'F55') * 0.03

  const Soc =
    0.20 * Structure +
    0.25 * Quality +
    0.25 * Env +
    0.15 * Family +
    0.15 * Romance

  return clamp(Soc * 4 - 2, -2, 2) // normalize to [-2,2]
}

// ─── LSI (Life Stability Index) ───────────────────────────────────────────────
export function calcLSI(r: Responses): {
  LSI: number; Health: number; Finance: number; Work: number;
  Psyche: number; Social: number; Habits: number
} {
  const bmi = get(r,'B04') / Math.pow(get(r,'B03',170) / 100, 2)
  const bmiDev = Math.abs(bmi - 22) / 10

  const Health = sigmoid(
    0.4 * (get(r,'B10', 5) / 10 - 0.5) +
    0.3 * (-bmiDev) +
    0.2 * zScore(get(r,'B11', 3), 'Activity') / 3 +
    0.1 * (-Math.min(
      ((r['B09'] as string[] | undefined)?.filter(x => x !== 'Нет').length ?? 0) / 3, 1
    ))
  ) * 100

  const income = get(r,'B16', 1)
  const expense = Math.max(get(r,'B17', 1), 1)
  const runway = get(r,'B18', 0)
  const debtRisk = r['B19'] === 'Долгов нет' ? 0 : r['B19'] === 'Есть просроченные долги' ? 1 : 0.4
  const Finance = sigmoid(
    0.4 * Math.min(runway / 6, 1) +
    0.3 * clamp((income - expense) / expense, -1, 1) +
    0.3 * (-debtRisk)
  ) * 100

  const Work = sigmoid(
    0.4 * (get(r,'B21', 5) / 10 - 0.5) -
    0.3 * (get(r,'B22', 5) / 10 - 0.5) -
    0.3 * (get(r,'B23', 5) / 10 - 0.5)
  ) * 100

  const phq9 = calcPHQ9(r)
  const gad7 = calcGAD7(r)
  const pss4 = calcPSS4(r)
  const uclaRaw = get(r,'A38') + get(r,'A39') + get(r,'A40')
  const Psyche = sigmoid(
    -0.3 * zScore(phq9, 'PHQ9') / 3 -
    0.3 * zScore(gad7, 'GAD7') / 3 -
    0.2 * zScore(pss4, 'PSS4') / 3 -
    0.2 * zScore(uclaRaw, 'UCLA3') / 3
  ) * 100

  const socRaw = calcSoc(r)
  const Social = sigmoid(socRaw) * 100

  const sleepH = get(r,'A41', 7)
  const sleepReg = get(r,'A42', 3)
  const cooking = get(r,'E03', 3)
  const screenH = get(r,'E04', 6)
  const anchors = (r['E09'] as string[] | undefined)?.filter(x => x !== 'Никого из перечисленных').length ?? 0
  const Habits = sigmoid(
    0.2 * (sleepReg - 3) / 2 +
    0.2 * (sleepH >= 6 && sleepH <= 9 ? 0.5 : -0.5) +
    0.2 * (cooking / 7 - 0.5) +
    0.2 * -(screenH / 8 - 0.5) +
    0.2 * (anchors / 3)
  ) * 100

  const LSI = 0.20 * Health + 0.20 * Finance + 0.15 * Work + 0.20 * Psyche + 0.20 * Social + 0.05 * Habits

  return { LSI, Health, Finance, Work, Psyche, Social, Habits }
}

// ─── BL Lambda (пуассоновский риск из окружения) ─────────────────────────────
export function calcBLLambda(r: Responses): number {
  return (
    (r['F51'] === 'Да' ? 0.05 : 0) +
    (r['F52'] === 'Да' ? 0.08 : 0) +
    get(r,'F53') * 0.04 +
    (r['F54'] === 'Да' ? 0.10 : 0) +
    get(r,'F55') * 0.03
  )
}

export { bfiBig5, get }
export type { Responses }
