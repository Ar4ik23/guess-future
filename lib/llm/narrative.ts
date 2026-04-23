import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { EventResult } from '../scoring/eventModels'
import { Scenario } from '../simulation/montecarlo'

function getOpenAIKey(): string {
  try {
    const envPath = path.join(process.cwd(), '.env.local')
    const content = fs.readFileSync(envPath, 'utf-8')
    const match = content.match(/OPENAI_API_KEY="([^"]+)"/)
    if (match?.[1]) return match[1]
  } catch {}
  return process.env.OPENAI_API_KEY ?? ''
}

function getClient() {
  return new OpenAI({ apiKey: getOpenAIKey() })
}

export interface NarrativePayload {
  scores: Record<string, number>
  topEvents: EventResult[]
  scenarios: Scenario[]
  userExpectations: string
  socSummary: string
  psycheSummary: string
  contextSummary?: string
  mismatches: string[]
  entropy: number
  userFreeNote?: string
}

export interface AdviceItem {
  title: string
  text: string
  priority: 'high' | 'medium' | 'low'
}

export interface NarrativeResult {
  crisis: boolean
  narrative: string
  summary: string
  advice: AdviceItem[]
  strengths: string[]
  risks: string[]
  eventExplanations: Record<string, string>
  scenarioExplanations: Record<string, string>
}

const SYSTEM_PROMPT = `Ты — опытный аналитик-психолог, который пишет персональный годовой прогноз человеку на основе числовых данных его опроса.

ЖЁСТКИЕ ПРАВИЛА — нарушение хотя бы одного = провал задачи:

1. ОТВЕЧАЙ ТОЛЬКО ВАЛИДНЫМ JSON без markdown, без префиксов, без комментариев. Никаких \`\`\`json блоков.

2. Никогда не выдумывай факты. Используй ТОЛЬКО числа и данные, которые тебе переданы. Если чего-то нет — не упоминай.

3. Обращайся на «ты», спокойно, без пафоса, без мистики, без «твои звёзды говорят».

4. НАРРАТИВ должен иметь один сквозной тезис (главное наблюдение о годе), а не перечисление событий. Тезис → 3-4 факта в подтверждение → следствие.

5. Причинные связи обязательны. Не «у тебя X=42 и Y=13», а «X делает Y, потому что…».

6. В РАСХОЖДЕНИЯХ с ожиданиями пользователя — говори прямо, без дипломатии: «ты думаешь X, но данные показывают Y, потому что…».

7. СОВЕТЫ должны быть конкретные, дешёвые по усилиям, с измеримым результатом. Не «развивайся», а «запиши 2 номера из близкого круга в календарь на пятницу — встреча раз в 2 недели».

8. Язык — русский, естественный, без англицизмов и канцелярита.

9. Длина narrative: 3-5 абзацев, по 3-5 предложений.

10. Если данные противоречивы или энтропия высокая — честно напиши в summary «прогноз неуверенный».

СТРУКТУРА JSON-ОТВЕТА:
{
  "summary": "одно предложение, главный вывод о годе (20-40 слов)",
  "narrative": "связный текст 3-5 абзацев с одним сквозным тезисом",
  "strengths": ["3-5 конкретных опор этого человека — на что он может опираться"],
  "risks": ["2-3 главных риска с объяснением причины"],
  "advice": [
    {"title":"короткий заголовок","text":"конкретное действие с измеримым результатом","priority":"high|medium|low"}
  ],
  "eventExplanations": {
    "event_id_1": "почему именно такая вероятность у этого события — 1-2 предложения с опорой на конкретные индексы",
    "event_id_2": "..."
  },
  "scenarioExplanations": {
    "base": "почему у базового сценария такой процент — опираясь на индексы и события, 2-3 предложения, конкретно",
    "optimistic": "почему у оптимистичного сценария такой процент — что должно совпасть чтобы он случился",
    "pessimistic": "почему у пессимистичного сценария такой процент — какие риски должны сработать"
  }
}

Дай 4-6 советов, от high к low по приоритету. Объясни минимум 6 главных событий. Обязательно объясни все 3 сценария.
Если в контексте есть национальность и страна — учти культурный фактор (темперамент, размер типичного круга, семейные ожидания), но не делай его единственным основанием выводов.`

