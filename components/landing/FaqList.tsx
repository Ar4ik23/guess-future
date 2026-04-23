'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/context'
import { UI } from '@/lib/i18n/ui'

interface Item { q: string; a: string }

function FaqItem({ item, open, onToggle }: { item: Item; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-rule">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center gap-6 py-6 text-left cursor-pointer hover:text-accent transition-colors"
      >
        <span className="font-serif text-[clamp(18px,2vw,22px)] font-medium leading-[1.3] text-ink">
          {item.q}
        </span>
        <span
          className={`ui text-[22px] text-muted font-light shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="ui text-[16px] text-muted leading-[1.7] pb-7 max-w-[640px]">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqList() {
  const { lang } = useLanguage()
  const items = UI[lang].faq
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <div className="border-t border-rule mt-10">
      {items.map((item, i) => (
        <FaqItem
          key={i}
          item={item}
          open={openIdx === i}
          onToggle={() => setOpenIdx(openIdx === i ? null : i)}
        />
      ))}
    </div>
  )
}
