export type QuestionType =
  | 'likert5'
  | 'likert10'
  | 'number'
  | 'choice'
  | 'multichoice'
  | 'text'
  | 'scale_0_3'
  | 'scale_0_4'
  | 'scale_1_7'
  | 'interval'
  | 'person_card'
  | 'goal_list'
  | 'event_list'

export interface Question {
  id: string
  block: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  text: string
  type: QuestionType
  options?: string[]
  reverse?: boolean
  hint?: string
  subQuestions?: Question[]
  min?: number
  max?: number
  unit?: string
}
