'use client'

import { useLanguage } from '@/lib/i18n/context'

export interface Person {
  initials: string
  age: number | ''
  relation: string
  occupation: string
  trajectory: -1 | 0 | 1 | ''
  closeness: number
  yearsKnown: number | ''
  flags: string[]
}

const LABELS = {
  en: {
    person: 'Person',
    remove: 'remove',
    initials: 'Initials',
    age: 'Age',
    relation: 'Relation',
    occupation: 'Occupation',
    trajectory: 'Trajectory',
    yearsKnown: 'Years known',
    closeness: 'Closeness',
    riskFlags: 'Risk flags',
    add: '+ Add person',
    relations: ['Friend', 'Relative', 'Partner', 'Colleague', 'Mentor', 'Other'],
    occupations: ['Employed', 'Student', 'Entrepreneur', 'Freelance', 'Unemployed', 'Retired'],
    flags: ['Addiction', 'Serious illness', 'Unstable income', 'Conflict with me', 'Financially dependent on me'],
  },
  ru: {
    person: 'Человек',
    remove: 'убрать',
    initials: 'Инициалы',
    age: 'Возраст',
    relation: 'Кем приходится',
    occupation: 'Занятие',
    trajectory: 'Траектория',
    yearsKnown: 'Лет знакомства',
    closeness: 'Близость',
    riskFlags: 'Флаги риска',
    add: '+ Добавить человека',
    relations: ['Друг', 'Родственник', 'Партнёр', 'Коллега', 'Ментор', 'Другое'],
    occupations: ['Работа по найму', 'Учёба', 'Предпринимательство', 'Фриланс', 'Без занятости', 'Пенсия'],
    flags: ['Зависимость', 'Серьёзная болезнь', 'Нестабильный доход', 'Конфликт со мной', 'Финансово зависит от меня'],
  },
}

interface Props {
  value: Person[]
  onChange: (v: Person[]) => void
}

const emptyPerson = (): Person => ({
  initials: '', age: '', relation: '', occupation: '',
  trajectory: '', closeness: 5, yearsKnown: '', flags: [],
})

const inputCls = 'w-full px-3 py-2 border border-rule bg-bg text-text text-[14px] focus:border-text focus:outline-none transition-colors'

export function PersonCard({ value, onChange }: Props) {
  const { lang } = useLanguage()
  const L = LABELS[lang]

  const update = (i: number, patch: Partial<Person>) => {
    const next = [...value]
    next[i] = { ...next[i], ...patch }
    onChange(next)
  }

  const add = () => {
    if (value.length < 5) onChange([...value, emptyPerson()])
  }

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))

  return (
    <div className="flex flex-col gap-4">
      {value.map((p, i) => (
        <div key={i} className="border border-rule p-5 bg-surface/50 relative">
          <div className="flex items-center justify-between mb-4">
            <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted">{L.person} {i + 1}</p>
            <button
              type="button"
              onClick={() => remove(i)}
              className="ui text-[12px] text-muted hover:text-risk"
            >
              {L.remove}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="ui text-[12px] text-muted mb-1.5 block">{L.initials}</label>
              <input
                value={p.initials}
                onChange={e => update(i, { initials: e.target.value })}
                className={inputCls}
                placeholder="A.B."
              />
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-1.5 block">{L.age}</label>
              <input
                type="number"
                value={p.age}
                onChange={e => update(i, { age: e.target.value === '' ? '' : Number(e.target.value) })}
                className={`${inputCls} num`}
                placeholder="30"
              />
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-1.5 block">{L.relation}</label>
              <select
                value={p.relation}
                onChange={e => update(i, { relation: e.target.value })}
                className={inputCls}
              >
                <option value="">—</option>
                {L.relations.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-1.5 block">{L.occupation}</label>
              <select
                value={p.occupation}
                onChange={e => update(i, { occupation: e.target.value })}
                className={inputCls}
              >
                <option value="">—</option>
                {L.occupations.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-1.5 block">{L.trajectory}</label>
              <div className="flex gap-1.5">
                {([[-1, '↓'], [0, '→'], [1, '↑']] as const).map(([v, icon]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => update(i, { trajectory: v })}
                    className={`ui flex-1 py-2 text-[13px] border transition-colors
                      ${p.trajectory === v
                        ? v === 1 ? 'bg-positive border-positive text-bg'
                          : v === -1 ? 'bg-risk border-risk text-bg'
                          : 'bg-muted border-muted text-bg'
                        : 'border-rule text-text hover:border-text'
                      }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="ui text-[12px] text-muted mb-1.5 block">{L.yearsKnown}</label>
              <input
                type="number"
                value={p.yearsKnown}
                onChange={e => update(i, { yearsKnown: e.target.value === '' ? '' : Number(e.target.value) })}
                className={`${inputCls} num`}
                placeholder="3"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="ui text-[12px] text-muted mb-1.5 block">
              {L.closeness}: <span className="num text-text">{p.closeness}/10</span>
            </label>
            <input
              type="range" min={1} max={10} value={p.closeness}
              onChange={e => update(i, { closeness: Number(e.target.value) })}
              className="w-full accent-accent"
            />
          </div>

          <div className="mt-4">
            <label className="ui text-[12px] text-muted mb-2 block">{L.riskFlags}</label>
            <div className="flex flex-wrap gap-1.5">
              {L.flags.map(flag => {
                const ruFlag = LABELS.ru.flags[L.flags.indexOf(flag)]
                const on = p.flags.includes(flag) || p.flags.includes(ruFlag)
                return (
                  <button
                    key={flag}
                    type="button"
                    onClick={() => {
                      const enFlag = LABELS.en.flags[L.flags.indexOf(flag)]
                      const ruFlag2 = LABELS.ru.flags[L.flags.indexOf(flag)]
                      const filtered = p.flags.filter(f => f !== enFlag && f !== ruFlag2)
                      update(i, { flags: on ? filtered : [...filtered, flag] })
                    }}
                    className={`ui px-3 py-1.5 text-[12px] border transition-colors
                      ${on ? 'bg-risk text-bg border-risk' : 'border-rule text-text hover:border-text'}`}
                  >
                    {flag}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ))}
      {value.length < 5 && (
        <button
          type="button"
          onClick={add}
          className="ui border border-dashed border-rule py-4 text-[13px] text-muted hover:border-text hover:text-text transition-colors"
        >
          {L.add} {value.length > 0 && `(${value.length}/5)`}
        </button>
      )}
    </div>
  )
}
