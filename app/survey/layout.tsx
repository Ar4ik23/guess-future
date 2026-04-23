'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BLOCK_ORDER } from '@/lib/questions'
import { useLanguage } from '@/lib/i18n/context'
import { BLOCK_LABELS_EN } from '@/lib/i18n/ui'
import { BLOCK_LABELS } from '@/lib/questions'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { lang } = useLanguage()
  const pathBlock = pathname.split('/').pop()?.toUpperCase()
  const currentIdx = BLOCK_ORDER.indexOf(pathBlock as typeof BLOCK_ORDER[number])
  const labels = lang === 'en' ? BLOCK_LABELS_EN : BLOCK_LABELS

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-rule sticky top-0 z-10 bg-bg/95 backdrop-blur-sm">
        <div className="max-w-[720px] mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="ui text-[13px] font-medium text-text hover:opacity-70">
              Test Guringtona
            </Link>
            <div className="flex items-center gap-3">
              <span className="ui text-[12px] text-muted">~30–40 {lang === 'en' ? 'min' : 'минут'}</span>
              <LanguageSwitcher />
            </div>
          </div>
          <div className="flex gap-1.5">
            {BLOCK_ORDER.map((block, idx) => (
              <div
                key={block}
                className="flex-1 h-[3px] bg-rule overflow-hidden"
                title={labels[block]}
              >
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: currentIdx >= 0 && idx <= currentIdx ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>
        </div>
      </header>
      <main className="max-w-[720px] mx-auto px-6 md:px-8 py-12">
        {children}
      </main>
    </div>
  )
}
