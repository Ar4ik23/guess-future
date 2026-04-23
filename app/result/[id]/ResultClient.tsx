'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EventResult } from '@/lib/scoring/eventModels'
import { Scenario } from '@/lib/simulation/montecarlo'
import { AdviceItem } from '@/lib/llm/narrative'

interface PredictionData {
  id: string
  events: EventResult[]
  narrative: string
  summary: string
  scenarios: Scenario[]
  scores: Record<string, number>
  advice: AdviceItem[]
  strengths: string[]
  risks: string[]
  eventExplanations: Record<string, string>
  scenarioExplanations: Record<string, string>
}

const DIR_BAR = {
  positive: 'bg-positive',
  negative: 'bg-risk',
  neutral:  'bg-muted',
}
const DIR_TEXT = {
  positive: 'text-positive',
  negative: 'text-risk',
  neutral:  'text-muted',
}
const DIR_LABEL = { positive: 'Позитив', negative: 'Риск', neutral: 'Нейтрально' }

const SCENARIO_BAR = {
  optimistic:  'bg-positive',
  base:        'bg-accent',
  pessimistic: 'bg-risk',
}

const PRIORITY_LABEL = { high: 'Высокий', medium: 'Средний', low: 'Низкий' }
const PRIORITY_TEXT = {
  high:   'text-risk',
  medium: 'text-accent',
  low:    'text-muted',
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      className={`inline-block transition-transform text-muted ui text-sm ${open ? 'rotate-90' : ''}`}
      aria-hidden
    >
      ›
    </span>
  )
}

function ScenarioRow({
  scenario, explanation,
}: { scenario: Scenario; explanation?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-rule">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full py-5 text-left"
      >
        <div className="grid grid-cols-[1fr_minmax(120px,1fr)_56px] gap-4 items-center">
          <div className="flex items-center gap-3">
            <Chevron open={open} />
            <span className="font-serif text-[17px] text-text">{scenario.label}</span>
          </div>
          <div className="h-[6px] bg-rule relative overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 ${SCENARIO_BAR[scenario.type]}`}
              style={{ width: `${scenario.probability}%` }}
            />
          </div>
          <div className="num text-[15px] text-text text-right">
            {scenario.probability}%
          </div>
        </div>
        <p className="ui text-[13px] text-muted leading-[1.6] pl-6 pr-16 mt-1.5">
          {scenario.description}
        </p>
      </button>
      {open && (
        <div className="pl-6 pr-4 pb-5 -mt-1">
          <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-2">
            Почему такая вероятность
          </p>
          <p className="text-[15px] text-text leading-[1.6]">
            {explanation || 'Развёрнутое объяснение не сформировано для этого сценария.'}
          </p>
        </div>
      )}
    </div>
  )
}

