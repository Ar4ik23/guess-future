'use client'

export interface UserEvent {
  label: string
  probability: number
  sentiment: 'positive' | 'negative' | 'neutral'
}

interface Props {
  value: UserEvent[]
  onChange: (v: UserEvent[]) => void
}

const empty = (): UserEvent => ({ label: '', probability: 50, sentiment: 'neutral' })

const inputCls = 'w-full px-3 py-2 border border-rule bg-bg text-text text-[14px] focus:border-text focus:outline-none transition-colors'

const SENTIMENTS: Array<{ s: 'positive' | 'neutral' | 'negative'; label: string; cls: string }> = [
  { s: 'positive', label: 'Желаю',      cls: 'bg-positive border-positive text-bg' },
  { s: 'neutral',  label: 'Нейтрально', cls: 'bg-muted border-muted text-bg' },
  { s: 'negative', label: 'Не хочу',    cls: 'bg-risk border-risk text-bg' },
]

export function EventList({ value, onChange }: Props) {
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
            <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted">Событие {i + 1}</p>
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="ui text-[12px] text-muted hover:text-risk"
            >
              убрать
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="ui text-[12px] text-muted mb-1.5 block">Событие</label>
              <input
                value={ev.label}
                onChange={e => update(i, { label: e.target.value })}
                className={inputCls}
                placeholder="Например: сменю работу"
              />
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-1.5 block">
                Моя вероятность: <span className="num text-text">{ev.probability}%</span>
              </label>
              <input
                type="range" min={0} max={100} step={5} value={ev.probability}
                onChange={e => update(i, { probability: Number(e.target.value) })}
                className="w-full accent-accent"
              />
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-2 block">Отношение</label>
              <div className="flex gap-1.5">
                {SENTIMENTS.map(({ s, label, cls }) => (
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
          + Добавить событие {value.length > 0 && `(${value.length}/5)`}
        </button>
      )}
    </div>
  )
}
