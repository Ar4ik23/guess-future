'use client'

import { Question } from '@/lib/questions/types'
import { LikertScale } from './LikertScale'
import { ChoiceInput } from './ChoiceInput'
import { NumberInput } from './NumberInput'
import { IntervalInput } from './IntervalInput'
import { PersonCard, Person } from './PersonCard'
import { GoalList, Goal } from './GoalList'
import { EventList, UserEvent } from './EventList'

interface Props {
  question: Question
  value: unknown
  onChange: (v: unknown) => void
  showScaleGuide?: boolean
}

export function QuestionRenderer({ question, value, onChange, showScaleGuide = false }: Props) {
  const { type, options, min, max, unit } = question

  if (type === 'likert5') {
    const labels = options && options.length === 5 ? options : undefined
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
    const opts = options ?? ['Ни разу', 'Несколько дней', 'Больше половины дней', 'Почти каждый день']
    return (
      <ChoiceInput
        options={opts}
        value={typeof value === 'number' ? opts[value] ?? null : null}
        onChange={v => onChange(opts.indexOf(v))}
      />
    )
  }

  if (type === 'scale_0_4') {
    // Храним raw index (0..N-1), reverse применяется только в scoring — в UI его быть не должно
    const opts = options ?? ['Никогда', 'Почти никогда', 'Иногда', 'Достаточно часто', 'Очень часто']
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
        options={options ?? []}
        value={value as string | null}
        onChange={onChange}
      />
    )
  }

  if (type === 'multichoice') {
    return (
      <ChoiceInput
        options={options ?? []}
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
        unit={unit}
      />
    )
  }

  if (type === 'text') {
    return (
      <textarea
        value={value as string ?? ''}
        onChange={e => onChange(e.target.value)}
        rows={4}
        placeholder="Ваш ответ…"
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

  return <p className="ui text-[13px] text-risk">Неизвестный тип вопроса: {type}</p>
}
