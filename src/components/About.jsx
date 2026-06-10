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

// ── Снимки — замени с реалните paths след качване ──────────────
// Препоръчителни размери: 800x600px или 600x800px (portrait)
// about-1.jpg — семейна снимка
// about-2.jpg — снимка с екипа / успех
// about-3.jpg — личен момент / lifestyle
const PHOTOS = {
  p1: '/src/assets/414.png',
  p2: '/src/assets/DSC_5757.jpeg',
  p3: '/src/assets/DSC_7977.jpg',
}

const STATS = [
  { num: '10+',  label: 'Години опит' },
  { num: '500+', label: 'Доволни клиенти' },
  { num: '150+', label: 'Партньори' },
]

const ROWS = [
  {
    year:    'Началото',
    title:   'Открих FLP като клиент',
    text:    'Търсех решение за здравословен проблем в семейството ми. Като много майки — опитвах различни неща, четях, питах. Тогава открих Forever Living Products — и животът ни се промени завинаги.',
    photo:   PHOTOS.p1,
    alt:     'Семейна снимка на Иглика',
    label:   'Семейна снимка · 800x600px',
    reverse: false,
  },
  {
    year:    'Изграждане',
    title:   'Изградих екип и общност',
    text:    'Резултатите бяха толкова добри, че не можах да не ги споделя. Постепенно около мен се събраха хора с общи ценности — майки, предприемачи, хора, търсещи промяна и по-добър живот.',
    photo:   PHOTOS.p2,
    alt:     'Иглика с екипа на Forever Living',
    label:   'Снимка с екипа · 800x600px',
    reverse: true,
  },
  {
    year:    'Днес',
    title:   'Лидер с 10+ години опит',
    text:    'Днес съм горда майка, предприемач и лидер. Не защото следвах план — а защото следвах сърцето си. Помагам на стотици семейства да живеят по-здравословно и на хора с амбиции — да изградят собствен бизнес.',
    photo:   PHOTOS.p3,
    alt:     'Иглика — личен момент',
    label:   'Личен момент · 800x600px',
    reverse: false,
  },
]

// Снимка с fallback към placeholder
function Photo({ src, alt, label, className = '' }) {
  const [err, setErr] = useState(false)
  if (err) return (
    <div className={'bg-green-50 border-2 border-dashed border-green-200 flex flex-col items-center justify-center gap-2 text-green-400 ' + className}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
      <p className="font-sans text-[11px] font-medium text-center px-4 leading-snug">{label}</p>
    </div>
  )
  return (
    <img src={src} alt={alt} onError={() => setErr(true)}
         className={'object-cover ' + className} loading="lazy" />
  )
}

