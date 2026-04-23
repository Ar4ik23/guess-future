'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { ALL_BLOCKS, BLOCK_ORDER, BlockKey, Question } from '@/lib/questions'
import { BLOCK_LABELS_EN } from '@/lib/i18n/ui'
import { BLOCK_LABELS } from '@/lib/questions'
import { QuestionRenderer } from '@/components/survey/QuestionRenderer'
import { useLanguage } from '@/lib/i18n/context'
import { UI } from '@/lib/i18n/ui'
import { questionTranslationsEn } from '@/lib/i18n/questions'

export default function BlockPage() {
  const params = useParams()
  const router = useRouter()
  const { lang } = useLanguage()
  const t = UI[lang].block
  const block = (params.block as string)?.toUpperCase() as BlockKey

  const questions = ALL_BLOCKS[block] ?? []
  const blockIdx = BLOCK_ORDER.indexOf(block)
  const isValidBlock = blockIdx !== -1

  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    let uid = localStorage.getItem('gf_user_id')
    if (!uid) {
      uid = crypto.randomUUID()
      localStorage.setItem('gf_user_id', uid)
    }
    setUserId(uid)

    const saved = localStorage.getItem(`gf_block_${block}`)
    if (saved) {
      try { setAnswers(JSON.parse(saved)) } catch {}
    }
  }, [block])

  const setAnswer = useCallback((id: string, value: unknown) => {
    setAnswers(prev => {
      const next = { ...prev, [id]: value }
      localStorage.setItem(`gf_block_${block}`, JSON.stringify(next))
      return next
    })
  }, [block])

  const handleNext = async () => {
    setSaving(true)
    try {
      if (!userId) return
      await fetch('/api/survey/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, block, answers }),
      })

      const nextIdx = blockIdx + 1
      if (nextIdx < BLOCK_ORDER.length) {
        router.push(`/survey/${BLOCK_ORDER[nextIdx].toLowerCase()}`)
      } else {
        router.push('/survey/processing')
      }
    } catch {
      alert(lang === 'en' ? 'Save error, please try again' : 'Ошибка сохранения, попробуйте ещё раз')
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => {
    if (blockIdx > 0) {
      router.push(`/survey/${BLOCK_ORDER[blockIdx - 1].toLowerCase()}`)
    } else {
      router.push('/survey')
    }
  }

  if (!isValidBlock) {
    return <div className="text-center text-muted mt-20 ui">{t.notFound}</div>
  }

  const labels = lang === 'en' ? BLOCK_LABELS_EN : BLOCK_LABELS

  return (
    <div>
      <div className="mb-12">
        <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">
          {t.blockOf(blockIdx + 1, BLOCK_ORDER.length, questions.length)}
        </p>
        <h1 className="font-serif text-[clamp(32px,4.5vw,40px)] font-medium leading-[1.1] tracking-[-0.01em] text-ink">
          {labels[block]}.
        </h1>
      </div>

      <div className="flex flex-col border-t border-rule">
        {questions.map((q: Question, idx: number) => {
          const qTrans = lang === 'en' ? questionTranslationsEn[q.id] : undefined
          const displayText = qTrans?.text ?? q.text
          const displayHint = qTrans?.hint ?? q.hint
          return (
            <div key={q.id} className="border-b border-rule py-8">
              <p className="ui text-[11px] text-subtle num mb-3">
                {String(idx + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
              </p>
              <p className="font-serif text-[21px] text-ink leading-[1.35] mb-1 font-medium">{displayText}</p>
              {displayHint && <p className="ui text-[14px] text-muted italic mt-2 mb-5">{displayHint}</p>}
              <div className="mt-5">
                <QuestionRenderer
                  question={q}
                  value={answers[q.id] ?? null}
                  onChange={v => setAnswer(q.id, v)}
                  showScaleGuide={block === 'A' && idx === 0}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-3 mt-12">
        <button
          onClick={handleBack}
          className="ui flex-1 border-2 border-rule px-6 py-3.5 text-[14px] font-medium text-ink hover:border-ink transition-colors cursor-pointer"
        >
          {t.back}
        </button>
        <button
          onClick={handleNext}
          disabled={saving}
          className="ui flex-1 bg-ink text-bg px-6 py-3.5 text-[14px] font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {saving ? t.saving : blockIdx === BLOCK_ORDER.length - 1 ? t.finish : t.next}
        </button>
      </div>

      <p className="ui text-[12px] text-muted text-center mt-4">
        {t.autoSave}
      </p>
    </div>
  )
}
