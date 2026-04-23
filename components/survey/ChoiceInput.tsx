'use client'

interface Props {
  options: string[]
  value: string | null
  onChange: (v: string) => void
  multi?: boolean
  multiValue?: string[]
  onMultiChange?: (v: string[]) => void
}

export function ChoiceInput({ options, value, onChange, multi, multiValue = [], onMultiChange }: Props) {
  const handleMulti = (opt: string) => {
    if (!onMultiChange) return
    const selected = multiValue.includes(opt)
    onMultiChange(selected ? multiValue.filter(v => v !== opt) : [...multiValue, opt])
  }

  return (
    <div className="flex flex-col gap-1.5">
      {options.map((opt) => {
        const selected = multi ? multiValue.includes(opt) : value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => multi ? handleMulti(opt) : onChange(opt)}
            aria-pressed={selected}
            className={`
              group relative text-left pl-12 pr-5 py-3.5 border-2 transition-colors cursor-pointer
              ${selected
                ? 'bg-ink text-bg border-ink'
                : 'bg-bg text-ink border-rule hover:border-ink hover:bg-surface'
              }`}
          >
            <span
              aria-hidden
              className={`
                absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 transition-colors
                ${multi ? 'rounded-none' : 'rounded-full'}
                ${selected ? 'bg-bg border-bg' : 'bg-bg border-rule group-hover:border-ink'}
              `}
            >
              {selected && (
                <span
                  className={`
                    absolute inset-0 flex items-center justify-center
                    ${multi ? 'text-ink' : ''}
                  `}
                >
                  {multi ? (
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-ink" />
                  )}
                </span>
              )}
            </span>
            <span className="font-serif text-[16px] leading-[1.4]">{opt}</span>
          </button>
        )
      })}
    </div>
  )
}
