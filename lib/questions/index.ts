export { blockA } from './blockA'
export { blockB } from './blockB'
export { blockE } from './blockE'
export { blockF } from './blockF'
export { blockC } from './blockC'
export { blockD } from './blockD'
export { blockG } from './blockG'
export type { Question, QuestionType } from './types'

import { blockA } from './blockA'
import { blockB } from './blockB'
import { blockE } from './blockE'
import { blockF } from './blockF'
import { blockC } from './blockC'
import { blockD } from './blockD'
import { blockG } from './blockG'
import type { Question } from './types'

export const BLOCK_ORDER = ['A', 'B', 'E', 'F', 'C', 'D', 'G'] as const
export type BlockKey = typeof BLOCK_ORDER[number]

export const BLOCK_LABELS: Record<BlockKey, string> = {
  A: 'Психологический портрет',
  B: 'Текущее положение',
  E: 'Привычки и режим',
  F: 'Социальное окружение',
  C: 'История прошлого года',
  D: 'Ожидания на год',
  G: 'Свободный контекст',
}

export const ALL_BLOCKS: Record<BlockKey, Question[]> = {
  A: blockA,
  B: blockB,
  E: blockE,
  F: blockF,
  C: blockC,
  D: blockD,
  G: blockG,
}
