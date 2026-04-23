'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n/context'
import { UI, BLOCK_LABELS_EN } from '@/lib/i18n/ui'
import { BLOCK_ORDER, BLOCK_LABELS } from '@/lib/questions'

export default function SurveyIntroPage() {
  const router = useRouter()
  const { lang } = useLanguage()
  const t = UI[lang].survey
  const labels = lang === 'en' ? BLOCK_LABELS_EN : BLOCK_LABELS

  const startFresh = () => {
    for (const block of BLOCK_ORDER) {
      localStorage.removeItem(`gf_block_${block}`)
    }
    router.push('/survey/a')
  }

  return (
    <div>
      <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-5">
        {t.before}
      </p>
      <h1 className="font-serif text-[clamp(36px,5.5vw,52px)] font-medium leading-[1.08] tracking-[-0.01em] text-ink mb-10">
        {t.heroTitle}
      </h1>

      <p className="text-[20px] leading-[1.55] text-muted mb-10 max-w-[620px]">
        {t.heroDesc}
      </p>

      <ol className="border-t border-rule mb-12">
        {BLOCK_ORDER.map((letter) => {
          const [desc, count] = t.blockDescs[letter]
          return (
            <li key={letter} className="grid grid-cols-[48px_1fr_auto] gap-5 items-baseline py-5 border-b border-rule">
              <span className="num text-[13px] text-muted">{lang === 'en' ? 'Block' : 'Блок'} {letter}</span>
              <span>
                <span className="block font-serif text-[18px] font-medium text-ink leading-[1.3]">{labels[letter]}</span>
                <span className="ui text-[14px] text-muted leading-[1.5]">{desc}</span>
              </span>
              <span className="ui text-[12px] text-subtle num whitespace-nowrap">{count}</span>
            </li>
          )
        })}
      </ol>

      <div className="mb-12">
        <h2 className="font-serif text-[24px] font-medium leading-[1.2] text-ink mb-6">
          {t.howTitle}
        </h2>
        <ul className="flex flex-col gap-4">
          {t.howItems.map(([bold, rest]) => (
            <li key={bold} className="flex gap-4">
              <span className="w-[6px] h-[6px] rounded-full bg-accent mt-[12px] shrink-0" />
              <p className="text-[17px] leading-[1.65] text-text">
                <strong className="font-medium text-ink">{bold}</strong>{' '}
                <span className="text-muted">{rest}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-l-2 border-accent pl-5 py-3 mb-14 bg-surface-deep">
        <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-2">
          {t.importantLabel}
        </p>
        <p className="text-[16px] text-text leading-[1.65]">
          {t.importantText}
        </p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          type="button"
          onClick={startFresh}
          className="ui inline-flex items-center gap-2 bg-ink text-bg px-8 py-4 text-[14px] font-medium hover:bg-accent transition-colors cursor-pointer"
        >
          {t.ctaStart}
        </button>
        <Link
          href="/"
          className="ui inline-flex items-center gap-2 border-2 border-rule px-8 py-4 text-[14px] font-medium text-ink hover:border-ink transition-colors no-underline"
        >
          {t.ctaBack}
        </Link>
      </div>

      <p className="ui text-[13px] text-muted mt-5">
        {t.footer}
      </p>
    </div>
  )
}
