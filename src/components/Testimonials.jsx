import { useEffect, useRef, useState, useCallback } from 'react'

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

const TESTIMONIALS = [
  {
    name: 'Моника М.',
    initials: 'ММ',
    color: 'bg-green-50 text-green-800',
    text: '☀️🍀 Иглика е много мъдра, спокойна и с голямо сърце 💝. Научи ме на търпение. Нека част от доброто, което дава на света, да бъде за нея!',
  },
  {
    name: 'Биляна М.',
    initials: 'БМ',
    color: 'bg-gold-50 text-gold-800',
    text: 'Изключителен човек с голямо Ч! Винаги в услуга на другия, много успешна! Прекрасен човек! Винаги, когато имам нужда от съвет за Форевър или нещо лично - тя е на среща!',
  },
  {
    name: 'Диана Л.',
    initials: 'ДЛ',
    color: 'bg-orange-50 text-orange-800',
    text: 'Консултациите с Иглика са ми много ценни. Винаги подхожда индивидуално към човека и неговия проблем. Спокойна съм, че каквото и да я попитам на здравна тема, ми обяснява разбираемо и отговаря на всички въпроси, както за продуктите на Форевър, така и извън тях. Много ме впечатли от лично мое здравословно неразположение, че на първо място е здравето на човека и неговото благоразположение и после са всички програми и продукти за лечение. Само да имаш уши да слушаш.',
  },
  {
    name: 'Галина К.',
    initials: 'ГК',
    color: 'bg-green-50 text-green-800',
    text: 'Иглика е човек с голямо сърце 💓. Вдъхновяваща,  отзивчива, подкрепяща. Човек, който искрено се вълнува от моите успехи. Човек който ме зарежа с позитивна енергия. ✴️',
  },
  {
    name: 'Искра П.',
    initials: 'ИП',
    color: 'bg-gold-50 text-gold-800',
    text: 'Игличе, ти си слънце, огряваш пътищата ни, без теб Форевър няма да е това, което е! Благодаря! ❤️🦋☀️',
  },
  {
    name: 'Петя М.',
    initials: 'ПМ',
    color: 'bg-orange-50 text-orange-800',
    text: 'Иглика е човека, който години наред е била до мен като семеен консултант и ми е помагала в трудни моменти при боледуване на моите деца и с конкретни насоки и с  безрезервното си приятелство! 🙏❤️ По -късно стана мой ментор и отново беше до мен, когато реших да поема нов път в живота си като партньор на Форевър! Благодаря ти от сърце, Игличе, за цялата обич и подкрепа, които продължаваш да даряваш! ❤️😘',
  },
  {
    name: 'Галина Д.',
    initials: 'ГД',
    color: 'bg-green-50 text-green-800',
    text: 'С усмивка, много знания и топло отношение към всички Иглика винаги е насреща. Помага  съветва и раздава  любов! ❤️',
  },
  {
    name: 'Марина',
    initials: 'М',
    color: 'bg-gold-50 text-gold-800',
    text: 'Иглика е човек, който те завладява, ограмотява и озарява. Благодаря ти, Иглика!!!',
  },
  {
    name: 'Елиза З.',
    initials: 'ЕЗ',
    color: 'bg-orange-50 text-orange-800',
    text: 'Игличе, твоето добро сърце е като слънце - стопля и озарява всички, които имат щастието да те познават.',
  },
  {
    name: 'Дари',
    initials: 'Д',
    color: 'bg-gold-50 text-gold-800',
    text: 'Иглика е уникален човек, винаги усмихната, знаеща, споделяща и вдъхновяваща! Благодарна съм че я познавам и мога да се уча от нея, не само за Форевър, но и затова какво трябва да е отношението ни към хората!',
  },
    {
    name: 'Калинка Ценева',
    initials: 'КЦ',
    color: 'bg-gold-50 text-gold-800',
    text: 'Игличе, ти си образец за поддържание със своята доброта, тактичност, сърдечно отношение, лъчезарност и знания, които щедро споделяш! Ментор, който ме зарежда с вдъхновение и положителна енергия! Винаги готова да се отзове и да помогне!! Благодарна съм, че те познавам!',
  },
  {
    name: 'Марияна Николова',
    initials: 'МН',
    color: 'bg-gold-50 text-gold-800',
    text: 'За мен Иглика е вдъхновение, грижа и внимание! Но преди всичко тя е Добър човек!💗 Щастлива съм, че съм част от този екип! Най добрите!💗 Форевър ми даде възможност да се грижа за себе си и семейството си с  качествени и натурални продукти, а това е безценно!🙂',
  },
    {
    name: 'Даниела Николова',
    initials: 'ДН',
    color: 'bg-gold-50 text-gold-800',
    text: 'Много неща мога да споделя, но накратко и от мен:🥰 Изпитвам огромна благодарност за съветите, които винаги ми е давала. Аз и семейството ми имаме изключително големи подобрения в здравословен план от информацията, която винаги дава в различни области.💖',
  },
    {
    name: 'Жанет Карапчанска',
    initials: 'ЖК',
    color: 'bg-gold-50 text-gold-800',
    text: 'Игличето променя Вселената в едно по топло място за живот и ме учи как да помагам на другите преди всичко! 😊',
  },
    {
    name: 'Василка Иванова',
    initials: 'ВИ',
    color: 'bg-gold-50 text-gold-800',
    text: 'Игличе, ти си магьосница - знаеща жена, твоята усмивка сгрява всички около теб ☀️',
  },
   {
    name: 'Петя Бонева',
    initials: 'ПБ',
    color: 'bg-gold-50 text-gold-800',
    text: 'Иглика… както обичам да я наричам — нашата фея 🌟 Тя сякаш се появява навсякъде, където има нужда от чудо - за да го превърне в такова. Да се появи точно навреме, да вдигне телефона, когато усеща, че имаш нужда, да те накара да се почувстваш значим, дори когато самият ти не вярваш в себе си. Да ти се усмихне и да ти стане едно вълшебно…Добри професионалисти има много, но хора, които творят чудеса като нея - истинска рядкост.Обичам я тази наша фея и благодаря, че я познавам🙏',
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 от 5 звезди">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#D4A017" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div className="bg-white border border-neutral-100 rounded-2xl p-5 h-full flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center
                           font-sans font-semibold text-[12px] flex-shrink-0 ${t.color}`}>
            {t.initials}
          </div>
          <p className="font-sans font-semibold text-[13px] text-neutral-800 leading-none">
            {t.name}
          </p>
        </div>
        <StarRating />
      </div>
      <div className="h-px bg-neutral-50" />
      <blockquote className="font-serif italic text-[13px] text-neutral-600 leading-[1.75] flex-1">
        „{t.text}"
      </blockquote>
    </div>
  )
}

// Колко карти да се виждат едновременно спрямо ширината
function useVisibleCount() {
  const [count, setCount] = useState(3)
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640)      setCount(1)
      else if (window.innerWidth < 1024) setCount(2)
      else                               setCount(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return count
}

export default function Testimonials() {
  const [sectionRef, inView] = useInView()
  const [current, setCurrent]       = useState(0)
  const [paused,  setPaused]        = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd,   setTouchEnd]   = useState(null)
  const visibleCount = useVisibleCount()
  const total = TESTIMONIALS.length
  const maxIndex = total - visibleCount

  const next = useCallback(() => setCurrent(c => c >= maxIndex ? 0 : c + 1), [maxIndex])
  const prev = useCallback(() => setCurrent(c => c <= 0 ? maxIndex : c - 1), [maxIndex])

  // Авто-върти на всеки 4 секунди
  useEffect(() => {
    if (paused || !inView) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [paused, inView, next])

  // Ресет при промяна на visibleCount
  useEffect(() => { setCurrent(0) }, [visibleCount])

  const cardWidth = 100 / visibleCount

  // Swipe с пръст на мобилно
  const minSwipeDistance = 50

  function onTouchStart(e) {
    setPaused(true)
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  function onTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  function onTouchEnd() {
    setPaused(false)
    if (touchStart === null || touchEnd === null) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) next()
    if (distance < -minSwipeDistance) prev()
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <section
      id="otziви"
      ref={sectionRef}
      className="bg-[#FAFAF7] py-20 sm:py-28 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8 relative">

         <div
    aria-hidden="true"
    className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full
               bg-orange-100 opacity-60 pointer-events-none"
  />
  <div
    aria-hidden="true"
    className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full
               bg-green-50 opacity-70 pointer-events-none"
  />

        {/* Хедър */}
        <div className={[
          'text-center mb-12 transition-all duration-700 ease-out relative',
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}>
          <p className="eyebrow text-orange-600 mb-4 flex items-center justify-center gap-2">
            <span className="inline-block w-6 h-px bg-orange-400" aria-hidden="true" />
            Истории от реалния живот
            <span className="inline-block w-6 h-px bg-orange-400" aria-hidden="true" />
          </p>
          <h2
            id="testimonials-heading"
            className="font-serif font-semibold text-green-900
                       text-[1.9rem] sm:text-[2.25rem] leading-[1.25] mb-4"
          >
            Гласовете на нашата общност
          </h2>
          <p className="font-sans text-[14.5px] text-neutral-500 max-w-[40ch] mx-auto leading-[1.75]">
            Споделено от хора, на които имам честта да бъда ментор и приятел.
          </p>
        </div>

        {/* Слайдер */}
        <div
          className={[
            'transition-all duration-700 ease-out',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Карти */}
          <div
            className="overflow-hidden touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * cardWidth}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name + i}
                  className="flex-shrink-0 px-2.5"
                  style={{ width: `${cardWidth}%` }}
                >
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <div className="flex items-center justify-between mt-8">

            {/* Точки */}
            <div className="flex gap-1.5" role="tablist" aria-label="Отзиви навигация">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Отзив ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={[
                    'rounded-full transition-all duration-300',
                    i === current
                      ? 'w-6 h-2 bg-green-600'
                      : 'w-2 h-2 bg-neutral-300 hover:bg-green-600',
                  ].join(' ')}
                />
              ))}
            </div>

            {/* Стрелки */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Предишен отзив"
                className="w-9 h-9 rounded-full border border-neutral-200
                           flex items-center justify-center
                           text-neutral-500 hover:border-green-600 hover:text-green-700
                           transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 4l-4 4 4 4"/>
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Следващ отзив"
                className="w-9 h-9 rounded-full border border-neutral-200
                           flex items-center justify-center
                           text-neutral-500 hover:border-green-600 hover:text-green-700
                           transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 4l4 4-4 4"/>
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Trust числа */}
        <div className={[
          'mt-14 flex flex-wrap items-center justify-center gap-8',
          'transition-all duration-700 ease-out delay-300',
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}>
          {[
            { num: '500+', label: 'доволни клиенти' },
            { num: '150+', label: 'активни партньори' },
            { num: '10+',  label: 'години опит' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-serif font-semibold text-[2rem] text-green-800 leading-none mb-1">
                {num}
              </p>
              <p className="font-sans text-[12px] text-neutral-400 uppercase tracking-wider">
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}