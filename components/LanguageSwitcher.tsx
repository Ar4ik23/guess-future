'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n/context'
import type { Lang } from '@/lib/i18n/context'

const OPTIONS: { value: Lang; label: string; desc: string }[] = [
  { value: 'en', label: 'EN', desc: 'English' },
  { value: 'ru', label: 'RU', desc: 'Русский' },
]

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="ui text-[12px] font-medium text-muted hover:text-text transition-colors cursor-pointer border border-rule px-2.5 py-1 tracking-[0.08em] flex items-center gap-1.5"
      >
        {lang.toUpperCase()}
        <span className={`text-[9px] transition-transform inline-block leading-none ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 border border-rule bg-bg z-50 min-w-[110px]">
          {OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setLang(opt.value); setOpen(false) }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-surface transition-colors cursor-pointer
                ${lang === opt.value ? 'text-ink' : 'text-muted'}`}
            >
              <span className="ui text-[11px] font-medium tracking-[0.08em] w-5 shrink-0">{opt.label}</span>
              <span className="ui text-[12px]">{opt.desc}</span>
              {lang === opt.value && (
                <span className="ml-auto ui text-[10px] text-accent shrink-0">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
