import { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer";

const VIBER_NUMBER = "+359 88 766 3362";
const WHATSAPP_MSG = encodeURIComponent(
  "Здравей, Иглика! Интересувам се от присъединяване към екипа ти.",
);
const VIBER_URL = `viber://chat?number=%2B${VIBER_NUMBER}`;

// ── Снимки ─────────────────────────────────────────────────────
// Качи снимките в src/assets/ със следните имена:
//   join-hero.jpg          1200x700  — Иглика с екипа, групова
//   join-team-1.jpg         800x600  — Иглика с хора от екипа
//   join-team-2.jpg         600x800  — портрет с партньор
//   join-team-3.jpg         800x600  — събитие / среща
//   join-team-4.jpg         800x600  — lifestyle с екипа
//   join-team-5.jpg         600x800  — партньор lifestyle
const PHOTOS = {
  hero: "/src/assets/DSC_8880.jpg",
  team1: "/src/assets/DSC_7407.jpeg",
  team2: "/src/assets/2.jpg",
  team3: "/src/assets/DSC_8880.jpg",
  team4: "/src/assets/15.jpg",
  team5: "/src/assets/8.jpg",
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

const RANKS = [
  {
    name: "Дистрибутор",
    level: 1,
    color: "bg-neutral-100 text-neutral-600",
    desc: "Стартова позиция. Купуваш на цена дистрибутор и препродаваш на пазарна цена.",
  },
  {
    name: "Асистент мениджър",
    level: 2,
    color: "bg-green-50 text-green-700",
    desc: "Изграждаш малък екип. Получаваш процент от продажбите на твоите партньори.",
  },
  {
    name: "Мениджър",
    level: 3,
    color: "bg-green-100 text-green-800",
    desc: "Ключова стъпка. Отключваш по-висок процент от груповия оборот.",
  },
  {
    name: "Супервайзор",
    level: 4,
    color: "bg-gold-50 text-gold-800",
    desc: "Изграден стабилен екип. Пасивен доход от множество нива.",
  },
  {
    name: "Асистент директор",
    level: 5,
    color: "bg-gold-100 text-gold-900",
    desc: "Сериозен месечен доход. Допустимост за автомобилна програма.",
  },
  {
    name: "Директор",
    level: 6,
    color: "bg-orange-50 text-orange-800",
    desc: "Топ ниво на доходи. Пълна финансова свобода и глобално признание.",
  },
];

const INCENTIVES = [
  {
    icon: "",
    title: "Forever2Drive (Автомобилна програма)",
    tagColor: "bg-green-50 text-green-700",
    desc: "Мечтаеш ли за нов автомобил или свободата да покриваш лични разходи с лекота? Тази програма ти осигурява допълнителен месечен бонус в размер на €400, €600 или €800 за период от 36 месеца. Ти решаваш за какво да ги използваш – за нова кола, вноска по ипотека или образование на децата.",
    highlight: null,
  },
  {
    icon: "",
    title: "Eagle Manager (Мениджър 'Орел')",
    tagColor: "bg-gold-50 text-gold-800",
    desc: "Програмата, която отличава лидерите, изграждащи стабилен и балансиран бизнес. Квалификацията като „Орел“ ти носи изцяло платено пътуване за двама до екзотична дестинация по света. Там ще преминеш през ексклузивни обучения от топ мениджмънта на компанията и ще обмениш опит с най-добрите в бранша.",
    highlight: "Месечна вноска покрита от компанията",
  },
  {
    icon: "",
    title: "Global Rally (Глобално рали)",
    tagColor: "bg-gold-50 text-gold-800",
    desc: "Най-мащабното събитие на годината! Форевър събира хиляди собственици на бизнес на различни красиви кътчета от планетата (Дубай, Лондон, Бахамите и много други). Твоята квалификация ти осигурява самолетни билети, настаняване в луксозни хотели и джобни пари – изцяло поети от компанията.",
    highlight: "Бали, Малдиви, Дубай, Мексико...",
  },
  {
    icon: "",
    title: "Chairman's Bonus (Бонус на Председателя)",
    tagColor: "bg-orange-50 text-orange-700",
    desc: "Познат още като „тринадесетата заплата“ във Форевър. Компанията отделя процент от своя глобален годишен оборот и го разпределя под формата на мащабни финансови чекове. Това е най-високото признание за лидерите, които помагат на хората в екипа си също да растат.",
    highlight: "Дял от световния оборот на компанията",
  },
  {
    icon: "",
    title: "Бонус „Скъпоценни камъни“ (Gem Bonus)",
    tagColor: "bg-neutral-100 text-neutral-600",
    desc: "Колкото повече помагаш на хората от първа линия да развиват своите мениджърски екипи, толкова повече расте и твоят доход. Този стимул добавя между 1% и 3% допълнителен бонус върху оборота на целия ти екип, което може почти да удвои месечните ти приходи.",
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
    name: "Йоанна Й.",
    role: "Супервайзор, София",
    text: "Иглика е любов и вдъхновение за всички около себе си. За мен тя е пример за успешна жена, която не е забравила как да бъде нежна и любяща. Пример за това как любовта отваря и привидно най-здраво залостените врати. 🌸",
    initials: "СД",
    color: "bg-gold-50 text-gold-800",
  },
  {
    name: "Калина М.",
    role: "Асистент директор, Бургас",
    text: "Започнах с 0 опит. Днес имам стабилен пасивен доход и пътувам всяка година с Eagles.",
    initials: "КМ",
    color: "bg-orange-50 text-orange-700",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Свържи се с мен",
    desc: "Едно съобщение в WhatsApp. Разговаряме без натиск — разказвам ти реално как работи.",
  },
  {
    num: "02",
    title: "Опознаваме се",
    desc: "Споделям конкретна информация за доходите, продуктите и програмите за стимулиране.",
  },
  {
    num: "03",
    title: "Вземаш решение",
    desc: "Само ти решаваш. Никога не убеждавам — важно е да искаш това за себе си.",
  },
  {
    num: "04",
    title: "Стартираш с подкрепа",
    desc: "Аз съм до теб от ден 1. Обучение, стратегия и лична подкрепа на всяка стъпка.",
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
          "bg-green-50 border-2 border-dashed border-green-200 flex flex-col items-center justify-center gap-2 text-green-400 " +
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

// ══ КОМПОНЕНТ ══════════════════════════════════════════════════
export default function JoinTeam() {
  const [flpRef, flpInView] = useInView();
  const [benefitsRef, benefitsInView] = useInView();
  const [teamRef, teamInView] = useInView();
  const [incentivesRef, incentivesInView] = useInView();
  const [ranksRef, ranksInView] = useInView();
  const [stepsRef, stepsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <>
      <main>
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
                  Искам да разбера повече
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
                  Компания с над 45 години
                  <br />
                  <em className="not-italic text-orange-600">
                    доказано качество
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
          className="bg-[#FAFAF7] py-20 sm:py-24"
          aria-labelledby="benefits-heading"
        >
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div
              className={
                "text-center mb-12 transition-all duration-600 ease-out " +
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map(({ icon, title, desc }, i) => (
                <div
                  key={title}
                  className={
                    "bg-white border border-neutral-100 rounded-2xl p-6 transition-all duration-500 ease-out " +
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
              {/* Цитат карта вместо снимка */}
              <div className="rounded-2xl bg-green-50 p-7 h-56 flex flex-col justify-between">
                <p className="font-serif italic text-[1rem] text-gold-400 leading-[1.7]">
                  „Ако се присъединиш към моя екип с времето ще можеш да печелиш
                  според усилията си и да бъдеш сред хора, които вярват в теб
                  дори повече, отколкото ти вярваш в себе си."
                </p>
                <p className="font-sans text-[12px] font-semibold text-gold-400 uppercase tracking-wider">
                  — Иглика Величкова
                </p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {INCENTIVES.map(
                ({ icon, title, tag, tagColor, desc, highlight }, i) => (
                  <div
                    key={title}
                    className={
                      "bg-white border border-neutral-100 rounded-2xl p-6 flex flex-col transition-all duration-500 ease-out " +
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
                     px-8 py-4 rounded-pill
                     transition-colors duration-200 w-full lg:w-auto rounded-4xl "
                >
                  <ViberIcon size={17} />
                  Пиши ми в Viber
                </a>
                <a
                  href="/produkti"
                  className="inline-flex items-center justify-center
                     border-[1.5px] border-green-600 text-green-800
                     hover:bg-green-50 font-sans font-medium text-[14px]
                     px-8 py-4 rounded-pill
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
      <Footer />
    </>
  );
}
