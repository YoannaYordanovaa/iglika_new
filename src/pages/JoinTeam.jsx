import { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer";

const VIBER_NUMBER = "+359 88 766 3362";
const WHATSAPP_MSG = encodeURIComponent(
  "Здравей, Иглика! Интересувам се от присъединяване към екипа ти.",
);
const VIBER_URL = `viber://chat?number=%2B${VIBER_NUMBER}`;

// ── Снимки ─────────────────────────────────────────────────────

const PHOTOS = {
  hero: "/src/assets/Iglika_Velichkova_Team1.webp",
  team1: "/src/assets/Iglika_Velichkova_FLP.webp",
  team2: "/src/assets/Iglika_Velichkova_Team3.webp",
  team3: "/src/assets/Iglika_Velichkova_Team4.webp",
  team4: "/src/assets/Iglika_Velichkova_JoinTeam.webp",
  team5: "/src/assets/Iglika_Velichkova_Team5.webp",
  team6: "/src/assets/Iglika_Velichkova_Team2.webp",
};

// ── Данни ──────────────────────────────────────────────────────
const FLP_FACTS = [
  { num: "45+", label: "години на пазара" },
  { num: "40+ млн", label: "алое растения годишно" },
  { num: "160+", label: "страни по света" },
  { num: "1.4 млн", label: "проверки за качество" },
];

const BENEFITS = [
  {
    icon: "🌿",
    title: "Натурални продукти",
    desc: "Препоръчваш само продукти с доказано качество, сертифицирани и изпробвани лично.",
  },
  {
    icon: "💰",
    title: "Собствен бизнес",
    desc: "Стартираш без начален капитал. Изграждаш актив, който работи дори когато не работиш.",
  },
  {
    icon: "🕐",
    title: "Пълна свобода",
    desc: "Ти решаваш кога, как и колко да работиш. Съвместимо с всеки начин на живот.",
  },
  {
    icon: "🤝",
    title: "Екип и подкрепа",
    desc: "Не тръгваш сам. Аз и екипа сме до теб във всяко обучение, опит и подкрепа.",
  },
  {
    icon: "📈",
    title: "Пасивен доход",
    desc: "С растежа на екипа доходът се умножава. Веднъж изграденото работи за теб.",
  },
  {
    icon: "✈️",
    title: "Пътувания и награди",
    desc: "Компанията награждава успеха с пътувания, награди и бонуси на световно ниво.",
  },
];

const INCENTIVES = [
  {
    icon: "🚗",
    title: "Forever2Drive (Автомобилна програма)",
    tag: "До €800/месец",
    tagColor: "bg-green-50 text-green-700",
    desc: "Допълнителен месечен бонус от €400, €600 или €800 за период от 36 месеца. Използвай го за нова кола, вноска по дом или лични цели.",
    highlight: "Месечна вноска покрита от компанията",
  },
  {
    icon: "🦅",
    title: "Eagle Manager (Мениджър 'Орел')",
    tag: "Пътувай по света",
    tagColor: "bg-amber-50 text-gold-800",
    desc: "Изцяло платено луксозно пътуване за двама до екзотична дестинация, съчетано с ексклузивни обучения на световно ниво.",
    highlight: null,
  },
  {
    icon: "🌍",
    title: "Global Rally (Глобално рали)",
    tag: "Годишно събитие",
    tagColor: "bg-gold-50 text-gold-800",
    desc: "Най-мащабното събитие на годината. Форевър поема твоите самолетни билети, петзвездни хотели и джобни пари до топ дестинация по света.",
    highlight: "Бали, Малдиви, Дубай, Мексико...",
  },
  {
    icon: "💰",
    title: "Chairman's Bonus (Бонус на Председателя)",
    tag: "Топ лидери",
    tagColor: "bg-orange-50 text-orange-700",
    desc: "Твоята „тринадесета заплата“. Компанията споделя проценти от глобалния си годишен оборот под формата на мащабни финансови чекове.",
    highlight: "Дял от световния оборот на компанията",
  },
  {
    icon: "💎",
    title: "Бонус „Скъпоценни камъни“ (Gem Bonus)",
    tag: "Пасивен доход",
    tagColor: "bg-neutral-100 text-neutral-600",
    desc: "Допълнителни 1% до 3% бонус върху оборота на мениджърите в екипа ти, които умножават твоите дългосрочни доходи.",
    highlight: null,
  },
];

const TEAM_QUOTES = [
  {
    name: "Венета П.",
    role: "Мениджър, Варна",
    text: "Моето вдъхновение за пълна промяна и успех!!! Тя вярва в хората, повече отколкото всеки от нас вярва в себе си и подкрепя безусловно! Обичам я от цялото си сърце!",
    initials: "ВП",
    color: "bg-green-50 text-green-800",
  },
  {
    name: "Петя М.",
    role: "Сеньор мениджър, София",
    text: "Иглика е човека, който години наред е била до мен като семеен консултант и ми е помагала в трудни моменти при боледуване на моите деца и с конкретни насоки и с  безрезервното си приятелство! 🙏❤️ По -късно стана мой ментор и отново беше до мен, когато реших да поема нов път в живота си като партньор на Форевър! Благодаря ти от сърце, Игличе, за цялата обич и подкрепа, които продължаваш да даряваш! ❤️😘",
    initials: "ПМ",
    color: "bg-gold-50 text-gold-800",
  },
  {
    name: "Иглика Величкова",
    role: "Сеньор мениджър, София",
    text: "Ако се присъединиш към моя екип с времето ще можеш да печелиш според усилията си и да бъдеш сред хора, които вярват в теб дори повече, отколкото ти вярваш в себе си.",
    initials: "ИВ",
    color: "bg-orange-50 text-orange-700",
  },
];

// ── Utility ────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Photo({ src, alt, label, className = "" }) {
  const [err, setErr] = useState(false);
  if (err)
    return (
      <div
        className={
          "bg-green-50 border-2 border-dashed border-green-200 flex flex-col items-center justify-center gap-2 text-green-600 " +
          className
        }
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <p className="font-sans text-[11px] font-medium text-center px-3 leading-snug">
          {label}
        </p>
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      className={"object-cover " + className}
      loading="lazy"
    />
  );
}

function WhatsAppIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function UserPlusIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="16" y1="11" x2="22" y2="11"/>
    </svg>
  )
}

function ViberIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.997 0C5.375 0 .005 5.37.005 11.992c0 2.096.549 4.15 1.593 5.96L.054 24l6.235-1.635a11.98 11.98 0 005.708 1.453h.005C18.624 23.818 24 18.45 24 11.829 24 5.37 18.624 0 11.997 0zm0 21.818h-.004a9.944 9.944 0 01-5.073-1.387l-.364-.216-3.773 1.018 1.018-3.696-.237-.38a9.927 9.927 0 01-1.524-5.285C2.04 6.47 6.476 2.04 12 2.04c5.523 0 9.96 4.43 9.96 9.79 0 5.522-4.437 9.988-9.963 9.988zm5.456-7.39c-.298-.149-1.765-.87-2.038-.968-.273-.1-.472-.149-.67.149-.198.298-.769.968-.943 1.167-.173.198-.347.223-.645.074-.298-.149-1.26-.464-2.4-1.48-.887-.791-1.485-1.768-1.659-2.066-.174-.298-.018-.459.13-.607.134-.134.298-.348.447-.521.15-.174.199-.298.299-.497.1-.198.05-.372-.025-.521-.075-.149-.67-1.613-.917-2.209-.242-.58-.488-.501-.67-.51-.173-.008-.372-.01-.571-.01-.199 0-.521.075-.794.373-.273.298-1.042 1.018-1.042 2.483 0 1.464 1.067 2.879 1.216 3.077.148.198 2.099 3.205 5.086 4.494.711.307 1.266.491 1.699.628.714.227 1.364.195 1.877.118.572-.085 1.765-.721 2.013-1.417.248-.695.248-1.29.174-1.415-.074-.124-.273-.198-.571-.347z" />
    </svg>
  );
}

