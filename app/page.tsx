'use client'

import Link from 'next/link'
import { TeaserTest } from '@/components/landing/TeaserTest'
import { FaqList } from '@/components/landing/FaqList'
import { useLanguage } from '@/lib/i18n/context'
import { UI } from '@/lib/i18n/ui'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function HomePage() {
  const { lang } = useLanguage()
  const t = UI[lang].landing

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* NAV */}
      <nav className="border-b border-rule">
        <div className="max-w-[1040px] mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          <Link href="/" className="ui text-[13px] font-medium text-ink hover:opacity-70 no-underline">
            Test Guringtona
          </Link>
          <div className="flex items-center gap-4">
            <span className="ui text-[13px] text-muted">{t.navFree}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <main id="top" className="flex-1">

        {/* HERO */}
        <section className="py-28">
          <div className="max-w-[720px] mx-auto px-6 md:px-8">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-7">
              {t.heroBadge}
            </p>
            <h1 className="font-serif text-[clamp(48px,7vw,68px)] font-medium leading-[1.05] tracking-[-0.015em] text-ink">
              {t.heroLine1}<br />
              {t.heroLine2}<br />
              {t.heroLine3} <em className="italic text-accent">{t.heroLine3em}</em>
            </h1>
            <p className="mt-8 text-[21px] leading-[1.5] text-text max-w-[580px]">
              {t.heroDesc}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/survey"
                className="ui inline-flex items-center gap-2 bg-ink text-bg px-8 py-4 text-[14px] font-medium hover:bg-accent transition-colors no-underline"
              >
                {t.ctaStart}
              </Link>
              <a
                href="#method"
                className="ui inline-flex items-center gap-2 border-2 border-rule px-8 py-4 text-[14px] font-medium text-ink hover:border-ink transition-colors no-underline"
              >
                {t.ctaHow}
              </a>
            </div>
            <p className="ui text-[13px] text-muted mt-5">
              {t.ctaFree}
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 mt-20 pt-10 border-t border-rule gap-y-8">
              {t.stats.map(([num, label], i) => (
                <div
                  key={i}
                  className={`px-0 md:px-6 md:first:pl-0 md:last:pr-0 ${i > 0 ? 'md:border-l border-rule' : ''}`}
                >
                  <div className="font-serif text-[clamp(32px,4vw,48px)] font-medium leading-none mb-2.5 text-ink num">
                    {num}
                  </div>
                  <div className="ui text-[12px] text-muted leading-[1.45] whitespace-pre-line">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT AUTHOR */}
        <section id="about" className="py-28 border-t border-rule">
          <div className="max-w-[720px] mx-auto px-6 md:px-8">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">{t.authorBadge}</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink mb-10">
              {t.authorTitle}
            </h2>

            <figure className="float-none md:float-left md:w-[240px] md:mr-10 md:mb-6 mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gurington-portrait.jpg"
                alt="Prof. Artyom Gurington"
                className="w-full aspect-[3/4] object-cover border border-rule bg-surface"
                style={{ filter: 'saturate(1.02) contrast(1.02)' }}
              />
              <figcaption className="ui text-[12px] text-muted leading-[1.5] mt-3">
                Prof. Artyom Gurington<br />
                University College London
              </figcaption>
            </figure>

            <p className="text-[20px] leading-[1.55] text-muted mb-6">{t.authorBio1}</p>
            <p className="text-[18px] leading-[1.7] text-text mb-5">{t.authorBio2}</p>
            <p className="text-[18px] leading-[1.7] text-text">{t.authorBio3}</p>

            <ul className="mt-12 border-t border-rule clear-both">
              {t.cv.map(([year, title, desc], i) => (
                <li key={i} className="grid grid-cols-[120px_1fr] gap-6 py-5 border-b border-rule">
                  <span className="num text-[12px] text-muted pt-1">{year}</span>
                  <span>
                    <strong className="block font-serif text-[17px] font-medium text-ink mb-1">{title}</strong>
                    <span className="ui text-[13px] text-muted leading-[1.5]">{desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* METHOD */}
        <section id="method" className="py-28 border-t border-rule">
          <div className="max-w-[720px] mx-auto px-6 md:px-8 mb-14">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">{t.methodBadge}</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink mb-10">
              {t.methodTitle}
            </h2>
            <p className="text-[20px] leading-[1.55] text-muted mb-5">{t.methodDesc1}</p>
            <p className="text-[18px] leading-[1.7] text-text">{t.methodDesc2}</p>
          </div>

          <div className="max-w-[1040px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-rule">
              {t.methodBlocks.map(([id, title, desc, count]) => (
                <div key={id} className="border-r border-b border-rule p-7 flex flex-col gap-2.5 min-h-[190px] bg-bg">
                  <div className="ui text-[11px] text-subtle num">{id}</div>
                  <div className="font-serif text-[20px] font-medium leading-[1.25] text-ink">{title}</div>
                  <div className="ui text-[13px] text-muted leading-[1.55]">{desc}</div>
                  <div className="ui text-[12px] text-accent num mt-auto pt-3">{count}</div>
                </div>
              ))}
            </div>

            {/* FORMULA */}
            <div className="bg-surface-deep border-x border-b border-rule p-10 md:p-14">
              <div className="ui text-[12px] uppercase tracking-[0.14em] text-muted mb-5">
                {t.formulaLabel}
              </div>
              <div className="font-serif italic text-[clamp(26px,3vw,38px)] leading-[1.35] text-ink mb-6">
                P(E<sub className="text-[0.55em] not-italic">i</sub> | X) =
                Σ<sub className="text-[0.55em] not-italic">k</sub> w<sub className="text-[0.55em] not-italic">k</sub> · ƒ<sub className="text-[0.55em] not-italic">k</sub>(x<sub className="text-[0.55em] not-italic">k</sub>, ρ)
              </div>
              <div className="num text-[12px] text-muted leading-[1.8] pt-5 border-t border-rule">
                {t.formulaDesc.map((line, i) => <span key={i}>{line}<br /></span>)}
              </div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="why" className="py-28 border-t border-rule">
          <div className="max-w-[720px] mx-auto px-6 md:px-8 mb-12">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">{t.whyBadge}</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink">
              {t.whyTitle}
            </h2>
          </div>
          <div className="max-w-[1040px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {t.whyItems.map(([num, title, body]) => (
                <div key={num} className="border-t-2 border-ink pt-6">
                  <div className="font-serif text-[48px] font-normal leading-none text-rule mb-3">{num}</div>
                  <h3 className="font-serif text-[22px] font-medium leading-[1.25] text-ink mb-4">{title}</h3>
                  <p className="ui text-[15px] text-muted leading-[1.7]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPEN METHODOLOGY */}
        <section className="py-28 border-t border-rule">
          <div className="max-w-[720px] mx-auto px-6 md:px-8">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">{t.openBadge}</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink mb-10">
              {t.openTitle}
            </h2>
            <p className="text-[18px] leading-[1.7] text-text mb-10">{t.openDesc}</p>
            <blockquote className="font-serif italic text-[clamp(22px,2.8vw,30px)] leading-[1.35] text-ink border-l-2 border-accent pl-6 mb-4">
              {t.openQuote}
            </blockquote>
            <p className="ui text-[13px] text-muted mb-12">{t.openAuthor}</p>

            <dl className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-rule">
              {t.openDl.map(([k, v]) => (
                <div key={k}>
                  <dt className="ui text-[12px] uppercase tracking-[0.14em] text-muted mb-2">{k}</dt>
                  <dd className="font-serif text-[17px] text-ink leading-[1.45]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-28 border-t border-rule">
          <div className="max-w-[720px] mx-auto px-6 md:px-8 mb-10">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">{t.reviewsBadge}</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink">
              {t.reviewsTitle}
            </h2>
          </div>
          <div className="max-w-[1040px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-rule">
              {t.reviews.map(([quote, name, role], i) => (
                <div key={i} className="border-r border-b border-rule p-9 bg-bg flex flex-col gap-5">
                  <blockquote className="font-serif text-[18px] text-ink leading-[1.55] flex-1">{quote}</blockquote>
                  <div className="flex items-center gap-3 pt-5 border-t border-rule">
                    <div className="w-10 h-10 rounded-full bg-surface border border-rule flex items-center justify-center font-serif text-[13px] text-muted shrink-0">
                      {name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-serif text-[16px] text-ink leading-[1.2]">{name}</div>
                      <div className="ui text-[12px] text-muted uppercase tracking-[0.1em] mt-1">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SAMPLE REPORT */}
        <section className="py-28 border-t border-rule">
          <div className="max-w-[720px] mx-auto px-6 md:px-8 mb-12">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">{t.sampleBadge}</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink mb-8">
              {t.sampleTitle}
            </h2>
            <p className="text-[20px] leading-[1.55] text-muted mb-5">{t.sampleDesc1}</p>
            <p className="text-[18px] leading-[1.7] text-text">{t.sampleDesc2}</p>
          </div>

          <div className="max-w-[1040px] mx-auto px-6 md:px-8">
            <div className="bg-surface-deep border border-rule p-6 md:p-10">
              <div className="flex flex-wrap justify-between items-center gap-5 pb-7 border-b border-rule mb-8">
                <div>
                  <div className="ui text-[12px] uppercase tracking-[0.14em] text-muted">
                    {t.sampleHeaderLabel}
                  </div>
                  <div className="font-serif text-[22px] text-ink mt-1.5">
                    {t.sampleLsiLabel}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="ui text-[12px] text-muted">LSI</div>
                    <div className="ui text-[12px] text-muted max-w-[120px] leading-[1.4]">{lang === 'en' ? 'Life Stability Index' : 'Индекс общей устойчивости'}</div>
                  </div>
                  <svg width="84" height="84" viewBox="0 0 84 84">
                    <circle cx="42" cy="42" r="32" fill="none" stroke="var(--rule)" strokeWidth="6" />
                    <circle cx="42" cy="42" r="32" fill="none" stroke="var(--accent)" strokeWidth="6"
                      strokeDasharray={`${(62/100)*201} 201`} strokeLinecap="round"
                      transform="rotate(-90 42 42)" />
                    <text x="42" y="47" textAnchor="middle" fontFamily="var(--font-serif)"
                      fontSize="22" fontWeight="500" fill="var(--ink)">62</text>
                  </svg>
                </div>
              </div>

              <div className="mb-8 pb-8 border-b border-rule">
                <div className="ui text-[12px] uppercase tracking-[0.14em] text-muted mb-5">
                  {t.sampleScenariosLabel}
                </div>
                {t.sampleScenarios.map(([name, pct]) => (
                  <div key={name} className="grid grid-cols-[160px_1fr_56px] gap-4 items-center mb-3">
                    <div className="ui text-[13px] text-ink">{name}</div>
                    <div className="h-[8px] bg-rule relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="num text-[14px] text-right text-ink">{pct}%</div>
                  </div>
                ))}
              </div>

              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left ui text-[11px] uppercase tracking-[0.1em] text-muted pb-3 border-b border-rule font-normal">{t.sampleEventCol}</th>
                    <th className="pb-3 border-b border-rule pl-4" />
                    <th className="text-right ui text-[11px] uppercase tracking-[0.1em] text-muted pb-3 border-b border-rule font-normal">P</th>
                  </tr>
                </thead>
                <tbody>
                  {t.sampleEvents.map(([label, pct, kind]) => {
                    const colorCls = kind === 'positive' ? 'bg-positive' : kind === 'risk' ? 'bg-risk' : 'bg-muted'
                    const textCls = kind === 'positive' ? 'text-positive' : kind === 'risk' ? 'text-risk' : 'text-muted'
                    return (
                      <tr key={label} className="border-b border-rule last:border-b-0">
                        <td className="py-3.5 font-serif text-[16px] text-ink">{label}</td>
                        <td className="py-3.5 px-4">
                          <div className="w-[120px] h-[5px] bg-rule relative overflow-hidden">
                            <div className={`absolute inset-y-0 left-0 ${colorCls}`} style={{ width: `${pct}%` }} />
                          </div>
                        </td>
                        <td className={`py-3.5 num text-[14px] text-right ${textCls}`}>{pct}%</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="mt-7 p-5 bg-bg border-l-2 border-accent">
                <div className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-2 font-medium">
                  {t.sampleRecoLabel}
                </div>
                <div className="ui text-[14px] text-text leading-[1.7]">
                  {t.sampleRecoText}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEASER */}
        <section id="teaser" className="py-28 border-t border-rule bg-surface-deep">
          <div className="max-w-[720px] mx-auto px-6 md:px-8 mb-10">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">{t.teaserBadge}</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink">
              {t.teaserTitle}
            </h2>
          </div>
          <div className="max-w-[720px] mx-auto px-6 md:px-8">
            <TeaserTest />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-28 border-t border-rule">
          <div className="max-w-[720px] mx-auto px-6 md:px-8">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">{t.faqBadge}</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink">
              {t.faqTitle}
            </h2>
            <FaqList />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 border-t border-rule text-center">
          <div className="max-w-[720px] mx-auto px-6 md:px-8">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-5">
              {t.ctaFinalBadge}
            </p>
            <h2 className="font-serif text-[clamp(40px,6vw,64px)] font-medium leading-[1.02] tracking-[-0.015em] text-ink mb-6 max-w-[14ch] mx-auto">
              {t.ctaFinalTitle} <em className="italic text-accent">{t.ctaFinalTitleEm}</em>
            </h2>
            <p className="text-[18px] text-muted max-w-[460px] mx-auto mb-10 leading-[1.55]">
              {t.ctaFinalDesc}
            </p>
            <Link
              href="/survey"
              className="ui inline-flex items-center gap-2 bg-ink text-bg px-10 py-5 text-[14px] font-medium hover:bg-accent transition-colors no-underline"
            >
              {t.ctaFinalBtn}
            </Link>
            <p className="ui text-[13px] text-muted mt-5">
              {t.ctaFinalSub}
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-rule py-10">
        <div className="max-w-[1040px] mx-auto px-6 md:px-8 flex flex-wrap justify-between items-center gap-3 ui text-[12px] text-muted">
          <span>{t.footerCopy}</span>
          <span>{t.footerEmail}</span>
          <span>{t.footerOpen}</span>
        </div>
      </footer>
    </div>
  )
}
