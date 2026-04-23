export interface QTrans {
  text: string
  hint?: string
  options?: string[]
  unit?: string
}

const PHQ_OPTS = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
const PSS_OPTS = ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often']
const UCLA_OPTS = ['Never', 'Rarely', 'Sometimes', 'Often']

export const questionTranslationsEn: Record<string, QTrans> = {
  // ── Block A: BFI-10 ──
  A01: { text: 'I am reserved and quiet', hint: 'How well does this describe you? (1 — not at all, 5 — completely)' },
  A02: { text: 'I am outgoing and sociable' },
  A03: { text: 'I tend to find fault with others' },
  A04: { text: 'I am generally trusting and helpful' },
  A05: { text: 'I do a thorough job and see tasks through to completion' },
  A06: { text: 'I tend to be lazy and put things off' },
  A07: { text: 'I get nervous easily and worry a lot' },
  A08: { text: 'I am emotionally stable and hard to upset' },
  A09: { text: 'I have an active imagination and enjoy trying new things' },
  A10: { text: 'I have little interest in abstract ideas and reflection' },

  // ── Block A: Locus of Control ──
  A11: { text: 'My successes are mainly the result of my own efforts' },
  A12: { text: 'Most events in my life are beyond my control' },
  A13: { text: 'If I really want something, I can achieve almost any goal' },
  A14: { text: 'Life is controlled by circumstances, not by me' },

  // ── Block A: Self-Efficacy ──
  A15: { text: 'I can solve most problems if I put in enough effort' },
  A16: { text: 'When I face difficulties, I find ways to overcome them' },
  A17: { text: 'I can handle unexpected situations with confidence' },

  // ── Block A: PHQ-9 ──
  A18: { text: 'Over the last 2 weeks, how often have you had little interest or pleasure in doing things?', hint: 'Choose how often this has bothered you', options: PHQ_OPTS },
  A19: { text: 'How often have you felt down, depressed, or hopeless?', options: PHQ_OPTS },
  A20: { text: 'How often have you had trouble falling or staying asleep, or sleeping too much?', options: PHQ_OPTS },
  A21: { text: 'How often have you felt tired or had little energy?', options: PHQ_OPTS },
  A22: { text: 'How often have you had poor appetite or been overeating?', options: PHQ_OPTS },
  A23: { text: 'How often have you felt bad about yourself — or that you are a failure or have let yourself or your family down?', options: PHQ_OPTS },
  A24: { text: 'How often have you had trouble concentrating on things, such as reading or watching TV?', options: PHQ_OPTS },
  A25: { text: 'How often have you been moving or speaking so slowly that others noticed? Or the opposite — being so restless you couldn\'t sit still?', options: PHQ_OPTS },
  A26: { text: 'How often have you had thoughts that you would be better off dead or of hurting yourself?', options: PHQ_OPTS },

  // ── Block A: GAD-7 ──
  A27: { text: 'Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?', hint: 'Choose how often', options: PHQ_OPTS },
  A28: { text: 'How often have you been unable to stop or control worrying?', options: PHQ_OPTS },
  A29: { text: 'How often have you been worrying too much about different things?', options: PHQ_OPTS },
  A30: { text: 'How often have you had trouble relaxing?', options: PHQ_OPTS },
  A31: { text: 'How often have you been so restless that it was hard to sit still?', options: PHQ_OPTS },
  A32: { text: 'How often have you become easily annoyed or irritable?', options: PHQ_OPTS },
  A33: { text: 'How often have you felt afraid, as if something awful might happen?', options: PHQ_OPTS },

  // ── Block A: PSS-4 ──
  A34: { text: 'In the last month, how often have you felt that you were unable to control the important things in your life?', options: PSS_OPTS },
  A35: { text: 'How often have you felt confident about your ability to handle your personal problems?', options: PSS_OPTS },
  A36: { text: 'How often have you felt that things were going your way?', options: PSS_OPTS },
  A37: { text: 'How often have you felt difficulties were piling up so high that you could not overcome them?', options: PSS_OPTS },

  // ── Block A: UCLA-3 ──
  A38: { text: 'How often do you feel that you lack companionship?', options: UCLA_OPTS },
  A39: { text: 'How often do you feel left out or cut off from others?', options: UCLA_OPTS },
  A40: { text: 'How often do you feel isolated from other people?', options: UCLA_OPTS },

  // ── Block A: Sleep ──
  A41: { text: 'How many hours do you sleep on average per night?', unit: 'hours' },
  A42: { text: 'How consistent is your bedtime?', options: ['Very inconsistent', 'Inconsistent', 'Sometimes', 'Consistent', 'Very consistent'] },
  A43: { text: 'What is your average energy level during the day?', hint: '1 — constantly exhausted, 10 — always full of energy' },

  // ── Block A: AUDIT-C ──
  A44: { text: 'How often do you have a drink containing alcohol?', options: ['Never', 'Monthly or less', '2–4 times a month', '2–3 times a week', '4+ times a week'] },
  A45: { text: 'How many standard drinks do you have on a typical drinking day?', hint: '1 standard drink ≈ 1 oz spirits OR 4 oz wine OR 8 oz beer (half a can)', options: ['1–2 drinks', '3–4 drinks', '5–6 drinks', '7–9 drinks', '10 or more'] },
  A46: { text: 'How often do you have 6 or more drinks on one occasion?', hint: '6 drinks ≈ a bottle of wine OR 3 cans of beer OR 6 oz spirits', options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily'] },
  A47: { text: 'How many cigarettes do you smoke per day?', hint: 'Put 0 if you don\'t smoke' },
  A48: { text: 'Do you use any other substances?', options: ['No', 'Cannabis (occasionally)', 'Cannabis (regularly)', 'Other substances (occasionally)', 'Other substances (regularly)'] },

  // ── Block A: Overconfidence ──
  A49: { text: 'What year was Albert Einstein born?', hint: 'Give your best estimate and a 90% confidence interval — the range you\'re 90% sure contains the right answer.' },
  A50: { text: 'What is the distance from Earth to the Moon (in kilometers)?', hint: 'Approximate answer + 90% confidence interval' },
  A51: { text: 'What is the population of Australia (in millions)?', hint: 'Approximate answer + 90% confidence interval' },
  A52: { text: 'What year was the telephone invented?', hint: 'Your estimate + 90% confidence interval' },
  A53: { text: 'What is the length of the Nile River (in kilometers)?', hint: 'Approximate answer + 90% confidence interval' },

  // ── Block A: Planning Fallacy ──
  A54: { text: 'When you set yourself deadlines, you typically...', options: ['Finish ahead of schedule', 'Finish on time', 'Finish slightly late', 'Finish significantly late'] },
  A55: { text: 'How many times longer does completing tasks usually take compared to what you planned?', options: ['Less (I overestimate time)', 'About as planned', '1.5× longer', '2× longer', '3× or more'] },

  // ── Block B ──
  B01: { text: 'How old are you?' },
  B02: { text: 'Your gender', options: ['Male', 'Female', 'Other / prefer not to say'] },
  B03: { text: 'Your height' },
  B04: { text: 'Your weight' },
  B05: { text: 'Country of residence' },
  B06: { text: 'City' },
  B24: { text: 'Your nationality / ethnic background', hint: 'Used to account for cultural context — temperament, typical circle size, family traditions.' },
  B07: { text: 'Relationship status', options: ['Single', 'In a relationship', 'Married', 'Divorced', 'Widowed'] },
  B08: { text: 'How many children do you have?' },
  B09: { text: 'Chronic conditions', options: ['None', 'Cardiovascular', 'Diabetes', 'Joint / spine issues', 'Mental health (diagnosed)', 'Cancer / oncology', 'Other'] },
  B10: { text: 'How would you rate your health right now?' },
  B11: { text: 'Physical activity — hours per week (sport, walks, workouts)', unit: 'hrs/week' },
  B12: { text: 'Education level', options: ['Some high school', 'High school', 'Vocational / technical', 'Some college / university', "Bachelor's degree", "Master's / specialist", 'PhD / doctoral'] },
  B13: { text: 'Current employment', options: ['Full-time employee', 'Part-time employee', 'Freelancer', 'Entrepreneur / self-employed', 'Student (full-time)', 'Parental leave', 'Unemployed', 'Retired'] },
  B14: { text: 'Industry / field of work', hint: 'If not working — write "none" or leave blank' },
  B15: { text: 'How many years in your current position?', hint: 'Put 0 if not working or less than a year' },
  B16: { text: 'Monthly income (after taxes, in local currency)', hint: 'Put 0 if no income' },
  B17: { text: 'Monthly expenses (in local currency)', hint: 'Approximate amount you spend on living per month' },
  B18: { text: 'How many months of expenses are covered by your savings? (emergency fund)', hint: 'Put 0 if no savings. 3 = you can live 3 months without income.', unit: 'months' },
  B19: { text: 'Debt situation', options: ['No debts', 'Have a mortgage', 'Have consumer loans', 'Both mortgage and loans', 'Have overdue debts'] },
  B20: { text: 'Housing', options: ['Own (no mortgage)', 'Own (with mortgage)', 'Renting', 'With parents', 'Other'] },
  B21: { text: 'Satisfaction with work / main occupation' },
  B22: { text: 'Current level of burnout', hint: '1 — none at all, 10 — complete burnout' },
  B23: { text: 'Subjective risk of losing your job/income in the next 12 months', hint: '1 — no risk, 10 — very high risk' },

  // ── Block C ──
  C01: { text: 'List 3–5 main goals you set for the past year. For each, specify: what you planned, how confident you were (0–100%), and what actually happened.', hint: 'Be honest — this helps calibrate your goals for the coming year' },
  C02: { text: 'Overall, the past year turned out...', options: ['Much worse than expected', 'Worse than expected', 'About as expected', 'Better than expected', 'Much better than expected'] },
  C03: { text: 'Were there any unexpected events last year that you didn\'t anticipate? Describe briefly.', hint: 'Both positive and negative' },

  // ── Block D ──
  D01: { text: 'List up to 5 specific events you think will happen in the next 12 months. For each, specify your subjective probability and how you feel about it.', hint: 'Specific events: job change, relocation, relationship, project, etc.' },
  D02: { text: 'Describe in 2–3 sentences how you think this year will go overall.' },
  D03: { text: 'What is the worst realistic scenario for you this year?', hint: 'Not catastrophic — a realistic bad outcome' },
  D04: { text: 'What is the best realistic scenario for you this year?' },
  D05: { text: 'What is the most likely (base) scenario?' },

  // ── Block E ──
  E01: { text: 'What time do you usually wake up on weekdays?', options: ['Before 6:00', '6:00–7:00', '7:00–8:00', '8:00–9:00', '9:00–10:00', 'After 10:00'] },
  E02: { text: 'How consistent is your wake-up time?', options: ['Very inconsistent', 'Inconsistent', 'Sometimes', 'Consistent', 'Very consistent'] },
  E03: { text: 'How many times per week do you cook at home?', unit: 'times/week' },
  E04: { text: 'Total screen time per day (phone + computer)', unit: 'hours' },
  E05: { text: 'Of that — time spent on social media', unit: 'hours' },
  E06: { text: 'Main type of content you consume online', options: ['News', 'Education / learning', 'Entertainment (video, games)', 'Social communication', 'Work', 'Adult content'] },
  E07: { text: 'When was your last vacation (at least 3 days off work)?', options: ['Less than a month ago', '1–3 months ago', '3–6 months ago', '6–12 months ago', 'More than a year ago', "Don't remember"] },
  E08: { text: 'How many new people did you meet last month?' },
  E09: { text: 'Do you have regular "anchors" — professionals you see consistently?', options: ['Therapist / psychologist', 'Mentor / coach', 'Personal trainer', 'Doctor (regular check-ups)', 'Financial advisor', 'None of the above'] },
  E10: { text: 'How many meetings / events do you have in your calendar for the next 2 weeks?', hint: 'Any scheduled activities: meetings, workouts, calls, etc.' },
  E11: { text: 'When did you last cry?', options: ['Today or yesterday', 'This week', 'This month', 'A few months ago', "Don't remember / very long ago"] },
  E12: { text: 'When did you last laugh wholeheartedly (to tears or stomach hurting)?', options: ['Today or yesterday', 'This week', 'This month', 'A few months ago', "Don't remember / very long ago"] },

  // ── Block F ──
  F01: { text: 'How many people are in your innermost circle (those you fully trust)?', hint: 'Put 0 if there are none' },
  F02: { text: 'How many people are in your broader circle? (friends you see at least once a quarter)', hint: 'Put 0 if none' },
  F04: { text: 'How many of your close circle live in the same city as you?', hint: 'Put 0 if none' },
  F05: { text: 'How many friends have you known for more than 5 years?', hint: 'Put 0 if none' },
  F06: { text: 'How many friends have you known for more than 10 years?', hint: 'Put 0 if none' },
  F07: { text: 'How often do you meet friends in person (not calls/chats)?', options: ['Almost never', 'Once a month or less', '1–2 times a week', '3+ times a week', 'Almost every day'] },
  F08: { text: 'Is there someone you could call at 3 am in a crisis — and they would pick up?', options: ['Yes', 'No'] },
  F11: { text: 'My family really helps and supports me', hint: '1 — strongly disagree, 7 — strongly agree' },
  F15: { text: 'I can count on my friends when things go wrong' },
  F13: { text: 'There is a special person who is a real source of comfort to me', hint: 'Partner, close friend — one particular person' },
  F21: { text: 'Level of conflict in your close circle', hint: '1 — no conflicts, 10 — constant tension' },
  F22: { text: 'In relationships of mutual help, you usually...', options: ['I help more', 'About equal', 'Others help me more'] },
  F23: { text: 'Average education level of your close circle', options: ['High school or less', 'Vocational / technical', "University / bachelor's", 'Several people with graduate degrees'] },
  F24: { text: 'How many of your close circle are clearly growing (career, projects, income)?', hint: 'Put 0 if none' },
  F25: { text: 'How many of your close circle are stagnating (nothing changes year after year)?', hint: 'Put 0 if none' },
  F26: { text: 'How many of your close circle are declining (addictions, debt, legal problems)?', hint: 'Put 0 if none' },
  F28: { text: 'Tell me about your 5 closest people (or fewer, if that\'s all you have).', hint: 'Fill in a card for each person. If you have no close people — skip this section.' },
  F29: { text: 'Relationship with your mother', hint: '1 — very poor / no contact, 10 — excellent' },
  F30: { text: 'Is your mother alive?', options: ['Yes', 'No'] },
  F31: { text: "Mother's health (if alive)", options: ['Healthy', 'Some health problems', 'Serious illness', 'Not applicable'] },
  F32: { text: 'Financially, your mother is...', options: ['Financially independent', 'Partially depends on me', 'Fully depends on me', 'Not applicable'] },
  F33: { text: 'Relationship with your father', hint: '1 — very poor / no contact, 10 — excellent' },
  F34: { text: 'Is your father alive?', options: ['Yes', 'No'] },
  F35: { text: "Father's health (if alive)", options: ['Healthy', 'Some health problems', 'Serious illness', 'Not applicable'] },
  F36: { text: 'Financially, your father is...', options: ['Financially independent', 'Partially depends on me', 'Fully depends on me', 'Not applicable'] },
  F39: { text: 'Are there recurring patterns in your family?', options: ['Divorces', 'Addictions', 'Mental health issues', 'Early deaths (before 60)', 'Domestic violence', 'None of the above'] },
  F40: { text: 'Financially, you are currently...', options: ['Supporting my parents', 'Independent from parents', 'Partially dependent on parents', 'Fully dependent on parents'] },
  F41: { text: 'What is your current romantic relationship status?', hint: 'If you choose "Not in a relationship" — the next relationship questions can be skipped', options: ['Not in a relationship', 'Dating / casual', 'Relationship under 1 year', 'Relationship 1–3 years', 'Relationship over 3 years', 'Married'] },
  F42: { text: 'Satisfaction with your current relationship', hint: 'If not in a relationship — put 5 (neutral)' },
  F43: { text: 'How aligned are your plans for the coming year?', hint: 'If not in a relationship — skip (any answer)', options: ['Not aligned at all', 'Slightly', 'Partially', 'Mostly', 'Fully'] },
  F45: { text: 'Do you share a living space (live together)?', options: ['Yes', 'No', 'Partially', 'Not applicable'] },
  F47: { text: 'Relationship with your direct manager', hint: 'Skip (put 5) if you have no manager' },
  F48: { text: 'Do you have a mentor or senior colleague you turn to for advice?', options: ['Yes', 'No'] },
  F49: { text: 'Toxicity level of your work environment', hint: '1 — not toxic at all, 10 — unbearable. Skip (put 1) if not working.' },
  F50: { text: 'How many colleagues could you approach with a personal problem?', hint: 'Put 0 if none or not working' },
  F51: { text: 'Is there someone in your close circle who is seriously ill or elderly without adequate care?', options: ['Yes', 'No'] },
  F52: { text: 'Are there escalating conflicts (legal, property, inheritance)?', options: ['Yes', 'No'] },
  F53: { text: 'How many people in your circle have an addiction that could worsen?', hint: 'Put 0 if none' },
  F54: { text: 'Do you have financial obligations for others (co-signer, guarantor)?', options: ['Yes', 'No'] },
  F55: { text: 'How many close people live in unstable countries / regions?', hint: 'Put 0 if none' },

  // ── Block G ──
  G01: { text: 'What else should we know about you?', hint: 'Any context that didn\'t fit the questions: circumstances, plans, external factors, relationships, health, fears, ambitions. The model will factor this into its analysis. You can leave this blank.' },
}
