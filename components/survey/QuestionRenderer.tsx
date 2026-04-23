'use client'

import { Question } from '@/lib/questions/types'
import { LikertScale } from './LikertScale'
import { ChoiceInput } from './ChoiceInput'
import { NumberInput } from './NumberInput'
import { IntervalInput } from './IntervalInput'
import { PersonCard, Person } from './PersonCard'
import { GoalList, Goal } from './GoalList'
import { EventList, UserEvent } from './EventList'
import { useLanguage } from '@/lib/i18n/context'
import { questionTranslationsEn } from '@/lib/i18n/questions'

interface Props {
  question: Question
  value: unknown
  onChange: (v: unknown) => void
  showScaleGuide?: boolean
}

const SCALE_0_3_EN = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
const SCALE_0_3_RU = ['Ни разу', 'Несколько дней', 'Больше половины дней', 'Почти каждый день']
const SCALE_0_4_EN = ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often']
const SCALE_0_4_RU = ['Никогда', 'Почти никогда', 'Иногда', 'Достаточно часто', 'Очень часто']

export function QuestionRenderer({ question, value, onChange, showScaleGuide = false }: Props) {
  const { lang } = useLanguage()
  const { type, options, min, max, unit } = question

  const qTrans = lang === 'en' ? questionTranslationsEn[question.id] : undefined
  const displayOptions = qTrans?.options ?? options
  const displayUnit = qTrans?.unit ?? unit

  if (type === 'likert5') {
    const labels = displayOptions && displayOptions.length === 5 ? displayOptions : undefined
    return (
      <LikertScale
        id={question.id}
        value={value as number | null}
        onChange={onChange}
        min={1} max={5}
        labels={labels}
        showScaleGuide={showScaleGuide && !labels}
      />
    )
  }

  if (type === 'likert10') {
    return (
      <LikertScale
        id={question.id}
        value={value as number | null}
        onChange={onChange}
        min={1} max={10}
      />
    )
  }

  if (type === 'scale_0_3') {
    const opts = displayOptions ?? (lang === 'en' ? SCALE_0_3_EN : SCALE_0_3_RU)
    return (
      <ChoiceInput
        options={opts}
        value={typeof value === 'number' ? opts[value] ?? null : null}
        onChange={v => onChange(opts.indexOf(v))}
      />
    )
  }

  if (type === 'scale_0_4') {
    const opts = displayOptions ?? (lang === 'en' ? SCALE_0_4_EN : SCALE_0_4_RU)
    return (
      <ChoiceInput
        options={opts}
        value={typeof value === 'number' ? opts[value] ?? null : null}
        onChange={v => onChange(opts.indexOf(v))}
      />
    )
  }

  if (type === 'scale_1_7') {
    return (
      <LikertScale
        id={question.id}
        value={value as number | null}
        onChange={onChange}
        min={1} max={7}
      />
    )
  }

  if (type === 'choice') {
    return (
      <ChoiceInput
        options={displayOptions ?? []}
        value={value as string | null}
        onChange={onChange}
      />
    )
  }

  if (type === 'multichoice') {
    return (
      <ChoiceInput
        options={displayOptions ?? []}
        value={null}
        onChange={() => {}}
        multi
        multiValue={value as string[] ?? []}
        onMultiChange={onChange}
      />
    )
  }

  if (type === 'number') {
    return (
      <NumberInput
        value={(value ?? '') as number | ''}
        onChange={onChange}
        min={min}
        max={max}
        unit={displayUnit}
      />
    )
  }

  if (type === 'text') {
    return (
      <textarea
        value={value as string ?? ''}
        onChange={e => onChange(e.target.value)}
        rows={4}
        placeholder={lang === 'en' ? 'Your answer…' : 'Ваш ответ…'}
        className="w-full font-serif text-[16px] leading-[1.5] px-4 py-3 border border-rule bg-bg text-text focus:border-text focus:outline-none transition-colors resize-none"
      />
    )
  }

  if (type === 'interval') {
    const iv = (value as { answer?: number | ''; low?: number | ''; high?: number | '' } | undefined) ?? { answer: '', low: '', high: '' }
    return (
      <IntervalInput
        value={{ answer: iv.answer ?? '', low: iv.low ?? '', high: iv.high ?? '' }}
        onChange={onChange}
      />
    )
  }

  if (type === 'person_card') {
    return (
      <PersonCard
        value={value as Person[] ?? []}
        onChange={onChange}
      />
    )
  }

  if (type === 'goal_list') {
    return (
      <GoalList
        value={value as Goal[] ?? []}
        onChange={onChange}
      />
    )
  }

  if (type === 'event_list') {
    return (
      <EventList
        value={value as UserEvent[] ?? []}
        onChange={onChange}
      />
    )
  }

  return <p className="ui text-[13px] text-risk">Unknown question type: {type}</p>
}
