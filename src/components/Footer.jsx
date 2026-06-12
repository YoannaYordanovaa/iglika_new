import { Link } from "react-router-dom";

const VIBER_NUMBER = "+359 88 766 3362";
const WHATSAPP_MSG = encodeURIComponent("Здравей, Иглика!");
const VIBER_URL = `viber://chat?number=%2B${VIBER_NUMBER}`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-white">
      {/* Горна лента — CTA */}
      <div className="border-b border-white/10">
        <div
          className="max-w-content mx-auto px-5 sm:px-8 py-10
                        flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div>
            <p className="font-serif font-semibold text-[1.25rem] mb-1">
              Готова да направиш стъпката?
            </p>
            <p className="font-sans text-[13.5px] text-white/60 leading-snug">
              Свържи се с мен - без задължения, без натиск.
            </p>
          </div>
          <a
            href={VIBER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 bg-gold-400 hover:bg-gold-600
                       text-green-900 font-sans font-semibold text-[13.5px]
                       px-6 py-3 rounded-pill transition-colors duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Свържи се сега
          </a>
        </div>
      </div>

      {/* Средна лента — навигация */}
      <div
        className="max-w-content mx-auto px-5 sm:px-8 py-10
                      grid grid-cols-1 sm:grid-cols-3 gap-8"
      >
        {/* Лого */}
        <div>
          <Link to="/" className="inline-block mb-3">
            <p className="font-serif font-semibold text-[1.1rem] text-white">
              Иглика Величкова
            </p>
            <p
              className="font-sans text-[10.5px] font-medium uppercase tracking-[0.12em]
                          text-white/40 mt-0.5"
            >
              Здраве · Успех
            </p>
          </Link>
          <p className="font-sans text-[13px] text-white/50 leading-[1.75] max-w-[24ch]">
            Вдъхновявам хората да изградят по-здравословни навици и да открият
            нови възможности за развитие.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <p
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em]
                        text-white/40 mb-4"
          >
            Навигация
          </p>
          <ul className="space-y-2.5">
            {[
              { to: "/", label: "За мен" },
              { to: "/produkti", label: "Продукти" },
              { to: "/prisaedini-se", label: "Присъедини се" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="font-sans text-[13.5px] text-white/60 hover:text-white
                             transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Контакт */}
        <div>
          <p
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em]
                        text-white/40 mb-4"
          >
            Контакт
          </p>
          <div className="space-y-3">
            <a
              href={VIBER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-sans text-[13.5px]
                         text-white/60 hover:text-white transition-colors"
            >
              <span className="text-base" aria-hidden="true">
                💬
              </span>
              Viber
            </a>
            <a
              href="https://instagram.com/iglika.velichkova"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-sans text-[13.5px]
                         text-white/60 hover:text-white transition-colors"
            >
              <span className="text-base" aria-hidden="true">
                📷
              </span>
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-sans text-[13.5px]
                         text-white/60 hover:text-white transition-colors"
            >
              <span className="text-base" aria-hidden="true">
                👍
              </span>
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Долна лента — copyright */}
      <div className="border-t border-white/10">
        <div
          className="max-w-content mx-auto px-5 sm:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p className="font-sans text-[12px] text-white/42">
            © {year} Иглика Величкова. Всички права запазени.
          </p>
          <p className="font-sans text-[12px] text-white/42">
            Собственик на Форевър бизнес
          </p>
          <Link
            to="/obshti-uslovia"
            className="font-sans text-[12px] text-white/42 underline hover:text-white/70 transition-colors"
          >
            Общи условия
          </Link>
        </div>
      </div>
    </footer>
  );
}
