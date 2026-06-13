import { useEffect, useState } from "react";

// Смени с реалния path след като качиш снимката в src/assets/
const HERO_IMAGE = "/src/assets/Iglika.jpeg";

const VIBER_NUMBER = "+359 88 766 3362";
const WHATSAPP_MSG = encodeURIComponent(
  "Здравей, Иглика! Исках да те попитам за продуктите.",
);
const VIBER_URL = `viber://chat?number=%2B${VIBER_NUMBER}`;

// Малки trust badges под заглавието
const BADGES = [
  { icon: "✦", text: "10+ години опит" },
  { icon: "✦", text: "500+ доволни клиенти" },
  { icon: "✦", text: "Forever Living Products" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  // Плавно появяване при зареждане
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative bg-[#FAFAF7] overflow-hidden  md:h-[calc(100vh-4rem)]">
      {/* ── Декоративен кръг горе вдясно ─────────────── */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full
                   bg-orange-100 opacity-60 pointer-events-none"
      />
      {/* Малък кръг долу вляво */}
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full
                   bg-green-50 opacity-70 pointer-events-none"
      />

      {/* ── Основна решетка ───────────────────────────── */}
      <div
        className="relative max-w-content mx-auto px-5 sm:px-8
                      grid grid-cols-1 md:grid-cols-2
                      gap-10 md:gap-0
                      min-h-[calc(100vh-4rem)] md:min-h-[620px]
                      items-center"
      >
        {/* ── Лява колона — текст ───────────────────── */}
        <div
          className={[
            "flex flex-col justify-center pb-16 md:py-20 md:pt-16 md:pr-10" ,
            "order-2 md:order-1",
            "transition-all duration-700 ease-out",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          {/* Eyebrow */}
          <p className="eyebrow text-orange-600 mb-4 flex items-center gap-2">
            <span
              className="inline-block w-6 h-px bg-orange-400"
              aria-hidden="true"
            />
            Собственик на Форевър бизнес
          </p>

          {/* Заглавие */}
          <h1
            className="font-serif font-semibold text-green-900 mb-5
                         text-[2.1rem] leading-[1.2] sm:text-[2.6rem] lg:text-[3rem]"
          >
            Здравето е<br />
            най-голямото{" "}
            <em className="not-italic text-orange-600">богатство</em>
          </h1>

          {/* Цитат */}
          <blockquote
            className="font-serif italic text-[1rem] sm:text-[1.0625rem]
                       text-neutral-600 leading-[1.75]
                       border-l-[3px] border-gold-400 pl-4 mb-7 max-w-[38ch]"
          >
            „Тук ще откриеш вдъхновение, доказани продукти и общност
            от хора, които вярват в силата на положителната промяна."
          </blockquote>

          {/* CTA бутони */}
          <div className="flex flex-wrap gap-3 mb-9">
            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-800
                         text-white font-sans font-semibold text-[13.5px]
                         px-6 py-3 rounded-pill transition-colors duration-200 rounded-4xl"
            >
              Разбери повече
                <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>

            <a
              href="#products"
              className="inline-flex items-center gap-1.5 border border-green-600
                         text-green-800 hover:bg-green-50 font-sans font-medium
                         text-[13.5px] px-6 py-3 rounded-pill transition-colors duration-200  rounded-4xl"
            >
              Виж продуктите
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>

          {/* Trust badges */}
          <ul
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Ключови факти"
          >
            {BADGES.map(({ icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-1.5 font-sans text-[12px]
                             font-medium text-neutral-500"
              >
                <span className="text-gold-400 text-[10px]" aria-hidden="true">
                  {icon}
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Дясна колона — снимка ─────────────────── */}
        <div
          className={[
            "relative flex justify-center md:justify-end items-end",
            "pb-0 md:pb-0 pt-4 md:pt-0",
            "order-1 md:order-2",
            "transition-all duration-700 ease-out delay-150",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          {/* Рамка зад снимката */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-4 md:right-0
                       w-[88%] md:w-[82%] h-[92%]
                       rounded-tr-[120px] rounded-bl-xl
                       bg-green-50"
          />

          {/* Снимката */}
          <div className="relative w-[82%] sm:w-[68%] md:w-[88%] max-w-[420px]">
            <img
              src={HERO_IMAGE}
              alt="Иглика Величкова — консултант по здравословен начин на живот"
              className="relative z-10 w-full object-cover object-top
                         rounded-tr-[110px] rounded-bl-xl
                         aspect-[3/4]"
              loading="eager"
            />


            {/* Плаващ badge */}
            <div
              className="absolute z-20 bottom-10 -right-4 sm:-right-6
                         bg-white border border-neutral-100 shadow-sm
                         rounded-2xl px-4 py-2.5 flex items-center gap-2.5"
              aria-label="500 доволни клиенти"
            >
              <span className="text-xl" aria-hidden="true">
                🌿
              </span>
              <div>
                <p className="font-sans font-semibold text-[13px] text-green-900 leading-none mb-0.5">
                 10+ години опит
                </p>
                <p className="font-sans text-[11px] text-neutral-500 leading-none">
                   в подкрепа на хората
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
