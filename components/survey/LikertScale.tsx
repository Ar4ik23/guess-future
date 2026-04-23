'use client'

interface Props {
  id: string
  value: number | null
  onChange: (v: number) => void
  min?: number
  max?: number
  labels?: string[]
  showScaleGuide?: boolean
}

export function LikertScale({ value, onChange, min = 1, max = 5, labels, showScaleGuide }: Props) {
  const steps = Array.from({ length: max - min + 1 }, (_, i) => i + min)

  return (
    <div className="flex flex-col gap-3">
      {showScaleGuide && min === 1 && max === 5 && (
        <p className="ui text-[13px] text-muted">
          <span className="num text-ink font-semibold">1</span> — совсем нет ·{' '}
          <span className="num text-ink font-semibold">3</span> — ни да, ни нет ·{' '}
          <span className="num text-ink font-semibold">5</span> — полностью да
        </p>
      )}
      <div className="flex gap-2 flex-wrap">
        {steps.map(n => {
          const active = value === n
          const isLabelled = Boolean(labels)
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-pressed={active}
              className={`
                ${isLabelled ? 'min-w-[72px]' : 'min-w-[52px]'}
                h-12 px-3 border-2 text-[15px] font-medium transition-colors cursor-pointer
                ${active
                  ? 'bg-ink border-ink text-bg shadow-[inset_0_0_0_2px_var(--bg)]'
                  : 'bg-bg border-rule text-ink hover:border-ink hover:bg-surface'
                }`}
              title={labels ? labels[n - min] : String(n)}
            >
              <span className={isLabelled ? 'text-[13px] font-serif font-normal' : 'num'}>
                {labels ? labels[n - min] ?? n : n}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