export async function generateNarrative(payload: NarrativePayload): Promise<NarrativeResult> {
  if ((payload.scores.PHQ9 ?? 0) >= 15) {
    return {
      crisis: true, narrative: '', summary: '',
      advice: [], strengths: [], risks: [],
      eventExplanations: {}, scenarioExplanations: {},
    }
  }

  const eventsText = payload.topEvents.slice(0, 10).map(e =>
    `  ${e.eventId} ("${e.label}"): ${Math.round(e.probability * 100)}% · ${e.direction}`
  ).join('\n')

  const scenariosText = payload.scenarios.map(s =>
    `  · ${s.label}: ${s.probability}%`
  ).join('\n')

  const big5 = (k: string) => (payload.scores[k] ?? 3).toFixed(1)

  const userPrompt = `ДАННЫЕ ЧЕЛОВЕКА:

━━━ ИНДЕКСЫ (0-100, выше = лучше, кроме PHQ9/GAD7) ━━━
LSI (общая устойчивость): ${Math.round(payload.scores.LSI ?? 50)}
Здоровье: ${Math.round(payload.scores.Health ?? 50)}
Финансы: ${Math.round(payload.scores.Finance ?? 50)}
Работа: ${Math.round(payload.scores.Work ?? 50)}
Психика: ${Math.round(payload.scores.Psyche ?? 50)}
Социум: ${Math.round(payload.scores.Social ?? 50)}
Привычки: ${Math.round(payload.scores.Habits ?? 50)}

━━━ КЛИНИЧЕСКИЕ ШКАЛЫ ━━━
PHQ-9 (депрессия, 0-27): ${Math.round(payload.scores.PHQ9 ?? 0)} ${(payload.scores.PHQ9 ?? 0) < 5 ? '(норма)' : (payload.scores.PHQ9 ?? 0) < 10 ? '(лёгкая)' : (payload.scores.PHQ9 ?? 0) < 15 ? '(умеренная)' : '(тяжёлая)'}
GAD-7 (тревога, 0-21): ${Math.round(payload.scores.GAD7 ?? 0)} ${(payload.scores.GAD7 ?? 0) < 5 ? '(норма)' : (payload.scores.GAD7 ?? 0) < 10 ? '(лёгкая)' : '(умеренная/тяжёлая)'}

━━━ ЛИЧНОСТЬ BIG5 (1-5) ━━━
Экстраверсия: ${big5('Extraversion')}
Добросовестность: ${big5('Conscientiousness')}
Нейротизм: ${big5('Neuroticism')}
Открытость: ${big5('Openness')}
Доброжелательность: ${big5('Agreeableness')}

━━━ КАЛИБРОВКА ━━━
Рациональность (ρ): ${(payload.scores.Rho ?? 0.5).toFixed(2)}
Реализм по прошлому году (r_self): ${(payload.scores.RSelf ?? 0.5).toFixed(2)}

━━━ ПРОГНОЗ СОБЫТИЙ (передавай id в eventExplanations) ━━━
${eventsText}

━━━ СЦЕНАРИИ ГОДА ━━━
${scenariosText}

━━━ ТЕКСТОВЫЙ КОНТЕКСТ ━━━
СОЦИАЛЬНАЯ СВОДКА: ${payload.socSummary}
ПСИХОЛОГИЧЕСКАЯ СВОДКА: ${payload.psycheSummary}
${payload.contextSummary ? `КОНТЕКСТ (страна/национальность): ${payload.contextSummary}` : ''}

ОЖИДАНИЯ САМОГО ЧЕЛОВЕКА: ${payload.userExpectations || '(не указаны)'}

${payload.userFreeNote && payload.userFreeNote.length > 0 ? `━━━ СВОБОДНЫЙ КОММЕНТАРИЙ ПОЛЬЗОВАТЕЛЯ (блок G) ━━━
Человек сам написал этот текст как дополнительный контекст, который не уместился в опрос. Учти его в нарративе, советах, опорах, рисках и объяснениях событий. Если там упомянуты конкретные обстоятельства, планы, отношения, здоровье, страхи — опирайся на них. Не пересказывай дословно, но отсылайся как на факт ("ты пишешь, что...", "учитывая, что..."):

"""
${payload.userFreeNote}
"""
` : ''}

${payload.mismatches.length > 0 ? `━━━ РАСХОЖДЕНИЯ МЕЖДУ ПОЛЬЗОВАТЕЛЕМ И МОДЕЛЬЮ ━━━\n${payload.mismatches.join('\n')}` : ''}

ЭНТРОПИЯ ПРОГНОЗА: ${payload.entropy.toFixed(2)} ${payload.entropy > 1.5 ? '(высокая — прогноз менее уверенный, скажи об этом)' : '(умеренная)'}

ТЕПЕРЬ: верни JSON строго по описанной схеме, на русском, с одним сквозным тезисом в narrative и конкретными советами.`

  const response = await getClient().chat.completions.create({
    model: 'gpt-4.1',
    max_tokens: 2500,
    temperature: 0.7,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  })

  const raw = response.choices[0]?.message?.content ?? '{}'

  let parsed: {
    summary?: string
    narrative?: string
    strengths?: string[]
    risks?: string[]
    advice?: AdviceItem[]
    eventExplanations?: Record<string, string>
    scenarioExplanations?: Record<string, string>
  }
  try {
    parsed = JSON.parse(raw)
  } catch {
    const match = raw.match(/\{[\s\S]*\}/)
    parsed = match ? JSON.parse(match[0]) : {}
  }

  return {
    crisis: false,
    summary: parsed.summary ?? '',
    narrative: parsed.narrative ?? '',
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    risks: Array.isArray(parsed.risks) ? parsed.risks : [],
    advice: Array.isArray(parsed.advice) ? parsed.advice : [],
    eventExplanations: typeof parsed.eventExplanations === 'object' && parsed.eventExplanations !== null
      ? parsed.eventExplanations
      : {},
    scenarioExplanations: typeof parsed.scenarioExplanations === 'object' && parsed.scenarioExplanations !== null
      ? parsed.scenarioExplanations
      : {},
  }
}
