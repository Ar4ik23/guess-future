'use client'

interface Props {
  value: number | '' | null | undefined
  onChange: (v: number | '') => void
  min?: number
  max?: number
  unit?: string
}

export function NumberInput({ value, onChange, min, max, unit }: Props) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        value={value ?? ''}
        min={min}
        max={max}
        onChange={e => {
          const v = e.target.value === '' ? '' : Number(e.target.value)
          onChange(v)
        }}
        className="num w-40 px-4 py-3 border border-rule bg-bg text-text text-[16px] focus:border-text focus:outline-none transition-colors"
        placeholder="0"
      />
      {unit && <span className="ui text-[14px] text-muted">{unit}</span>}
    </div>
  )
}
