export const populationNorms: Record<string, { mean: number; sd: number }> = {
  PHQ9:         { mean: 4.5,  sd: 4.0 },
  GAD7:         { mean: 3.5,  sd: 3.5 },
  PSS4:         { mean: 5.5,  sd: 3.0 },
  UCLA3:        { mean: 3.5,  sd: 2.0 },
  MSPSS:        { mean: 60.0, sd: 14.0 },
  Conscientiousness: { mean: 3.0, sd: 0.8 },
  Neuroticism:  { mean: 3.0,  sd: 0.8 },
  Extraversion: { mean: 3.0,  sd: 0.8 },
  Agreeableness:{ mean: 3.0,  sd: 0.8 },
  Openness:     { mean: 3.0,  sd: 0.8 },
  LocusControl: { mean: 12.0, sd: 3.0 },
  SelfEfficacy: { mean: 12.0, sd: 2.5 },
  SleepHours:   { mean: 7.0,  sd: 1.0 },
  Activity:     { mean: 5.0,  sd: 4.0 },
  RunwayMonths: { mean: 2.0,  sd: 3.0 },
  Burnout:      { mean: 5.0,  sd: 2.5 },
  JobSatisfaction: { mean: 6.0, sd: 2.0 },
}

export function zScore(value: number, key: string): number {
  const norm = populationNorms[key]
  if (!norm) return 0
  return (value - norm.mean) / norm.sd
}

export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x))
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max)
}

export function reverseItem(value: number, max: number): number {
  return max + 1 - value
}
