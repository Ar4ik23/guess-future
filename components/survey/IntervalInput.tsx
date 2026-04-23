'use client'

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
  const set = (field: keyof IntervalValue, v: number | '') =>
    onChange({ ...value, [field]: v })

  const rows: [keyof IntervalValue, string, string][] = [
    ['answer', 'Мой ответ', 'число'],
    ['low', 'Нижняя граница (90%)', 'мин'],
    ['high', 'Верхняя граница (90%)', 'макс'],
  ]

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
      <p className="ui text-[12px] text-muted mt-1">
        Укажите диапазон, в котором вы уверены на 90%
      </p>
    </div>
  )
}
