'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/context'
import { UI } from '@/lib/i18n/ui'

export default function CrisisPage() {
  const { lang } = useLanguage()
  const t = UI[lang].crisis

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-[560px] w-full">
        <p className="ui text-[11px] uppercase tracking-[0.14em] text-risk mb-5">
          {t.label}
        </p>
        <h1 className="font-serif text-[clamp(32px,4.5vw,42px)] font-medium leading-[1.1] tracking-[-0.01em] mb-6">
          {t.title}
        </h1>
        <p className="text-[18px] text-text leading-[1.6] mb-10">
          {t.body}
        </p>

        <div className="border-t border-b border-rule py-6 mb-10">
          <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-4">
            {t.hotlinesLabel}
          </p>
          <dl className="flex flex-col gap-3">
            {t.hotlines.map(([country, num]) => (
              <div key={country} className="flex items-baseline justify-between gap-4">
                <dt className="font-serif text-[16px] text-text">{country}</dt>
                <dd className="num text-[16px] text-text">{num}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Link
            href="/"
            className="ui inline-flex items-center gap-2 bg-text text-bg px-7 py-3.5 text-[14px] font-medium hover:bg-accent transition-colors"
          >
            {t.btnHome}
          </Link>
          <Link
            href="/survey"
            className="ui inline-flex items-center gap-2 border border-rule px-7 py-3.5 text-[14px] font-medium text-text hover:border-text transition-colors no-underline"
          >
            {t.btnRetake}
          </Link>
        </div>

        <p className="ui text-[13px] text-muted mt-8 leading-[1.7]">
          {t.privacy}
        </p>
      </div>
    </div>
  )
}
