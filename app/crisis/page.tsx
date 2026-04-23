import Link from 'next/link'

export default function CrisisPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-[560px] w-full">
        <p className="ui text-[11px] uppercase tracking-[0.14em] text-risk mb-5">
          Прогноз не формируется
        </p>
        <h1 className="font-serif text-[clamp(32px,4.5vw,42px)] font-medium leading-[1.1] tracking-[-0.01em] mb-6">
          Сейчас важнее поддержка, а не прогноз.
        </h1>
        <p className="text-[18px] text-text leading-[1.6] mb-10">
          Судя по вашим ответам, прямо сейчас вам может быть очень тяжело.
          Прежде чем смотреть прогноз на год — пожалуйста, свяжитесь с тем,
          кто может помочь. Вы не одни.
        </p>

        <div className="border-t border-b border-rule py-6 mb-10">
          <p className="ui text-[11px] uppercase tracking-[0.14em] text-muted mb-4">
            Телефоны доверия · бесплатно, 24/7
          </p>
          <dl className="flex flex-col gap-3">
            {[
              ['Россия', '8-800-2000-122'],
              ['Украина', '7333'],
              ['Международный', 'findahelpline.com'],
            ].map(([country, num]) => (
              <div key={country} className="flex items-baseline justify-between gap-4">
                <dt className="font-serif text-[16px] text-text">{country}</dt>
                <dd className="num text-[16px] text-text">{num}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Link
            href="/"
            className="ui inline-flex items-center gap-2 bg-text text-bg px-7 py-3.5 text-[14px] font-medium hover:bg-accent transition-colors"
          >
            Вернуться на главную
          </Link>
          <Link
            href="/survey"
            className="ui inline-flex items-center gap-2 border border-rule px-7 py-3.5 text-[14px] font-medium text-text hover:border-text transition-colors no-underline"
          >
            Пройти опрос заново
          </Link>
        </div>

        <p className="ui text-[13px] text-muted mt-8 leading-[1.7]">
          Ваши данные не сохраняются без разрешения. Конфиденциальность защищена.
        </p>
      </div>
    </div>
  )
}
