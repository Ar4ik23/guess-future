'use client'

import { useLanguage } from '@/lib/i18n/context'

export interface Goal {
  description: string
  importance: number
  statedProb: number
  outcome: number
}

interface Props {
  value: Goal[]
  onChange: (v: Goal[]) => void
}

const LABELS = {
  en: {
    goal: 'Goal',
    remove: 'remove',
    planned: 'What I planned',
    placeholder: 'E.g.: reach $3,000/month income',
    importance: 'Importance',
    confidence: 'Confidence then',
    outcome: 'Actual outcome',
    add: '+ Add goal',
    outcomes: ["Didn't achieve", 'Partially', 'Fully'] as const,
  },
  ru: {
    goal: 'Цель',
    remove: 'убрать',
    planned: 'Что планировал',
    placeholder: 'Например: выйти на доход 200к в месяц',
    importance: 'Важность',
    confidence: 'Уверенность тогда',
    outcome: 'Реальный итог',
    add: '+ Добавить цель',
    outcomes: ['Не достиг', 'Частично', 'Полностью'] as const,
  },
}

const OUTCOME_VALUES = [0, 0.5, 1] as const

const inputCls = 'w-full px-3 py-2 border border-rule bg-bg text-text text-[14px] focus:border-text focus:outline-none transition-colors'

const empty = (): Goal => ({ description: '', importance: 7, statedProb: 70, outcome: 0.5 })

export function GoalList({ value, onChange }: Props) {
  const { lang } = useLanguage()
  const L = LABELS[lang]

  const update = (i: number, patch: Partial<Goal>) => {
    const next = [...value]
    next[i] = { ...next[i], ...patch }
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-4">
      {value.map((g, i) => (
        <div key={i} className="border border-rule p-5 bg-surface/50 relative">
          <div className="flex items-center justify-between mb-4">
            <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted">{L.goal} {i + 1}</p>
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="ui text-[12px] text-muted hover:text-risk"
            >
              {L.remove}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="ui text-[12px] text-muted mb-1.5 block">{L.planned}</label>
              <input
                value={g.description}
                onChange={e => update(i, { description: e.target.value })}
                className={inputCls}
                placeholder={L.placeholder}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="ui text-[12px] text-muted mb-1.5 block">
                  {L.importance}: <span className="num text-text">{g.importance}/10</span>
                </label>
                <input
                  type="range" min={1} max={10} value={g.importance}
                  onChange={e => update(i, { importance: Number(e.target.value) })}
                  className="w-full accent-accent"
                />
              </div>
              <div>
                <label className="ui text-[12px] text-muted mb-1.5 block">
                  {L.confidence}: <span className="num text-text">{g.statedProb}%</span>
                </label>
                <input
                  type="range" min={0} max={100} step={5} value={g.statedProb}
                  onChange={e => update(i, { statedProb: Number(e.target.value) })}
                  className="w-full accent-accent"
                />
              </div>
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-2 block">{L.outcome}</label>
              <div className="flex gap-1.5">
                {OUTCOME_VALUES.map((v, idx) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => update(i, { outcome: v })}
                    className={`ui flex-1 py-2.5 text-[13px] border transition-colors
                      ${g.outcome === v
                        ? 'bg-text text-bg border-text'
                        : 'border-rule text-text hover:border-text'
                      }`}
                  >
                    {L.outcomes[idx]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      {value.length < 5 && (
        <button
          type="button"
          onClick={() => onChange([...value, empty()])}
          className="ui border border-dashed border-rule py-4 text-[13px] text-muted hover:border-text hover:text-text transition-colors"
        >
          {L.add} {value.length > 0 && `(${value.length}/5)`}
        </button>
      )}
    </div>
  )
}
