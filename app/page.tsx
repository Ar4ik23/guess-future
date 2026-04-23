import Link from 'next/link'
import { TeaserTest } from '@/components/landing/TeaserTest'
import { FaqList } from '@/components/landing/FaqList'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* NAV */}
      <nav className="border-b border-rule">
        <div className="max-w-[1040px] mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          <Link href="/" className="ui text-[13px] font-medium text-ink hover:opacity-70 no-underline">
            Test Guringtona
          </Link>
          <span className="ui text-[13px] text-muted">Бесплатно · без регистрации</span>
        </div>
      </nav>

      <main id="top" className="flex-1">

        {/* HERO */}
        <section className="py-28">
          <div className="max-w-[720px] mx-auto px-6 md:px-8">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-7">
              Вероятностная диагностика · Лондонский университет
            </p>
            <h1 className="font-serif text-[clamp(48px,7vw,68px)] font-medium leading-[1.05] tracking-[-0.015em] text-ink">
              Будущее<br />
              не угадывают.<br />
              Его <em className="italic text-accent">вычисляют.</em>
            </h1>
            <p className="mt-8 text-[21px] leading-[1.5] text-text max-w-[580px]">
              Test Guringtona — 30–40-минутная диагностика, которая по 150+ параметрам
              строит персональный вероятностный прогноз следующих 12 месяцев: события,
              сценарии, опоры, риски и рекомендации.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/survey"
                className="ui inline-flex items-center gap-2 bg-ink text-bg px-8 py-4 text-[14px] font-medium hover:bg-accent transition-colors no-underline"
              >
                Пройти тест →
              </Link>
              <a
                href="#method"
                className="ui inline-flex items-center gap-2 border-2 border-rule px-8 py-4 text-[14px] font-medium text-ink hover:border-ink transition-colors no-underline"
              >
                Как это работает
              </a>
            </div>
            <p className="ui text-[13px] text-muted mt-5">
              Бесплатно. Без оплаты, без подписки, без продажи данных.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 mt-20 pt-10 border-t border-rule gap-y-8">
              {[
                ['150+', 'Параметров\nв анализе'],
                ['3', 'Сценария года — с честными\nдоверительными интервалами'],
                ['10 000', 'Монте-Карло прогонов\nна каждый результат'],
                ['30–40', 'Минут\nна прохождение'],
              ].map(([num, label], i) => (
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
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">Автор методики</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink mb-10">
              Артём Гурингтон. Двадцать семь лет между формулой и человеком.
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

            <p className="text-[20px] leading-[1.55] text-muted mb-6">
              Профессор UCL по прикладной теории вероятностей, лицензированный
              психолог со второй докторской степенью в когнитивной психологии.
            </p>
            <p className="text-[18px] leading-[1.7] text-text mb-5">
              В 2019-м на 14-м Европейском конгрессе прикладной вероятности в
              Праге представил «Individual Probabilistic Portrait» —
              байесовские модели на стыке клинической психометрики; через два
              года первая публичная версия теста была готова. Два PhD —
              теория вероятностей в Ягеллонском университете и когнитивная
              психология в UCL; десять лет во главе «Decision Latency Lab» в
              Варшавском университете, с 2021-го — кафедра в UCL. С 2003 года
              параллельно ведёт частную клиническую практику в Лондоне и
              Варшаве: 1 400+ часов с руководителями в кризисах стали
              источником параметров в ядре теста.
            </p>
            <p className="text-[18px] leading-[1.7] text-text">
              Идея простая: жизнь человека подчиняется тем же статистическим
              законам, что и любая сложная система, если корректно прописать
              входные параметры. Методику выложил в открытый доступ —
              инструмент принятия решений не должен быть привилегией тех, кто
              может за него заплатить.
            </p>

            <ul className="mt-12 border-t border-rule clear-both">
              {[
                ['2021 — н.в.', 'University College London', 'Профессор · кафедра теории вероятностей и прикладной психологии'],
                ['2014 — 2021', 'Uniwersytet Warszawski', 'Профессор · кафедра прикладной психологии · руководитель исследовательской группы «Decision Latency Lab»'],
                ['2010 — 2013', 'Ph.D. в когнитивной психологии · University College London', '«Аффективные искажения в долгосрочном планировании»'],
                ['2004 — 2010', 'Uniwersytet Warszawski', 'Adiunkt · курсы по прикладной статистике, психометрии и теории принятия решений'],
                ['1999 — 2003', 'Ph.D. в теории вероятностей · Uniwersytet Jagielloński', '«Стохастические оценки траекторий решений в условиях ограниченной информации»'],
                ['2003 — н.в.', 'Частная психологическая практика · Лондон, Варшава', 'Более 1 400 клинических часов с руководителями и экзекутивами в периоды кризисов'],
              ].map(([year, title, desc], i) => (
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
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">Метод</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink mb-10">
              Как 150 ответов превращаются в прогноз.
            </h2>
            <p className="text-[20px] leading-[1.55] text-muted mb-5">
              Методика объединяет шесть блоков данных — психологический портрет,
              текущее положение, привычки, окружение, историю прошлого года и ваши
              ожидания — и строит совместное распределение вероятностей для 15
              категорий жизненных событий.
            </p>
            <p className="text-[18px] leading-[1.7] text-text">
              На математическом уровне: нормализация по популяционным нормам
              (z-score, сигмоида), расчёт индексов LSI / Health / Finance / Work /
              Psyche / Social / Habits, 15 логистических моделей событий,
              Монте-Карло симуляция 10 000 прогонов — три сценария с
              вероятностями. Языковая модель GPT получает числовые индексы и
              формирует персональный нарратив, приоритеты и объяснения — не сырые
              ответы, только агрегированные данные.
            </p>
          </div>

          <div className="max-w-[1040px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-rule">
              {[
                ['Блок A', 'Психологический портрет', 'Big Five (BFI-10), PHQ-9, GAD-7, PSS-4, локус контроля, самоэффективность', '~42 вопроса'],
                ['Блок B', 'Текущее положение', 'Здоровье, финансы, работа, жильё, география, национальность', '~30 вопросов'],
                ['Блок E', 'Привычки и режим', 'Сон, физ. активность, AUDIT-C (алкоголь), курение, питание', '~22 вопроса'],
                ['Блок F', 'Социальное окружение', 'Близкий круг, карточки 5 ближайших, MSPSS-3, UCLA-3, отношения', '~25 вопросов'],
                ['Блок C', 'История прошлого года', 'Что случилось vs. что ожидалось — калибровка самоотчётности (r_self)', '~18 вопросов'],
                ['Блок D', 'Ожидания на год', 'Ваши прогнозы для сопоставления с модельными вероятностями (ρ)', '~12 вопросов'],
              ].map(([id, title, desc, count]) => (
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
                Ядро модели · упрощённая запись
              </div>
              <div className="font-serif italic text-[clamp(26px,3vw,38px)] leading-[1.35] text-ink mb-6">
                P(E<sub className="text-[0.55em] not-italic">i</sub> | X) =
                Σ<sub className="text-[0.55em] not-italic">k</sub> w<sub className="text-[0.55em] not-italic">k</sub> · ƒ<sub className="text-[0.55em] not-italic">k</sub>(x<sub className="text-[0.55em] not-italic">k</sub>, ρ)
              </div>
              <div className="num text-[12px] text-muted leading-[1.8] pt-5 border-t border-rule">
                P(E<sub>i</sub> | X) — вероятность события i в 12-месячном окне при портрете X.<br />
                w<sub>k</sub> — веса, выведенные на калибровочной выборке.<br />
                ƒ<sub>k</sub> — параметрические отклики по 150-мерному пространству X.
              </div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="why" className="py-28 border-t border-rule">
          <div className="max-w-[720px] mx-auto px-6 md:px-8 mb-12">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">Почему это работает</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink">
              Три причины, по которым прогноз оказывается точным.
            </h2>
          </div>
          <div className="max-w-[1040px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                ['I', 'Жизнь инерционна.',
                 '85% решений человека в следующие 12 месяцев определяются паттернами, которые он уже воспроизводит сегодня. Сон, привычки, круг общения, финансовые ритуалы — переменные с медленной динамикой. Модель экстраполирует не чудо, а инерцию.'],
                ['II', 'Валидированные шкалы.',
                 'Методика использует стандартные инструменты с известными популяционными нормами: PHQ-9, GAD-7, PSS-4, BFI-10, MSPSS, UCLA-3, AUDIT-C. Нормализация по z-score позволяет корректно сравнивать ваш профиль с референсными группами. Модели событий откалиброваны на агрегированных данных прохождений.'],
                ['III', 'ИИ даёт не прогноз, а сценарий выхода.',
                 'Языковая модель получает числовые индексы и агрегированные сводки — не сырые ответы — и формирует 4–6 приоритетных рекомендаций с опорой на конкретные шкалы. Каждый совет можно проверить против исходных цифр. Тест — не гадание, а инструмент управления.'],
              ].map(([num, title, body]) => (
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
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">Открытая методика</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink mb-10">
              Шкалы, логика и веса доступны для воспроизведения.
            </h2>
            <p className="text-[18px] leading-[1.7] text-text mb-10">
              Методика открыта: шкалы стандартные и общедоступные (PHQ-9, GAD-7,
              BFI-10, MSPSS, UCLA, AUDIT-C), логика расчёта индексов и Монте-Карло
              описана в документации. Любой исследователь может проверить, как
              числа превращаются в прогноз.
            </p>
            <blockquote className="font-serif italic text-[clamp(22px,2.8vw,30px)] leading-[1.35] text-ink border-l-2 border-accent pl-6 mb-4">
              Инструмент принятия решений не должен быть привилегией тех, кто
              может за него заплатить. Поэтому тест бесплатный — и останется
              таким.
            </blockquote>
            <p className="ui text-[13px] text-muted mb-12">— Prof. Artyom Gurington</p>

            <dl className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-rule">
              {[
                ['Шкалы', 'Стандартные психометрические инструменты с известными популяционными нормами'],
                ['Расчёт', 'Открытая документация · код доступен для воспроизведения'],
                ['Стоимость', '0 zł · без подписки · без продажи данных'],
              ].map(([k, v]) => (
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
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">Отзывы</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink">
              Что пишут прошедшие тест.
            </h2>
          </div>
          <div className="max-w-[1040px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-rule">
              {[
                ['«Ожидала абстрактную цифру — получила конкретные наблюдения о своих привычках, которые я раньше не связывала между собой. Три из пяти прогнозируемых событий реализовались. Четвёртое — после того, как проигнорировала предупреждение.»',
                 'Мария Д.', 'Варшава · участница программы'],
                ['«Впервые вижу прогностический инструмент, который честно говорит: вот неопределённость, вот откуда она. Доверительные интервалы настоящие, не декоративные. Это производит впечатление.»',
                 'Александр Р.', 'Краков · участник программы'],
                ['«Прошла тест весной. В отчёте была вероятность 0.71, что при сохранении текущего режима к осени наступит профессиональное выгорание. ИИ предложил три точечных изменения. Я сделала два. Осень прошла спокойно.»',
                 'Анна К.', 'Варшава · участница программы'],
                ['«Тест полезен именно тем, что не обещает судьбу. Он говорит: вот риск, вот его источник, вот что вы можете сделать. Это честная математика, применённая к жизни.»',
                 'Томас В.', 'Вроцлав · участник программы'],
              ].map(([quote, name, role], i) => (
                <div key={i} className="border-r border-b border-rule p-9 bg-bg flex flex-col gap-5">
                  <blockquote className="font-serif text-[18px] text-ink leading-[1.55] flex-1">{quote}</blockquote>
                  <div className="flex items-center gap-3 pt-5 border-t border-rule">
                    <div className="w-10 h-10 rounded-full bg-surface border border-rule flex items-center justify-center font-serif text-[13px] text-muted shrink-0">
                      {(name as string).split(' ').map(w => w[0]).join('').slice(0, 2)}
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
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">Образец отчёта</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink mb-8">
              Что вы получаете по итогам теста.
            </h2>
            <p className="text-[20px] leading-[1.55] text-muted mb-5">
              Страница результата с LSI-индексом, тремя сценариями, топ-10 событий
              с вероятностями, детальными индексами и раскрывающимся блоком
              рекомендаций от ИИ.
            </p>
            <p className="text-[18px] leading-[1.7] text-text">
              Для каждого события модель указывает вашу вероятность и главный
              параметр-триггер. Каждую цифру можно развернуть — будет объяснение,
              на каких именно индексах она построена.
            </p>
          </div>

          <div className="max-w-[1040px] mx-auto px-6 md:px-8">
            <div className="bg-surface-deep border border-rule p-6 md:p-10">
              {/* Report header */}
              <div className="flex flex-wrap justify-between items-center gap-5 pb-7 border-b border-rule mb-8">
                <div>
                  <div className="ui text-[12px] uppercase tracking-[0.14em] text-muted">
                    Прогноз · 12 месяцев
                  </div>
                  <div className="font-serif text-[22px] text-ink mt-1.5">
                    LSI: 62 / 100 — умеренная устойчивость
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="ui text-[12px] text-muted">LSI</div>
                    <div className="ui text-[12px] text-muted max-w-[120px] leading-[1.4]">Индекс общей устойчивости</div>
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

              {/* Scenarios */}
              <div className="mb-8 pb-8 border-b border-rule">
                <div className="ui text-[12px] uppercase tracking-[0.14em] text-muted mb-5">
                  Три сценария года · Монте-Карло 10 000 прогонов
                </div>
                {[
                  ['Оптимистический', 28, 'bg-positive'],
                  ['Базовый', 45, 'bg-accent'],
                  ['Пессимистический', 27, 'bg-risk'],
                ].map(([name, pct, cls]) => (
                  <div key={name as string} className="grid grid-cols-[160px_1fr_56px] gap-4 items-center mb-3">
                    <div className="ui text-[13px] text-ink">{name}</div>
                    <div className="h-[8px] bg-rule relative overflow-hidden">
                      <div className={`absolute inset-y-0 left-0 ${cls}`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="num text-[14px] text-right text-ink">{pct}%</div>
                  </div>
                ))}
              </div>

              {/* Events */}
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left ui text-[11px] uppercase tracking-[0.1em] text-muted pb-3 border-b border-rule font-normal">Событие</th>
                    <th className="pb-3 border-b border-rule pl-4" />
                    <th className="text-right ui text-[11px] uppercase tracking-[0.1em] text-muted pb-3 border-b border-rule font-normal">P</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Значимое повышение или смена роли', 68, 'positive'],
                    ['Эпизод выгорания при текущем режиме', 54, 'risk'],
                    ['Укрепление близкого круга', 41, 'positive'],
                    ['Финансовая стабилизация', 35, 'neutral'],
                    ['Географическая релокация > 300 км', 14, 'neutral'],
                  ].map(([label, pct, kind]) => {
                    const colorCls = kind === 'positive' ? 'bg-positive' : kind === 'risk' ? 'bg-risk' : 'bg-muted'
                    const textCls = kind === 'positive' ? 'text-positive' : kind === 'risk' ? 'text-risk' : 'text-muted'
                    return (
                      <tr key={label as string} className="border-b border-rule last:border-b-0">
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

              {/* Note */}
              <div className="mt-7 p-5 bg-bg border-l-2 border-accent">
                <div className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-2 font-medium">
                  Рекомендация ИИ · триггер выгорания (PSS-4 + GAD-7)
                </div>
                <div className="ui text-[14px] text-text leading-[1.7]">
                  Главный параметр риска — высокий воспринимаемый стресс при
                  низком индексе Habits. Смещение на «работа блоками 90/20»
                  снижает P-выгорания с 54% до ~22% за 11 недель по модельной
                  оценке.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEASER */}
        <section id="teaser" className="py-28 border-t border-rule bg-surface-deep">
          <div className="max-w-[720px] mx-auto px-6 md:px-8 mb-10">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">Мини-диагностика</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink">
              Три вопроса — чтобы почувствовать, как это работает.
            </h2>
          </div>
          <div className="max-w-[720px] mx-auto px-6 md:px-8">
            <TeaserTest />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-28 border-t border-rule">
          <div className="max-w-[720px] mx-auto px-6 md:px-8">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-3">Вопросы</p>
            <h2 className="font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.15] text-ink">
              Что спрашивают чаще всего.
            </h2>
            <FaqList />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 border-t border-rule text-center">
          <div className="max-w-[720px] mx-auto px-6 md:px-8">
            <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-5">
              Начните сейчас
            </p>
            <h2 className="font-serif text-[clamp(40px,6vw,64px)] font-medium leading-[1.02] tracking-[-0.015em] text-ink mb-6 max-w-[14ch] mx-auto">
              Следующие 12 месяцев <em className="italic text-accent">уже считаются</em>.
            </h2>
            <p className="text-[18px] text-muted max-w-[460px] mx-auto mb-10 leading-[1.55]">
              30–40 минут вашего времени — и вы получаете персональный
              вероятностный прогноз года. Без оплаты. Без подписки. Без продажи
              данных.
            </p>
            <Link
              href="/survey"
              className="ui inline-flex items-center gap-2 bg-ink text-bg px-10 py-5 text-[14px] font-medium hover:bg-accent transition-colors no-underline"
            >
              Пройти Test Guringtona — бесплатно →
            </Link>
            <p className="ui text-[13px] text-muted mt-5">
              Без регистрации · открытая методика · данные не продаются
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-rule py-10">
        <div className="max-w-[1040px] mx-auto px-6 md:px-8 flex flex-wrap justify-between items-center gap-3 ui text-[12px] text-muted">
          <span>© MMXXVI · Prof. A. Gurington · University College London</span>
          <span>office@gurington.ac.uk</span>
          <span>Открытая методика · данные не продаются</span>
        </div>
      </footer>
    </div>
  )
}