function ScrollDots({ count, containerRef }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onScroll() {
      const cardWidth = el.scrollWidth / count;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(Math.max(index, 0), count - 1));
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count, containerRef]);

  return (
    <div
      className="flex sm:hidden justify-center gap-1.5 mt-5"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={[
            "h-1.5 rounded-full transition-all duration-300",
            i === active ? "w-5 bg-green-600" : "w-1.5 bg-neutral-200",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const pageH = document.documentElement.scrollHeight;

      // Появява се след hero секцията (~80% от viewport height)
      const pastHero = scrollY > viewportH * 0.8;

      // Скрива се, когато долният край на екрана навлезе в зоната
      // на футъра (последните ~10% от височината на страницата)
      const nearFooter = scrollY + viewportH > pageH - viewportH * 0.1;

      setVisible(pastHero && !nearFooter);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(74,124,31,0.35), 0 0 0 0 rgba(74,124,31,0.4); }
          50%      { box-shadow: 0 4px 16px rgba(74,124,31,0.35), 0 0 0 8px rgba(74,124,31,0); }
        }
        .cta-pulse { animation: ctaPulse 2.5s ease-out infinite; }
      `}</style>

      {/* Мобилно — pill лента на цяла ширина */}
      <div
        className={[
          "fixed bottom-0 left-0 right-0 z-40 md:hidden",
          "pt-10 pb-4 px-5",
          "bg-gradient-to-t from-white via-white/95 to-transparent",
          "transition-all duration-300 ease-out",
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none",
        ].join(" ")}
        aria-hidden={!visible}
      >
        <a
          href="https://thealoeveraco.shop/Mt9PQQDT"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full
                      bg-green-600 hover:bg-green-800 text-white
                     font-sans font-semibold text-[14px]
                     px-6 py-3 rounded-4xl
                     shadow-[0_4px_16px_rgba(115,96,242,0.35)]
                     transition-colors duration-200 mb-5"
        >
           <UserPlusIcon size={16} /> Линк за присъединяване
        </a>
      </div>

      {/* Десктоп — компактна зелена pill долу вдясно, пулсира */}
      <div
        className={[
          "hidden md:block fixed bottom-6 right-6 z-40",
          "transition-all duration-300 ease-out",
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none",
        ].join(" ")}
        aria-hidden={!visible}
      >
        <a
          href="https://thealoeveraco.shop/Mt9PQQDT"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-pulse flex items-center gap-2
                     bg-green-600 hover:bg-green-800 text-white
                     font-sans font-semibold text-[13.5px]
                     px-6 py-3 rounded-4xl
                     transition-colors duration-200"
        >
           <UserPlusIcon size={16} /> Линк за присъединяване
        </a>
      </div>
    </>
  );
}

// ══ КОМПОНЕНТ ══════════════════════════════════════════════════
export default function JoinTeam() {
  const [flpRef, flpInView] = useInView();
  const [benefitsRef, benefitsInView] = useInView();
  const [teamRef, teamInView] = useInView();
  const [incentivesRef, incentivesInView] = useInView();
  const [ranksRef, ranksInView] = useInView();
  const [stepsRef, stepsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  const benefitsScrollRef = useRef(null);
  const incentivesScrollRef = useRef(null);

  return (
    <>
      <main className="overflow-x-hidden">
        {/* ══ 1. HERO ════════════════════════════════════════ */}
        <section
          className="relative bg-green-50 h-[calc(100vh-4rem)] flex items-center overflow-hidden"
          aria-labelledby="join-heading"
        >
          <div className="absolute inset-0">
            <Photo
              src={PHOTOS.hero}
              alt="Иглика с екипа"
              label="Групова снимка · 1200x700px"
              className="w-full h-full opacity-100"
            />
            <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
          </div>
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold-400/10 pointer-events-none"
          />

          <div className="relative z-10 max-w-content mx-auto px-5 sm:px-8 py-24">
            <div className="max-w-[600px]">
              <p className=" text-white mb-5 flex items-center gap-2 ">
                <span
                  className="inline-block w-6 h-px bg-gold-400"
                  aria-hidden="true"
                />
                Forever Living Products · Бизнес възможност
              </p>
              <h1
                id="join-heading"
                className="font-serif font-semibold text-white text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.18] mb-6"
              >
                Изгради живота,
                <br />
                който <em className="not-italic text-gold-400">заслужаваш</em>
              </h1>
              <p className="font-sans text-[15.5px] text-white/80 leading-[1.6] mb-10 max-w-[48ch]">
                Твоето време, твоите правила. Присъедини се към моя екип и
                разбери как хиляди хора превръщат споделянето на продукти, в
                които вярват, в допълнителен доход, вълнуващи пътувания и
                истинска свобода. Направи първата стъпка днес!
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#whyflp"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-800
                         text-white font-sans font-semibold text-[13.5px]
                         px-6 py-3 rounded-pill transition-colors duration-200  rounded-4xl "
                >
                  Кои са Forever Living Products?
                </a>
                <a
                  href="#programi"
                  className="inline-flex  rounded-4xl  items-center gap-2 border border-white/30 hover:border-white/60 text-white font-sans font-medium text-[14px] px-7 py-3.5 rounded-pill transition-colors duration-200"
                >
                  Виж програмите ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 2. ЗАЩО FLP ════════════════════════════════════ */}
        <section
          ref={flpRef}
          className="bg-white py-20 sm:py-24"
          aria-labelledby="flp-heading"
          id="whyflp"
        >
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              {/* Текст */}
              <div
                className={
                  "transition-all duration-700 ease-out " +
                  (flpInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8")
                }
              >
                <p className="eyebrow text-orange-600 mb-4 flex items-center gap-2">
                  <span
                    className="inline-block w-6 h-px bg-orange-400"
                    aria-hidden="true"
                  />
                  Защо Forever Living?
                </p>
                <h2
                  id="flp-heading"
                  className="font-serif font-semibold text-green-900 text-[1.85rem] sm:text-[2.2rem] leading-[1.25] mb-5"
                >
                 Световен лидер 
                  <br />
                  <em className="not-italic text-orange-600">
                    с над 45 години история
                  </em>
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="font-sans text-[14.5px] text-neutral-600 leading-[1.85]">
                    Основана през 1978 г. от Рекс Моан, Forever Living Products
                    е финансово стабилна компания, оперираща в над 160 държави.
                    Известна като „The Aloe Vera Company“, тя е{" "}
                    <b>
                      най-големият производител и преработвател на продукти с
                      алое вера в Света .
                    </b>
                  </p>
                  <p className="font-sans text-[14.5px] text-neutral-600 leading-[1.85]">
                    Forever контролира целия процес – от собствените си
                    плантации в Тексас и Доминиканската република до крайния
                    потребител. Продуктите се изработват от{" "}
                    <b>
                      чист, стабилизиран гел от Aloe Barbadensis Miller,
                      отгледан без изкуствени пестициди.
                    </b>
                  </p>
                  <p className="font-sans text-[14.5px] text-neutral-600 leading-[1.85]">
                    Освен всичко останало, компанията предлага и сигурен бизнес
                    модел за изграждане на международни екипи онлайн или офлайн.
                    За разлика от други МЛМ компании,{" "}
                    <b>
                      {" "}
                      веднъж достигнатото ниво на квалификация и отстъпка тук
                      никога не се губи.
                    </b>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {FLP_FACTS.map(({ num, label }) => (
                    <div
                      key={label}
                      className="bg-[#FAFAF7] border border-neutral-100 rounded-2xl p-4"
                    >
                      <p className="font-serif font-semibold text-[1.6rem] text-green-800 leading-none mb-1">
                        {num}
                      </p>
                      <p className="font-sans text-[12px] text-neutral-500 leading-snug">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Снимка — Иглика с екипа */}
              <div
                className={
                  "transition-all duration-700 ease-out delay-150 " +
                  (flpInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8")
                }
              >
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-green-50 border border-green-100"
                  />
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                    <Photo
                      src={PHOTOS.team1}
                      alt="Иглика с партньори от екипа"
                      label="Иглика с екипа · 800x600px"
                      className="w-full h-full"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-3 -left-4 bg-white border border-neutral-100 rounded-2xl px-4 py-3 shadow-sm">
                    <p className="font-sans font-semibold text-[13px] text-green-900 leading-none mb-0.5">
                      №1 производител на Алое Вера
                    </p>
                    <p className="font-sans text-[11px] text-neutral-400">
                      в световен мащаб
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 3. ПОЛЗИ ═══════════════════════════════════════ */}
        <section
          ref={benefitsRef}
          className="relative overflow-hidden bg-[#FAFAF7] py-20 sm:py-24"
          aria-labelledby="benefits-heading"
        >
          <div className="max-w-content relative mx-auto px-5 sm:px-8">
            {/* Декоративни кръгове */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full
                 bg-orange-100 opacity-60 pointer-events-none z-0"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full
                 bg-green-50 opacity-70 pointer-events-none z-0"
            />

            <div
              className={
                "text-center z-10 mb-12 transition-all duration-600 ease-out " +
                (benefitsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4")
              }
            >
              <p className="eyebrow text-orange-600 mb-4 flex items-center justify-center gap-2">
                <span
                  className="w-6 h-px bg-orange-400 inline-block"
                  aria-hidden="true"
                />
                Какво те очаква
                <span
                  className="w-6 h-px bg-orange-400 inline-block"
                  aria-hidden="true"
                />
              </p>
              <h2
                id="benefits-heading"
                className="font-serif font-semibold text-green-900 text-[1.85rem] sm:text-[2.2rem] leading-[1.25]"
              >
                Шест причини да кажеш „да"
              </h2>
            </div>
            <div
              ref={benefitsScrollRef}
              className="relative z-10 flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5
                         overflow-x-auto sm:overflow-visible
                         -mx-5 px-5 sm:mx-0 sm:px-0
                         snap-x snap-mandatory sm:snap-none
                         scrollbar-none"
            >
              {BENEFITS.map(({ icon, title, desc }, i) => (
                <div
                  key={title}
                  className={
                    "bg-white border border-neutral-100 rounded-2xl p-6 transition-all duration-500 ease-out " +
                    "flex-shrink-0 w-[80%] sm:w-auto snap-center " +
                    (benefitsInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6")
                  }
                  style={{
                    transitionDelay: benefitsInView ? i * 70 + "ms" : "0ms",
                  }}
                >
                  <span className="text-3xl block mb-4" aria-hidden="true">
                    {icon}
                  </span>
                  <h3 className="font-serif font-semibold text-[1rem] text-green-900 mb-2">
                    {title}
                  </h3>
                  <p className="font-sans text-[13.5px] text-neutral-500 leading-[1.75]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
            <ScrollDots
              count={BENEFITS.length}
              containerRef={benefitsScrollRef}
            />
          </div>
        </section>

        {/* ══ 4. ЕКИПЪТ — снимки и цитати ════════════════════ */}
        <section
          ref={teamRef}
          className="bg-white py-20 sm:py-24"
          aria-labelledby="team-heading"
        >
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div
              className={
                "text-center mb-12 transition-all duration-600 ease-out " +
                (teamInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4")
              }
            >
              <p className="eyebrow text-orange-600 mb-4 flex items-center justify-center gap-2">
                <span
                  className="w-6 h-px bg-orange-400 inline-block"
                  aria-hidden="true"
                />
                Нашият екип
                <span
                  className="w-6 h-px bg-orange-400 inline-block"
                  aria-hidden="true"
                />
              </p>
              <h2
                id="team-heading"
                className="font-serif font-semibold text-green-900 text-[1.85rem] sm:text-[2.2rem] leading-tight mb-3"
              >
                Хора, които избраха
                <br />
                <em className="not-italic text-orange-600">по-добър живот</em>
              </h2>
              <p className="font-sans text-[14.5px] text-neutral-500 max-w-[44ch] mx-auto leading-[1.75]">
                Обикновени хора с извънредни резултати. Майки, учители,
                служители - всички взели решение да действат.
              </p>
            </div>

            {/* Галерия — асиметрична решетка */}
            <div
              className={
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 transition-all duration-700 ease-out " +
                (teamInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6")
              }
            >
              {/* Голяма снимка */}
              <div className="lg:col-span-2 rounded-2xl overflow-hidden h-72 sm:h-80">
                <Photo
                  src={PHOTOS.team3}
                  alt="Екипът на Иглика на събитие"
                  label="Събитие с екипа · 800x600px"
                  className="w-full h-full"
                />
              </div>
              {/* Вертикална */}
              <div className="rounded-2xl overflow-hidden h-72 sm:h-80">
                <Photo
                  src={PHOTOS.team2}
                  alt="Иглика с партньор"
                  label="Иглика с партньор · 600x800px"
                  className="w-full h-full"
                />
              </div>
              {/* Малка */}
              <div className="rounded-2xl overflow-hidden h-56">
                <Photo
                  src={PHOTOS.team4}
                  alt="Lifestyle с екипа"
                  label="Lifestyle екип · 800x600px"
                  className="w-full h-full"
                />
              </div>
              {/* Малка */}
              <div className="rounded-2xl overflow-hidden h-56">
                <Photo
                  src={PHOTOS.team5}
                  alt="Партньор от екипа"
                  label="Партньор lifestyle · 600x800px"
                  className="w-full h-full"
                />
              </div>
                <div className="rounded-2xl overflow-hidden h-56">
                <Photo
                  src={PHOTOS.team6}
                  alt="Партньор от екипа"
                  label="Партньор lifestyle · 600x800px"
                  className="w-full h-full"
                />
              </div>

            </div>

            {/* Цитати от екипа */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {TEAM_QUOTES.map(({ name, role, text, initials, color }, i) => (
                <div
                  key={name}
                  className={
                    "bg-[#FAFAF7] border border-neutral-100 rounded-2xl p-5 transition-all duration-500 ease-out " +
                    (teamInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6")
                  }
                  style={{
                    transitionDelay: teamInView ? 200 + i * 80 + "ms" : "0ms",
                  }}
                >
                  <blockquote className="font-serif italic text-[13.5px] text-neutral-600 leading-[1.75] mb-4">
                    „{text}"
                  </blockquote>
                  <div className="flex items-center gap-2.5">
                    <div
                      className={
                        "w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold text-[11px] flex-shrink-0 " +
                        color
                      }
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-[12.5px] text-neutral-800 leading-none mb-0.5">
                        {name}
                      </p>
                      <p className="font-sans text-[11px] text-neutral-400">
                        {role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5. ПРОГРАМИ ЗА СТИМУЛИРАНЕ ════════════════════ */}
        <section
          id="programi"
          ref={incentivesRef}
          className="bg-[#FAFAF7] py-20 sm:py-24"
          aria-labelledby="incentives-heading"
        >
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div
              className={
                "text-center mb-12 transition-all duration-600 ease-out " +
                (incentivesInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4")
              }
            >
              <p className="eyebrow text-orange-600 mb-4 flex items-center justify-center gap-2">
                <span
                  className="w-6 h-px bg-orange-400 inline-block"
                  aria-hidden="true"
                />
                Програми за стимулиране
                <span
                  className="w-6 h-px bg-orange-400 inline-block"
                  aria-hidden="true"
                />
              </p>
              <h2
                id="incentives-heading"
                className="font-serif font-semibold text-green-900 text-[1.85rem] sm:text-[2.2rem] leading-[1.25] mb-3"
              >
                Forever Living възнаграждава
                <br />
                <em className="not-italic text-orange-600">всеки успех</em>
              </h2>
              <p className="font-sans text-[14.5px] text-neutral-500 max-w-[48ch] mx-auto leading-[1.75]">
                Освен доходите от продажби и групов оборот, компанията предлага
                изключителни програми за признание на постиженията.
              </p>
            </div>

            <div
              ref={incentivesScrollRef}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5
                         overflow-x-auto sm:overflow-visible
                         -mx-5 px-5 sm:mx-0 sm:px-0
                         snap-x snap-mandatory sm:snap-none
                         scrollbar-none"
            >
              {INCENTIVES.map(
                ({ icon, title, tag, tagColor, desc, highlight }, i) => (
                  <div
                    key={title}
                    className={
                      "bg-white border border-neutral-100 rounded-2xl p-6 flex flex-col transition-all duration-500 ease-out " +
                      "flex-shrink-0 w-[80%] sm:w-auto snap-center " +
                      (incentivesInView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6")
                    }
                    style={{
                      transitionDelay: incentivesInView ? i * 80 + "ms" : "0ms",
                    }}
                  >
                    <div className="flex items-start justify-between mb-4 gap-2">
                      <span className="text-3xl" aria-hidden="true">
                        {icon}
                      </span>
                      <span
                        className={
                          "font-sans text-[11px] font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 " +
                          tagColor
                        }
                      >
                        {tag}
                      </span>
                    </div>
                    <h3 className="font-serif font-semibold text-[1rem] text-green-900 mb-2">
                      {title}
                    </h3>
                    <p className="font-sans text-[13.5px] text-neutral-500 leading-[1.75] flex-1">
                      {desc}
                    </p>
                    {highlight && (
                      <div className="mt-4 bg-gold-50 border border-gold-100 rounded-xl px-3 py-2">
                        <p className="font-sans text-[12px] font-semibold text-gold-800 leading-snug">
                          ✦ {highlight}
                        </p>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
            <ScrollDots
              count={INCENTIVES.length}
              containerRef={incentivesScrollRef}
            />
          </div>
        </section>

        {/* ═════════ ФИНАЛЕН CTA ═════════ */}
        <section
          ref={ctaRef}
          className="bg-white py-14 sm:py-16"
          aria-labelledby="cta-heading"
        >
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div
              className={[
                "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                "transition-all duration-700 ease-out",
                ctaInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              {/* Текст вляво */}
              <div>
                <p className="eyebrow text-orange-600 mb-4 flex items-center gap-2">
                  <span
                    className="inline-block w-5 h-px bg-orange-400"
                    aria-hidden="true"
                  />
                  Готов ли си?
                </p>
                <h2
                  id="cta-heading"
                  className="font-serif font-semibold text-green-900
                     text-[1.75rem] sm:text-[2.1rem] leading-[1.25] mb-4"
                >
                  Едно съобщение може да{" "}
                  <em className="not-italic text-orange-600">промени всичко</em>
                </h2>
                <p className="font-sans text-[14.5px] text-neutral-500 leading-[1.85] max-w-[44ch]">
                  Нищо не е задължително - разговаряме спокойно и ти решаваш
                  какво е правилно за теб.
                </p>
              </div>

              {/* Бутони вдясно */}
              <div className="flex flex-col items-start lg:items-end gap-3">
                <a
                  href={VIBER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2
                     bg-[#7360F2] hover:bg-[#5a4bd1] text-white
                     font-sans font-semibold text-[14.5px]
                     px-6 py-3 rounded-pill
                     transition-colors duration-200 w-full lg:w-auto rounded-4xl "
                >
                  <ViberIcon size={17} />
                  Пиши ми в Viber
                </a>
                <a
                  href="/products"
                  className="inline-flex items-center justify-center
                     border-[1.5px] border-green-600 text-green-800
                     hover:bg-green-50 font-sans font-medium text-[14px]
                     px-6 py-3 rounded-pill
                     transition-colors duration-200 w-full lg:w-auto rounded-4xl "
                >
                  Разгледай продуктите
                </a>
                <p className="font-sans text-[12px] text-neutral-400">
                  Отговарям лично до 1 час в работно време.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <StickyCTA />
      <Footer />
    </>
  );
}