export default function About() {
  const [headerRef, headerInView] = useInView()

  return (
    <section
      id="za-men"
      className="bg-white overflow-hidden"
      aria-labelledby="about-heading"
    >

      {/* ══ ХЕДЪР ══════════════════════════════════════════ */}
      <div
        ref={headerRef}
        className={[
          'max-w-content mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-14 sm:pb-16',
          'transition-all duration-700 ease-out',
          headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        ].join(' ')}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end
                        pb-12 border-b border-neutral-100">

          {/* Текст */}
          <div>
            <p className="eyebrow text-orange-600 mb-4 flex items-center gap-2">
              <span className="inline-block w-5 h-px bg-orange-400" aria-hidden="true" />
              Моята история
            </p>
            <h2
              id="about-heading"
              className="font-serif font-semibold text-green-900
                         text-[1.85rem] sm:text-[2.3rem] leading-[1.22] mb-5"
            >
              От клиент до лидер —<br />
              <em className="not-italic text-orange-600">автентичен път</em>
            </h2>
            <blockquote
              className="font-serif italic text-[1rem] sm:text-[1.0625rem]
                         text-green-900 leading-[1.75]
                         border-l-[3px] border-gold-400 pl-5
                         max-w-[50ch]"
            >
              „Когато откриеш нещо, което е помогнало на теб и твоето семейство,
              естествено е да искаш да го споделиш с другите."
            </blockquote>
            <p className='mt-4'> „Когато откриеш нещо, което е помогнало на теб и твоето семейство,
              естествено е да искаш да го споделиш с другите." „Когато откриеш нещо, което е помогнало на теб и твоето семейство,
              естествено е да искаш да го споделиш с другите." „Когато откриеш нещо, което е помогнало на теб и твоето семейство,
              естествено е да искаш да го споделиш с другите."</p>
          </div>

          {/* Статистики */}
          <div className="flex flex-row lg:flex-col gap-4">
            {STATS.map(({ num, label }) => (
              <div key={label}
                   className="bg-[#FAFAF7] border border-neutral-100
                              rounded-2xl px-5 py-4 text-center lg:text-left
                              min-w-[100px]">
                <p className="font-serif font-semibold text-[1.9rem] text-green-700
                               leading-none mb-1">
                  {num}
                </p>
                <p className="font-sans text-[11px] text-neutral-400
                               uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ══ РЕДУВАЩИ СЕ РЕДОВЕ ═════════════════════════════ */}
      {ROWS.map(({ year, title, text, photo, alt, label, reverse }, i) => (
        <Row
          key={year}
          year={year}
          title={title}
          text={text}
          photo={photo}
          alt={alt}
          label={label}
          reverse={reverse}
          index={i}
          isLast={i === ROWS.length - 1}
        />
      ))}

    </section>
  )
}

function Row({ year, title, text, photo, alt, label, reverse, index, isLast }) {
  const [ref, inView] = useInView(0.15)

  // Редуване на фонове
  const bg = index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF7]'

  return (
    <div
      ref={ref}
      className={[
        bg,
        'border-t border-neutral-100',
        isLast ? 'border-b' : '',
      ].join(' ')}
    >
      <div className="max-w-content mx-auto">
        <div className={[
          'grid grid-cols-1 md:grid-cols-2',
          reverse ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : '',
        ].join(' ')}>

          {/* Текстова колона */}
          <div
            className={[
              'flex flex-col justify-center gap-5',
              'px-5 sm:px-8 lg:px-12 py-14 sm:py-16',
              'transition-all duration-700 ease-out',
              inView
                ? 'opacity-100 translate-x-0'
                : reverse
                  ? 'opacity-0 translate-x-8'
                  : 'opacity-0 -translate-x-8',
            ].join(' ')}
          >
            {/* Номер + год */}
            <div className="flex items-center gap-3">
              <span className="font-serif font-semibold text-[2rem]
                               text-neutral-200 leading-none"
                    aria-hidden="true">
                0{index + 1}
              </span>
              <span className="font-sans text-[10.5px] font-semibold
                               text-orange-600 uppercase tracking-[0.1em]">
                {year}
              </span>
            </div>

            {/* Заглавие */}
            <h3 className="font-serif font-semibold text-green-900
                           text-[1.35rem] sm:text-[1.55rem] leading-[1.3]">
              {title}
            </h3>

            {/* Текст */}
            <p className="font-sans text-[14.5px] text-neutral-600 leading-[1.85]">
              {text}
            </p>

            {/* Разделителна линия */}
            <div className="w-10 h-[2px] bg-gold-400" aria-hidden="true" />
          </div>

          {/* Снимка */}
          <div
            className={[
              'relative overflow-hidden',
              'min-h-[280px] sm:min-h-[340px] md:min-h-0',
              'transition-all duration-700 ease-out delay-150',
              inView
                ? 'opacity-100 translate-x-0'
                : reverse
                  ? 'opacity-0 -translate-x-8'
                  : 'opacity-0 translate-x-8',
            ].join(' ')}
          >
            <Photo
              src={photo}
              alt={alt}
              label={label}
              className="absolute inset-0 w-full h-full"
            />
          </div>

        </div>
      </div>
    </div>
  )
}