'use client'

import { useLanguage } from '@/lib/i18n/context'

interface IntervalValue {
  answer: number | ''
  low: number | ''
  high: number | ''
}

interface Props {
  value: IntervalValue
  onChange: (v: IntervalValue) => void
}

export function IntervalInput({ value, onChange }: Props) {
  const { lang } = useLanguage()
  const set = (field: keyof IntervalValue, v: number | '') =>
    onChange({ ...value, [field]: v })

  const rows: [keyof IntervalValue, string, string][] = lang === 'en' ? [
    ['answer', 'My answer',        'number'],
    ['low',    'Lower bound (90%)', 'min'],
    ['high',   'Upper bound (90%)', 'max'],
  ] : [
    ['answer', 'Мой ответ',          'число'],
    ['low',    'Нижняя граница (90%)', 'мин'],
    ['high',   'Верхняя граница (90%)', 'макс'],
  ]

  const hint = lang === 'en'
    ? 'Specify the range you are 90% confident in'
    : 'Укажите диапазон, в котором вы уверены на 90%'

  return (
    <div className="flex flex-col gap-3">
      {rows.map(([field, label, ph]) => (
        <div key={field} className="flex items-center gap-4">
          <label className="ui text-[13px] text-muted w-48 shrink-0">{label}</label>
          <input
            type="number"
            value={value[field]}
            onChange={e => set(field, e.target.value === '' ? '' : Number(e.target.value))}
            className="num w-40 px-4 py-2.5 border border-rule bg-bg text-text text-[15px] focus:border-text focus:outline-none transition-colors"
            placeholder={ph}
          />
        </div>
      ))}
      <p className="ui text-[12px] text-muted mt-1">{hint}</p>
    </div>
  )
}
