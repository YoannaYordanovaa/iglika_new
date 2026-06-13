import { useRef, useState, useEffect } from 'react'

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

const VIBER_NUMBER  = '+359 88 766 3362'   // ← смени с реалния
const VIBER_URL     = `viber://chat?number=%2B${VIBER_NUMBER}`
const PHONE_DISPLAY = '+359 88 766 3362' // ← смени с реалния

export default function Contact() {
  const [sectionRef, inView] = useInView()

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className=" py-20 sm:py-28 scroll-mt-16"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">

        {/* Хедър */}
        <div className={[
          'text-center mb-14 transition-all duration-700 ease-out',
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}>
          <p className="eyebrow text-orange-600 mb-4 flex items-center justify-center gap-2">
            <span className="inline-block w-6 h-px bg-orange-400" aria-hidden="true" />
            Нека поговорим
            <span className="inline-block w-6 h-px bg-orange-400" aria-hidden="true" />
          </p>
          <h2
            id="contact-heading"
            className="font-serif font-semibold text-green-900
                       text-[1.9rem] sm:text-[2.25rem] leading-[1.25] mb-4"
          >
            Свържи се с мен
          </h2>
          <p className="font-sans text-[15px] text-neutral-500 max-w-[38ch] mx-auto leading-[1.8]">
            Нищо не е задължително - разговаряме спокойно и ти решаваш какво е правилно за теб.
          </p>
        </div>

        {/* Централна карта */}
        <div className={[
          'max-w-md mx-auto transition-all duration-700 ease-out delay-100',
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        ].join(' ')}>

          {/* Viber бутон — главен CTA */}
          <a
            href={VIBER_URL}
            aria-label="Свържи се с Иглика в Viber"
            className="flex items-center gap-5 bg-[#7360F2] hover:bg-[#5a4bd1]
                       text-white rounded-3xl px-8 py-5 mb-4
                       transition-colors duration-200 group w-full"
          >
            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center
                            justify-center flex-shrink-0">
              <ViberIcon size={26} />
            </div>
            <div className="flex-1">
              <p className="font-sans font-semibold text-[16px] leading-none mb-1">
                Пиши ми в Viber
              </p>
              <p className="font-sans text-[13px] opacity-70 leading-none">
                {PHONE_DISPLAY}
              </p>
            </div>
            <svg className="opacity-50 group-hover:translate-x-1 transition-transform flex-shrink-0"
                 width="18" height="18" viewBox="0 0 16 16" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </a>

          {/* Или обади се */}
          <a
            href={`tel:${VIBER_NUMBER}`}
            aria-label="Обади се на Иглика"
            className="flex items-center justify-center gap-2 w-full
                       border border-neutral-200 hover:border-green-600
                       bg-white hover:bg-green-50
                       text-neutral-600 hover:text-green-800
                       font-sans font-medium text-[14px]
                       rounded-2xl px-6 py-3.5
                       transition-colors duration-200"
          >
            <PhoneIcon size={16} />
            {PHONE_DISPLAY}
          </a>

          {/* Бележка */}
          <p className="font-sans text-[12px] text-neutral-400 text-center mt-5 leading-[1.7]">
            Отговарям лично до 1 час в работно време.
          </p>

        </div>

      </div>
    </section>
  )
}

function ViberIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.997 0C5.375 0 .005 5.37.005 11.992c0 2.096.549 4.15 1.593 5.96L.054 24l6.235-1.635a11.98 11.98 0 005.708 1.453h.005C18.624 23.818 24 18.45 24 11.829 24 5.37 18.624 0 11.997 0zm0 21.818h-.004a9.944 9.944 0 01-5.073-1.387l-.364-.216-3.773 1.018 1.018-3.696-.237-.38a9.927 9.927 0 01-1.524-5.285C2.04 6.47 6.476 2.04 12 2.04c5.523 0 9.96 4.43 9.96 9.79 0 5.522-4.437 9.988-9.963 9.988zm5.456-7.39c-.298-.149-1.765-.87-2.038-.968-.273-.1-.472-.149-.67.149-.198.298-.769.968-.943 1.167-.173.198-.347.223-.645.074-.298-.149-1.26-.464-2.4-1.48-.887-.791-1.485-1.768-1.659-2.066-.174-.298-.018-.459.13-.607.134-.134.298-.348.447-.521.15-.174.199-.298.299-.497.1-.198.05-.372-.025-.521-.075-.149-.67-1.613-.917-2.209-.242-.58-.488-.501-.67-.51-.173-.008-.372-.01-.571-.01-.199 0-.521.075-.794.373-.273.298-1.042 1.018-1.042 2.483 0 1.464 1.067 2.879 1.216 3.077.148.198 2.099 3.205 5.086 4.494.711.307 1.266.491 1.699.628.714.227 1.364.195 1.877.118.572-.085 1.765-.721 2.013-1.417.248-.695.248-1.29.174-1.415-.074-.124-.273-.198-.571-.347z"/>
    </svg>
  )
}

function PhoneIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 .02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  )
}