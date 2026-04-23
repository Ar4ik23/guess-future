'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/context'
import { UI } from '@/lib/i18n/ui'

const WEIGHTS = [
  [0.10, 0.35, 0.65, 0.90],
  [0.20, 0.35, 0.55, 0.80],
  [0.10, 0.30, 0.55, 0.85],
]

export function TeaserTest() {
  const { lang } = useLanguage()
  const t = UI[lang].teaser
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Array<number | null>>(() => t.questions.map(() => null))
  const [done, setDone] = useState(false)

  if (done) {
    const weights = answers.map((a, i) => (a !== null ? WEIGHTS[i][a] : 0))
    const risk = weights.reduce((s, w) => s + w, 0) / weights.length
    const stability = 100 - Math.round(risk * 100)

    const result = risk < 0.30 ? t.stable : risk < 0.55 ? t.mixed : t.attention

    const R = 48
    const C = 2 * Math.PI * R
    const dash = (stability / 100) * C

    return (
      <div className="teaser-card">
        <div className="flex flex-col items-center text-center">
          <svg width="140" height="140" viewBox="0 0 140 140" className="mb-5">
            <circle cx="70" cy="70" r={R} fill="none" stroke="var(--rule)" strokeWidth="8" />
            <circle
              cx="70" cy="70" r={R} fill="none"
              stroke="var(--accent)" strokeWidth="8"
              strokeDasharray={`${dash} ${C}`} strokeLinecap="round"
              transform="rotate(-90 70 70)"
            />
            <text
              x="70" y="80" textAnchor="middle"
              fontFamily="var(--font-serif)" fontSize="32" fontWeight="500"
              fill="var(--ink)"
            >{stability}</text>
          </svg>
          <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-2">
            {t.readingLabel}
          </p>
          <h3 className="font-serif text-[28px] font-medium leading-[1.2] text-ink mb-4">{result.title}</h3>
          <p className="text-[17px] text-muted max-w-[480px] mb-7 leading-[1.6]">{result.body}</p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              href="/survey"
              className="ui inline-flex items-center gap-2 bg-ink text-bg px-7 py-3.5 text-[14px] font-medium hover:bg-accent transition-colors no-underline"
            >
              {t.ctaFull}
            </Link>
            <button
              type="button"
              onClick={() => {
                setAnswers(t.questions.map(() => null))
                setIdx(0)
                setDone(false)
              }}
              className="ui inline-flex items-center gap-2 border-2 border-rule px-7 py-3.5 text-[14px] font-medium text-ink hover:border-ink transition-colors cursor-pointer"
            >
              {t.ctaRetake}
            </button>
          </div>
          <p className="ui text-[12px] text-muted mt-8 leading-[1.5]">
            {t.demoNote}
          </p>
        </div>
      </div>
    )
  }

  const q = t.questions[idx]
  const selected = answers[idx]
  const canNext = selected !== null

  return (
    <div className="teaser-card">
      <div className="flex items-center justify-between mb-8 ui text-[12px] text-muted uppercase tracking-[0.08em]">
        <span className="num">
          {t.labelQ} {String(idx + 1).padStart(2, '0')} / {String(t.questions.length).padStart(2, '0')}
        </span>
        <div className="flex-1 h-[2px] bg-rule mx-5 overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: `${(idx / t.questions.length) * 100}%` }} />
        </div>
        <span>{t.labelMini}</span>
      </div>

      <p className="font-serif text-[clamp(22px,2.6vw,28px)] text-ink leading-[1.25] mb-8">
        {q.q}
      </p>

      <div className="flex flex-col gap-2.5">
        {q.opts.map((o, i) => {
          const active = selected === i
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                const next = [...answers]
                next[idx] = i
                setAnswers(next)
              }}
              aria-pressed={active}
              className={`flex items-center gap-4 px-5 py-4 border-2 text-left transition-colors cursor-pointer
                ${active
                  ? 'bg-ink text-bg border-ink'
                  : 'bg-bg text-ink border-rule hover:border-ink hover:bg-surface'
                }`}
            >
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                  ${active ? 'bg-bg border-bg' : 'border-rule'}`}
              >
                {active && <span className="w-[6px] h-[6px] rounded-full bg-ink" />}
              </span>
              <span className="font-serif text-[17px] leading-[1.35]">{o}</span>
            </button>
          )
        })}
      </div>

      <div className="flex justify-between items-center mt-9 pt-6 border-t border-rule">
        <button
          type="button"
          onClick={() => idx > 0 && setIdx(idx - 1)}
          disabled={idx === 0}
          className="ui border-2 border-rule px-6 py-3 text-[14px] font-medium text-ink hover:border-ink transition-colors disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
        >
          {t.back}
        </button>
        <button
          type="button"
          onClick={() => {
            if (!canNext) return
            if (idx === t.questions.length - 1) setDone(true)
            else setIdx(idx + 1)
          }}
          disabled={!canNext}
          className="ui bg-ink text-bg px-6 py-3 text-[14px] font-medium hover:bg-accent transition-colors disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
        >
          {idx === t.questions.length - 1 ? t.calculate : t.next}
        </button>
      </div>
    </div>
  )
}
