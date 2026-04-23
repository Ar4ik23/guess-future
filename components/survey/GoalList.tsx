'use client'

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

const empty = (): Goal => ({ description: '', importance: 7, statedProb: 70, outcome: 0.5 })

const OUTCOME_OPTIONS: [number, string][] = [
  [0, 'Не достиг'],
  [0.5, 'Частично'],
  [1, 'Полностью'],
]

const inputCls = 'w-full px-3 py-2 border border-rule bg-bg text-text text-[14px] focus:border-text focus:outline-none transition-colors'

export function GoalList({ value, onChange }: Props) {
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
            <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted">Цель {i + 1}</p>
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
              <label className="ui text-[12px] text-muted mb-1.5 block">Что планировал</label>
              <input
                value={g.description}
                onChange={e => update(i, { description: e.target.value })}
                className={inputCls}
                placeholder="Например: выйти на доход 200к в месяц"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="ui text-[12px] text-muted mb-1.5 block">
                  Важность: <span className="num text-text">{g.importance}/10</span>
                </label>
                <input
                  type="range" min={1} max={10} value={g.importance}
                  onChange={e => update(i, { importance: Number(e.target.value) })}
                  className="w-full accent-accent"
                />
              </div>
              <div>
                <label className="ui text-[12px] text-muted mb-1.5 block">
                  Уверенность тогда: <span className="num text-text">{g.statedProb}%</span>
                </label>
                <input
                  type="range" min={0} max={100} step={5} value={g.statedProb}
                  onChange={e => update(i, { statedProb: Number(e.target.value) })}
                  className="w-full accent-accent"
                />
              </div>
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-2 block">Реальный итог</label>
              <div className="flex gap-1.5">
                {OUTCOME_OPTIONS.map(([v, label]) => (
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
          + Добавить цель {value.length > 0 && `(${value.length}/5)`}
        </button>
      )}
    </div>
  )
}
