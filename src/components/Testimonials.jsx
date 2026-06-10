import { useEffect, useRef, useState } from 'react'

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
    name: 'Мария П.',
    role: 'Майка и предприемач',
    location: 'Пловдив',
    initials: 'МП',
    color: 'bg-green-50 text-green-800',
    text: 'Иглика ме подкрепяше всяка стъпка от пътя. Сега и аз имам своя малък бизнес и по-здравословно семейство. Не мога да си представя как щеше да изглежда животът ми без тази среща.',
    stars: 5,
  },
  {
    name: 'Светла Д.',
    role: 'Учителка',
    location: 'София',
    initials: 'СД',
    color: 'bg-gold-50 text-gold-800',
    text: 'Търсех нещо, което да ми даде енергия след дългите учебни дни. Намерих продуктите — и намерих общност от прекрасни хора. Иглика е изключително внимателна и искрена.',
    stars: 5,
  },
  {
    name: 'Надя А.',
    role: 'Счетоводител',
    location: 'Варна',
    initials: 'НА',
    color: 'bg-orange-50 text-orange-800',
    text: 'Не вярвах в мрежовия маркетинг. Иглика промени мнението ми — с истинност и без натиск. Просто сподели своя опит и ми остави пространство сама да реша.',
    stars: 5,
  },
  {
    name: 'Калина М.',
    role: 'Медицинска сестра',
    location: 'Бургас',
    initials: 'КМ',
    color: 'bg-green-50 text-green-800',
    text: 'Допълнителният доход, който изградих за 6 месеца, надмина очакванията ми. Но по-важното — намерих смисъл в това да помагам на другите да се чувстват по-добре.',
    stars: 5,
  },
  {
    name: 'Десислава В.',
    role: 'Млада майка',
    location: 'Стара Загора',
    initials: 'ДВ',
    color: 'bg-gold-50 text-gold-800',
    text: 'След раждането се чувствах изтощена. Иглика ми препоръча продукти, които наистина помогнаха. Подходът й е топъл и персонален — никога не се чувствах като просто поредния клиент.',
    stars: 5,
  },
  {
    name: 'Елена С.',
    role: 'Предприемач',
    location: 'Велико Търново',
    initials: 'ЕС',
    color: 'bg-orange-50 text-orange-800',
    text: 'Работя с Иглика от 3 години. Тя е истински лидер — вдъхновява с пример, а не с думи. Благодарна съм, че я срещнах на моя път.',
    stars: 5,
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} от 5 звезди`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
             fill="#D4A017" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t, index, inView }) {
  return (
    <div
      className={[
        'bg-white border border-neutral-100 rounded-2xl p-6',
        'flex flex-col gap-4',
        'transition-all duration-500 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      ].join(' ')}
      style={{ transitionDelay: inView ? `${index * 80}ms` : '0ms' }}
    >
      {/* Аватар + автор */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center
                         font-sans font-semibold text-[13px] flex-shrink-0 ${t.color}`}>
          {t.initials}
        </div>
        <div>
          <p className="font-sans font-semibold text-[13.5px] text-neutral-800 leading-none mb-0.5">
            {t.name}
          </p>
          <p className="font-sans text-[11.5px] text-neutral-400 leading-none">
            {t.role} · {t.location}
          </p>
        </div>
        <div className="ml-auto">
          <StarRating count={t.stars} />
        </div>
      </div>

      {/* Разделител */}
      <div className="h-px bg-neutral-50" />

      {/* Текст */}
      <blockquote className="font-serif italic text-[13.5px] text-neutral-600 leading-[1.75]">
        „{t.text}"
      </blockquote>
    </div>
  )
}

export default function Testimonials() {
  const [sectionRef, inView] = useInView()

  return (
    <section
      id="otзиви"
      ref={sectionRef}
      className="bg-[#FAFAF7] py-20 sm:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">

        {/* Хедър */}
        <div className={[
          'text-center mb-14 transition-all duration-600 ease-out',
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
            Те вече направиха стъпката
          </h2>
          <p className="font-sans text-[14.5px] text-neutral-500 max-w-[40ch] mx-auto leading-[1.75]">
            Истински думи от хора, чийто живот се е променил — малко или много.
          </p>
        </div>

        {/* Решетка с отзиви */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom trust линия */}
        <div className={[
          'mt-14 flex flex-wrap items-center justify-center gap-8',
          'transition-all duration-600 ease-out delay-500',
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