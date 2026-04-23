import {
  calcPHQ9, calcGAD7, calcPSS4, calcRho, calcRSelf,
  calcSoc, calcLSI, calcBLLambda, Responses, get
} from './indices'
import { calcEventProbabilities } from './eventModels'
import { runSimulation } from '../simulation/montecarlo'
import { generateNarrative } from '../llm/narrative'
import { clamp } from './normalize'

function bfiBig5Direct(r: Responses) {
  const rev = (v: number) => 6 - v
  return {
    Extraversion:      (get(r,'A02') + rev(get(r,'A01',3))) / 2,
    Agreeableness:     (get(r,'A04') + rev(get(r,'A03',3))) / 2,
    Conscientiousness: (get(r,'A05') + rev(get(r,'A06',3))) / 2,
    Neuroticism:       (get(r,'A07') + rev(get(r,'A08',3))) / 2,
    Openness:          (get(r,'A09') + rev(get(r,'A10',3))) / 2,
  }
}

export async function runPredictionPipeline(responses: Responses) {
  const phq9 = calcPHQ9(responses)

  // Кризисный триггер
  if (phq9 >= 15) {
    return {
      crisis: true, events: [], narrative: '', summary: '',
      scenarios: [], scores: { PHQ9: phq9 },
      advice: [], strengths: [], risks: [],
      eventExplanations: {}, scenarioExplanations: {},
    }
  }

  const gad7   = calcGAD7(responses)
  const pss4   = calcPSS4(responses)
  const big5   = bfiBig5Direct(responses)
  const rho    = calcRho(responses)
  const { rSelf, rSelfWeighted } = calcRSelf(responses)
  const soc    = calcSoc(responses)
  const lsi    = calcLSI(responses)
  const blLambda = calcBLLambda(responses)

  const locusRaw = [get(responses,'A11'),get(responses,'A13')].reduce((a,b)=>a+b,0)
    - [get(responses,'A12'),get(responses,'A14')].reduce((a,b)=>a+b,0) + 10
  const selfEff = [get(responses,'A15'),get(responses,'A16'),get(responses,'A17')].reduce((a,b)=>a+b,0)

  const scores: Record<string, number> = {
    PHQ9: phq9,
    GAD7: gad7,
    PSS4: pss4,
    LSI:  lsi.LSI,
    Health:  lsi.Health,
    Finance: lsi.Finance,
    Work:    lsi.Work,
    Psyche:  lsi.Psyche,
    Social:  lsi.Social,
    Habits:  lsi.Habits,
    Soc:   soc,
    Rho:   rho,
    RSelf: rSelf,
    RSelfWeighted: rSelfWeighted,
    BLLambda: blLambda,
    PlanningRealism: rho,
    ...big5,
    LocusControl: locusRaw,
    SelfEfficacy: selfEff,
  }

  const eventProbs = calcEventProbabilities(responses, scores)
  const { scenarios, entropy, topEvents } = runSimulation(eventProbs, blLambda)

  // Составляем текстовые саммари для LLM
  const closeCircle = get(responses,'F01')
  const growing = get(responses,'F24')
  const socSummary = `Близкий круг: ${closeCircle} чел., из них растут ${growing}, социальный индекс ${Math.round(lsi.Social)}/100`

  const psycheSummary = `PHQ-9=${phq9} (${phq9<5?'норма':phq9<10?'лёгкая':phq9<15?'умеренная':'тяжёлая'}), GAD-7=${gad7}, стресс PSS-4=${pss4}, добросовестность ${big5.Conscientiousness.toFixed(1)}/5, нейротизм ${big5.Neuroticism.toFixed(1)}/5`

  const ethnicity = (responses['B24'] as string) || 'не указана'
  const country = (responses['B05'] as string) || 'не указана'
  const city = (responses['B06'] as string) || 'не указан'
  const contextSummary = `Страна: ${country}, город: ${city}, национальность: ${ethnicity}. Учти культурный контекст (темперамент, типичный размер круга, семейные ожидания) при интерпретации чисел — но не строй выводы только на национальности, это один из факторов.`

  const userExpectText = responses['D02'] as string ?? 'не указано'
  const userFreeNoteRaw = responses['G01']
  const userFreeNote = (typeof userFreeNoteRaw === 'string' ? userFreeNoteRaw : '').trim()

  const mismatches: string[] = []
  const userEvents = responses['D01'] as Array<{ label: string; probability: number }> | undefined
  if (userEvents) {
    for (const ue of userEvents) {
      const modelMatch = eventProbs.find(e =>
        e.label.toLowerCase().includes(ue.label.substring(0, 5).toLowerCase())
      )
      if (modelMatch) {
        const diff = Math.abs(clamp((ue.probability ?? 50) / 100, 0, 1) - modelMatch.probability)
        if (diff > 0.25) {
          mismatches.push(
            `«${ue.label}»: ты оцениваешь в ${ue.probability}%, модель — ${Math.round(modelMatch.probability*100)}%`
          )
        }
      }
    }
  }

  const narrativeResult = await generateNarrative({
    scores, topEvents, scenarios, entropy,
    userExpectations: userExpectText,
    socSummary, psycheSummary, mismatches,
    contextSummary,
    userFreeNote,
  })

  return {
    crisis: narrativeResult.crisis,
    events: eventProbs,
    narrative: narrativeResult.narrative,
    summary: narrativeResult.summary,
    scenarios,
    scores,
    advice: narrativeResult.advice,
    strengths: narrativeResult.strengths,
    risks: narrativeResult.risks,
    eventExplanations: narrativeResult.eventExplanations,
    scenarioExplanations: narrativeResult.scenarioExplanations,
  }
}
