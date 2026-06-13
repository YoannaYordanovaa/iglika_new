import { Link, useNavigate, useLocation } from "react-router-dom";

const VIBER_NUMBER = "359887663362";
const VIBER_URL = `viber://chat?number=%2B${VIBER_NUMBER}`;

export default function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  function handleAnchorClick(e, hash) {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  }

  return (
    <footer className="bg-[#FAFAF7] text-neutral-700 border-t border-neutral-300">
      {/* Горна лента — CTA */}
      <div className="border-b border-neutral-200">
        <div
          className="max-w-content mx-auto px-5 sm:px-8 py-10
                      flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div>
            <p className="font-serif font-semibold text-[1.25rem] text-green-900 mb-1">
              Дойде ли моментът за твоята следваща стъпка?
            </p>
            <p className="font-sans text-[13.5px] text-neutral-500 leading-snug">
              Свържи се с мен — без задължения, без натиск.
            </p>
          </div>
          <a
            href={VIBER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 hover:text-green-800
                       text-green-600 font-sans font-semibold text-[13.5px]
                       px-6 py-3 transition-colors duration-200"
          >
            <ViberIcon size={16} />
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
            <p className="font-serif font-semibold text-[1.1rem] text-green-900">
              Иглика Величкова
            </p>
            <p
              className="font-sans text-[10.5px] font-medium uppercase tracking-[0.12em]
                          text-orange-600 mt-0.5"
            >
              Здраве · Вдъхновение · Успех
            </p>
          </Link>
          <p className="font-sans text-[13px] text-neutral-500 leading-[1.75] max-w-[24ch]">
            Вдъхновявам хората да изградят по-здравословни навици и да открият
            нови възможности за развитие.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <p
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em]
                        text-neutral-400 mb-4"
          >
            Навигация
          </p>
          <ul className="space-y-2.5">
            {[
              { to: "/",              label: "Начало" },
              { to: "/#about",       label: "За мен",   anchor: "about" },
              { to: "/products",      label: "Продукти" },
              { to: "/join", label: "Присъедини се" },
              { to: "/#contacts",     label: "Контакти", anchor: "contacts" },
            ].map(({ to, label, anchor }) => (
              <li key={to}>
                {anchor ? (
                  <a
                    href={to}
                    onClick={(e) => handleAnchorClick(e, anchor)}
                    className="font-sans text-[13.5px] text-neutral-600 hover:text-green-700
                               transition-colors duration-150"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    to={to}
                    className="font-sans text-[13.5px] text-neutral-600 hover:text-green-700
                               transition-colors duration-150"
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Контакт */}
        <div>
          <p
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em]
                        text-neutral-400 mb-4"
          >
            Контакти
          </p>
          <div className="space-y-3">
            <a
              href={`tel:+${VIBER_NUMBER}`}
              className="flex items-center gap-2.5 font-sans text-[13.5px]
                         text-neutral-600 hover:text-green-600 transition-colors"
            >
              <span className="text-black">
                <PhoneIcon size={16} />
              </span>
              +{VIBER_NUMBER}
            </a>

            <a
              href={VIBER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-sans text-[13.5px]
                         text-neutral-600 hover:text-green-600 transition-colors"
            >
              <span className="text-[#7360F2]">
                <ViberIcon size={16} />
              </span>
              Viber
            </a>

            <a
              href="https://instagram.com/iglika.velichkova"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-sans text-[13.5px]
                         text-neutral-600 hover:text-green-600 transition-colors"
            >
              <span className="text-[#E1306C]">
                <InstagramIcon size={16} />
              </span>
              Instagram
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-sans text-[13.5px]
                         text-neutral-600 hover:text-green-600 transition-colors"
            >
              <span className="text-[#1877F2]">
                <FacebookIcon size={16} />
              </span>
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Долна лента — copyright */}
      <div className="border-t border-neutral-200">
        <div
          className="max-w-content mx-auto px-5 sm:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p className="font-sans text-[12px] text-neutral-400">
            © {year} Иглика Величкова. Всички права запазени.
          </p>
          <p className="font-sans text-[12px] text-neutral-400">
            Собственик на Форевър бизнес
          </p>
          <Link
            to="/Terms-and-Conditions"
            className="font-sans text-[12px] text-neutral-400 underline hover:text-green-600 transition-colors"
          >
            Общи условия
          </Link>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ViberIcon({ size = 16 }) {
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

function InstagramIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}