'use client'

import { useLanguage } from '@/lib/i18n/context'

export interface UserEvent {
  label: string
  probability: number
  sentiment: 'positive' | 'negative' | 'neutral'
}

interface Props {
  value: UserEvent[]
  onChange: (v: UserEvent[]) => void
}

const LABELS = {
  en: {
    event: 'Event',
    remove: 'remove',
    eventLabel: 'Event',
    placeholder: 'E.g.: change jobs',
    probability: 'My probability',
    attitude: 'Attitude',
    add: '+ Add event',
    sentiments: [
      { s: 'positive' as const, label: 'I want it',  cls: 'bg-positive border-positive text-bg' },
      { s: 'neutral'  as const, label: 'Neutral',    cls: 'bg-muted border-muted text-bg' },
      { s: 'negative' as const, label: "Don't want", cls: 'bg-risk border-risk text-bg' },
    ],
  },
  ru: {
    event: 'Событие',
    remove: 'убрать',
    eventLabel: 'Событие',
    placeholder: 'Например: сменю работу',
    probability: 'Моя вероятность',
    attitude: 'Отношение',
    add: '+ Добавить событие',
    sentiments: [
      { s: 'positive' as const, label: 'Желаю',      cls: 'bg-positive border-positive text-bg' },
      { s: 'neutral'  as const, label: 'Нейтрально', cls: 'bg-muted border-muted text-bg' },
      { s: 'negative' as const, label: 'Не хочу',    cls: 'bg-risk border-risk text-bg' },
    ],
  },
}

const inputCls = 'w-full px-3 py-2 border border-rule bg-bg text-text text-[14px] focus:border-text focus:outline-none transition-colors'

const empty = (): UserEvent => ({ label: '', probability: 50, sentiment: 'neutral' })

export function EventList({ value, onChange }: Props) {
  const { lang } = useLanguage()
  const L = LABELS[lang]

  const update = (i: number, patch: Partial<UserEvent>) => {
    const next = [...value]
    next[i] = { ...next[i], ...patch }
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-4">
      {value.map((ev, i) => (
        <div key={i} className="border border-rule p-5 bg-surface/50 relative">
          <div className="flex items-center justify-between mb-4">
            <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted">{L.event} {i + 1}</p>
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
              <label className="ui text-[12px] text-muted mb-1.5 block">{L.eventLabel}</label>
              <input
                value={ev.label}
                onChange={e => update(i, { label: e.target.value })}
                className={inputCls}
                placeholder={L.placeholder}
              />
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-1.5 block">
                {L.probability}: <span className="num text-text">{ev.probability}%</span>
              </label>
              <input
                type="range" min={0} max={100} step={5} value={ev.probability}
                onChange={e => update(i, { probability: Number(e.target.value) })}
                className="w-full accent-accent"
              />
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-2 block">{L.attitude}</label>
              <div className="flex gap-1.5">
                {L.sentiments.map(({ s, label, cls }) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update(i, { sentiment: s })}
                    className={`ui flex-1 py-2.5 text-[13px] border transition-colors
                      ${ev.sentiment === s ? cls : 'border-rule text-text hover:border-text'}`}
                  >
                    {label}
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
