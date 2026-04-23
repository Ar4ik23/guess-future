'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BLOCK_ORDER } from '@/lib/questions'
import { useLanguage } from '@/lib/i18n/context'
import { UI } from '@/lib/i18n/ui'

export default function ProcessingPage() {
  const router = useRouter()
  const { lang } = useLanguage()
  const t = UI[lang].processing
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => Math.min(s + 1, t.steps.length - 1))
    }, 2500)
    return () => clearInterval(interval)
  }, [t.steps.length])

  useEffect(() => {
    const run = async () => {
      const userId = localStorage.getItem('gf_user_id')
      if (!userId) { setError(t.errorSession); return }

      const allAnswers: Record<string, unknown> = {}
      for (const block of BLOCK_ORDER) {
        const saved = localStorage.getItem(`gf_block_${block}`)
        if (saved) {
          try {
            const blockAnswers = JSON.parse(saved)
            Object.assign(allAnswers, blockAnswers)
          } catch {}
        }
      }

      try {
        const res = await fetch('/api/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, answers: allAnswers }),
        })
        const data = await res.json()

        if (data.crisis) {
          router.push('/crisis')
          return
        }

        if (data.predictionId) {
          router.push(`/result/${data.predictionId}`)
        } else {
          setError(t.errorGenerate)
        }
      } catch {
        setError(t.errorConnection)
      }
    }
    run()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="max-w-[440px] w-full text-center">
          <p className="ui text-[11px] uppercase tracking-[0.14em] text-risk mb-4">{t.errorLabel}</p>
          <p className="font-serif text-[22px] text-text leading-[1.35] mb-6">{error}</p>
          <Link href="/" className="ui text-[14px] text-accent underline underline-offset-4">
            {t.errorBack}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-[520px] w-full text-center">
        <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-5">
          {t.label}
        </p>
        <h1 className="font-serif text-[clamp(32px,5vw,44px)] font-medium leading-[1.1] tracking-[-0.01em] mb-10">
          {t.title}
        </h1>

        <div className="flex flex-col gap-3 text-left border-t border-rule">
          {t.steps.map((s, i) => {
            const done = i < step
            const active = i === step
            return (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-rule">
                <span className={`num text-[12px] w-6 shrink-0 ${done ? 'text-positive' : active ? 'text-accent' : 'text-subtle'}`}>
                  {done ? '✓' : active ? '→' : String(i + 1).padStart(2, '0')}
                </span>
                <span className={`font-serif text-[16px] leading-[1.4] ${done ? 'text-muted' : active ? 'text-text' : 'text-subtle'}`}>
                  {s}{active ? '…' : ''}
                </span>
              </div>
            )
          })}
        </div>

        <p className="ui text-[13px] text-muted mt-8">
          {t.footer}
        </p>
      </div>
    </div>
  )
}