function EventRow({
  ev, explanation,
}: { ev: EventResult; explanation?: string }) {
  const [open, setOpen] = useState(false)
  const pct = Math.round(ev.probability * 100)
  return (
    <div className="border-b border-rule last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full py-4 text-left"
      >
        <div className="flex items-center gap-3 mb-1.5">
          <Chevron open={open} />
          <span className="font-serif text-[16px] text-text flex-1">{ev.label}</span>
          <span className={`ui text-[11px] uppercase tracking-[0.1em] ${DIR_TEXT[ev.direction]}`}>
            {DIR_LABEL[ev.direction]}
          </span>
          <span className={`num text-[14px] w-12 text-right ${DIR_TEXT[ev.direction]}`}>
            {pct}%
          </span>
        </div>
        <div className="h-[4px] bg-rule relative overflow-hidden ml-6">
          <div
            className={`absolute inset-y-0 left-0 ${DIR_BAR[ev.direction]}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </button>
      {open && (
        <div className="pl-6 pr-2 pb-5 ui text-[14px] text-muted leading-[1.7]">
          {explanation || ev.reasoning || 'Пояснения нет.'}
        </div>
      )}
    </div>
  )
}

function AIAssessmentBlock({
  advice, strengths, risks,
}: { advice: AdviceItem[]; strengths: string[]; risks: string[] }) {
  const [open, setOpen] = useState(false)
  const hasContent = advice.length > 0 || strengths.length > 0 || risks.length > 0
  if (!hasContent) return null

  return (
    <div className="border border-rule mt-16">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full px-7 py-6 text-left flex items-center justify-between gap-4 hover:bg-surface/60 transition-colors"
      >
        <div>
          <div className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-1.5">
            Оценка ИИ
          </div>
          <div className="font-serif text-[22px] text-text leading-[1.2]">
            Персональные рекомендации, опоры и риски
          </div>
          <div className="ui text-[13px] text-muted mt-1.5">
            На основе числовых индексов, не ваших ответов
          </div>
        </div>
        <Chevron open={open} />
      </button>

      {open && (
        <div className="px-7 pb-8 pt-4 border-t border-rule flex flex-col gap-10">
          {/* Advice */}
          {advice.length > 0 && (
            <div>
              <h3 className="font-serif text-[18px] text-text mb-2">Что делать в этом году</h3>
              <p className="ui text-[13px] text-muted mb-5">
                Рекомендации отсортированы от важного к второстепенному
              </p>
              <div className="flex flex-col divide-y divide-rule border-t border-rule">
                {advice.map((a, i) => (
                  <div key={i} className="py-5">
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <h4 className="font-serif text-[16px] text-text flex-1">{a.title}</h4>
                      <span className={`ui text-[11px] uppercase tracking-[0.1em] shrink-0 ${PRIORITY_TEXT[a.priority] ?? PRIORITY_TEXT.medium}`}>
                        {PRIORITY_LABEL[a.priority] ?? 'Средний'}
                      </span>
                    </div>
                    <p className="text-[15px] text-text leading-[1.65]">{a.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths + Risks */}
          {(strengths.length > 0 || risks.length > 0) && (
            <div className="grid md:grid-cols-2 gap-10 pt-2">
              {strengths.length > 0 && (
                <div>
                  <h4 className="ui text-[11px] uppercase tracking-[0.14em] text-positive mb-4">
                    Твои опоры
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {strengths.map((s, i) => (
                      <li key={i} className="text-[15px] text-text leading-[1.6] flex gap-3">
                        <span className="text-positive shrink-0 num">+</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {risks.length > 0 && (
                <div>
                  <h4 className="ui text-[11px] uppercase tracking-[0.14em] text-risk mb-4">
                    Чего избегать
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {risks.map((r, i) => (
                      <li key={i} className="text-[15px] text-text leading-[1.6] flex gap-3">
                        <span className="text-risk shrink-0 num">−</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function ResultClient({ data }: { data: PredictionData }) {
  const { events, narrative, summary, scenarios, scores, advice, strengths, risks, eventExplanations, scenarioExplanations } = data
  const top10 = events.slice(0, 10)
  const lsi = Math.round(scores.LSI ?? 50)
  const sortedScenarios = [...scenarios].sort((a, b) => b.probability - a.probability)

  // Circular gauge math
  const R = 48
  const C = 2 * Math.PI * R
  const dash = (lsi / 100) * C

  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <nav className="border-b border-rule">
        <div className="max-w-[1040px] mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          <Link href="/" className="ui text-[13px] font-medium text-text hover:opacity-70">
            Test Guringtona
          </Link>
          <span className="ui text-[13px] text-muted">Прогноз · 12 месяцев</span>
        </div>
      </nav>

      <main className="max-w-[720px] mx-auto px-6 md:px-8 pb-32">
        {/* Header */}
        <section className="pt-20 pb-16">
          <p className="ui text-[13px] text-muted mb-5">Результат</p>
          <h1 className="font-serif text-[clamp(40px,6vw,56px)] font-medium leading-[1.05] tracking-[-0.01em] mb-8">
            Прогноз на 12 месяцев.
          </h1>
          {summary && (
            <p className="text-[21px] leading-[1.5] text-text max-w-[620px] mb-10">
              {summary}
            </p>
          )}

          {/* LSI */}
          <div className="flex items-center gap-6 pt-8 border-t border-rule">
            <svg width="96" height="96" viewBox="0 0 120 120" className="shrink-0">
              <circle cx="60" cy="60" r={R} fill="none" stroke="var(--rule)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r={R} fill="none"
                stroke="var(--accent)" strokeWidth="8"
                strokeDasharray={`${dash} ${C}`} strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <text
                x="60" y="68" textAnchor="middle"
                fontFamily="var(--font-serif)" fontSize="28" fontWeight="500"
                fill="var(--text)"
              >{lsi}</text>
            </svg>
            <div>
              <div className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-1">
                LSI · индекс устойчивости жизни
              </div>
              <div className="font-serif text-[20px] text-text leading-[1.3]">
                {lsi >= 70 ? 'Высокая устойчивость' : lsi >= 50 ? 'Умеренная устойчивость' : lsi >= 30 ? 'Пониженная устойчивость' : 'Низкая устойчивость'}
              </div>
              <div className="ui text-[13px] text-muted mt-1">из 100 возможных</div>
            </div>
          </div>
        </section>

        {/* Scenarios */}
        <section className="py-14 border-t border-rule">
          <p className="ui text-[13px] text-muted mb-3">Сценарии года</p>
          <h2 className="font-serif text-[clamp(24px,3vw,32px)] font-medium leading-[1.2] mb-2">
            Три возможных варианта развития года — и вероятность каждого
          </h2>
          <p className="ui text-[13px] text-muted mb-6">
            Нажмите на сценарий, чтобы узнать, почему у него именно такая вероятность
          </p>
          <div className="border-t border-rule">
            {sortedScenarios.map(s => (
              <ScenarioRow
                key={s.type}
                scenario={s}
                explanation={scenarioExplanations[s.type]}
              />
            ))}
          </div>
        </section>

        {/* Narrative */}
        {narrative && (
          <section className="py-14 border-t border-rule">
            <p className="ui text-[13px] text-muted mb-3">Персональный анализ</p>
            <h2 className="font-serif text-[clamp(24px,3vw,32px)] font-medium leading-[1.2] mb-8">
              Что видно по вашим данным.
            </h2>
            <div className="text-[18px] leading-[1.7] text-text whitespace-pre-wrap">
              {narrative}
            </div>
          </section>
        )}

        {/* Events */}
        <section className="py-14 border-t border-rule">
          <p className="ui text-[13px] text-muted mb-3">Прогноз по событиям</p>
          <h2 className="font-serif text-[clamp(24px,3vw,32px)] font-medium leading-[1.2] mb-2">
            10 событий с наибольшей вероятностью.
          </h2>
          <p className="ui text-[13px] text-muted mb-6">
            Нажмите на событие, чтобы увидеть обоснование
          </p>
          <div className="border-t border-rule">
            {top10.map(ev => (
              <EventRow
                key={ev.eventId}
                ev={ev}
                explanation={eventExplanations[ev.eventId]}
              />
            ))}
          </div>
        </section>

        {/* Detailed indices */}
        <section className="py-14 border-t border-rule">
          <p className="ui text-[13px] text-muted mb-3">Детальные индексы</p>
          <h2 className="font-serif text-[clamp(24px,3vw,32px)] font-medium leading-[1.2] mb-8">
            Разбивка по секторам жизни.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {(['Health','Finance','Work','Psyche','Social','Habits'] as const).map(key => {
              const labels: Record<string, string> = {
                Health: 'Здоровье', Finance: 'Финансы', Work: 'Работа',
                Psyche: 'Психика', Social: 'Социум', Habits: 'Привычки',
              }
              const v = Math.round(scores[key] ?? 50)
              return (
                <div key={key} className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-[16px] text-text">{labels[key]}</span>
                    <span className="num text-[15px] text-text">{v} <span className="text-muted text-[13px]">/100</span></span>
                  </div>
                  <div className="h-[4px] bg-rule overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${v}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* AI assessment (collapsible) */}
        <AIAssessmentBlock advice={advice} strengths={strengths} risks={risks} />

        {/* Disclaimer */}
        <div className="mt-20 pt-8 border-t border-rule">
          <p className="ui text-[13px] text-muted leading-[1.7] text-center max-w-[560px] mx-auto">
            Это статистическая оценка на основе предоставленных данных — не предсказание.
            Вероятности описывают тенденции, а не приговор. Будущее остаётся за вами.
          </p>
        </div>
      </main>
    </div>
  )
}
