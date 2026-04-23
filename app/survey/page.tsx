import Link from 'next/link'

export default function SurveyIntroPage() {
  return (
    <div>
      <p className="ui text-[13px] uppercase tracking-[0.14em] text-muted mb-5">
        Перед началом
      </p>
      <h1 className="font-serif text-[clamp(36px,5.5vw,52px)] font-medium leading-[1.08] tracking-[-0.01em] text-ink mb-10">
        Как устроен тест.
      </h1>

      <p className="text-[20px] leading-[1.55] text-muted mb-10 max-w-[620px]">
        Семь блоков вопросов. По вашим ответам модель посчитает вероятности
        15 событий следующего года, соберёт три сценария и сформирует
        персональные рекомендации.
      </p>

      {/* Blocks preview */}
      <ol className="border-t border-rule mb-12">
        {[
          ['A', 'Психологический портрет', 'Big Five, тревога, стресс, локус контроля', '~42 вопроса'],
          ['B', 'Текущее положение', 'Здоровье, финансы, работа, жильё, география', '~30 вопросов'],
          ['E', 'Привычки и режим', 'Сон, физ. активность, алкоголь, курение, питание', '~22 вопроса'],
          ['F', 'Социальное окружение', 'Близкий круг, 5 ближайших людей, одиночество', '~25 вопросов'],
          ['C', 'История прошлого года', 'Что случилось против того, что ожидалось', '~18 вопросов'],
          ['D', 'Ожидания на год', 'Ваши прогнозы для сравнения с моделью', '~12 вопросов'],
          ['G', 'Свободный контекст', 'Всё, что не уместилось в вопросы — опционально', '1 поле'],
        ].map(([letter, title, desc, count]) => (
          <li key={letter} className="grid grid-cols-[48px_1fr_auto] gap-5 items-baseline py-5 border-b border-rule">
            <span className="num text-[13px] text-muted">Блок {letter}</span>
            <span>
              <span className="block font-serif text-[18px] font-medium text-ink leading-[1.3]">{title}</span>
              <span className="ui text-[14px] text-muted leading-[1.5]">{desc}</span>
            </span>
            <span className="ui text-[12px] text-subtle num whitespace-nowrap">{count}</span>
          </li>
        ))}
      </ol>

      {/* How to */}
      <div className="mb-12">
        <h2 className="font-serif text-[24px] font-medium leading-[1.2] text-ink mb-6">
          Как это проходить.
        </h2>
        <ul className="flex flex-col gap-4">
          {[
            ['Отвечайте честно.', 'Модель работает ровно настолько, насколько точны ваши ответы. Встроенный калибровочный блок отлавливает систематические искажения самооценки.'],
            ['Не торопитесь.', 'На прохождение уходит 30–40 минут. Нет таймера, нет «правильных» ответов. Если не уверены — выбирайте ближайший вариант.'],
            ['Прогресс сохраняется сам.', 'После каждого блока ответы сохраняются локально в браузере. Можно закрыть вкладку и вернуться позже.'],
            ['Данные не продаются.', 'Ответы анонимизируются на этапе сохранения. Никакой рекламы, никакой продажи третьим лицам.'],
          ].map(([bold, rest]) => (
            <li key={bold} className="flex gap-4">
              <span className="w-[6px] h-[6px] rounded-full bg-accent mt-[12px] shrink-0" />
              <p className="text-[17px] leading-[1.65] text-text">
                <strong className="font-medium text-ink">{bold}</strong>{' '}
                <span className="text-muted">{rest}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Safety note */}
      <div className="border-l-2 border-accent pl-5 py-3 mb-14 bg-surface-deep">
        <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-2">
          Важно
        </p>
        <p className="text-[16px] text-text leading-[1.65]">
          Если ваши ответы покажут признаки острого кризисного состояния, тест
          остановится и предложит контакты психологической помощи. Прогноз в
          этом случае не выдаётся — сначала поддержка, потом диагностика.
        </p>
      </div>

      {/* CTA */}
      <div className="flex gap-3 flex-wrap">
        <Link
          href="/survey/a"
          className="ui inline-flex items-center gap-2 bg-ink text-bg px-8 py-4 text-[14px] font-medium hover:bg-accent transition-colors no-underline"
        >
          Начать первый блок →
        </Link>
        <Link
          href="/"
          className="ui inline-flex items-center gap-2 border-2 border-rule px-8 py-4 text-[14px] font-medium text-ink hover:border-ink transition-colors no-underline"
        >
          ← Назад
        </Link>
      </div>

      <p className="ui text-[13px] text-muted mt-5">
        Бесплатно · без регистрации · ~30–40 минут
      </p>
    </div>
  )
}
