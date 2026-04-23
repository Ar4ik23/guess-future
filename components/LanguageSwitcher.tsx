'use client'

import { useLanguage } from '@/lib/i18n/context'

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
      className="ui text-[12px] font-medium text-muted hover:text-text transition-colors cursor-pointer border border-rule px-2.5 py-1 tracking-[0.08em]"
      title={lang === 'en' ? 'Switch to Russian' : 'Switch to English'}
    >
      {lang === 'en' ? 'RU' : 'EN'}
    </button>
  )
}
