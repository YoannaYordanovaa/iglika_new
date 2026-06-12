import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <a href="/" onClick={handleClick} className="flex items-center group">
      <img
        src="/src/assets/Logo.svg"
        alt="Иглика Величкова"
        className="h-38 w-auto object-contain"
      />
    </a>
  );
}

function AnchorLink({ to, label, className, onClick, onActivate }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(e) {
    e.preventDefault();
    const hash = to.replace("/#", "");
    if (onActivate) onActivate();
    if (onClick) onClick();

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
    <a href={to} onClick={handleClick} className={className}>
      {label}
    </a>
  );
}

const NAV_LINKS = [
  { to: "/",              label: "За мен",       scrollTop: true },
  { to: "/produkti",      label: "Продукти"                      },
  { to: "/prisaedini-se", label: "Присъедини се"                 },
];

const VIBER_NUMBER = "359887663362";
const VIBER_URL    = `viber://chat?number=%2B${VIBER_NUMBER}`;

const activeClass =
  "nav-active font-sans text-[13.5px] font-medium text-[#4A7C1F] relative pt-1";
const inactiveClass =
  "nav-inactive font-sans text-[13.5px] font-medium text-[#6B6960] hover:text-[#4A7C1F] transition-colors duration-200 relative pt-1";

export default function Navbar() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [activeAnchor, setActiveAnchor] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Нулирай активния anchor при смяна на страница
  useEffect(() => {
    setActiveAnchor(null);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Активен ли е линкът
  function isLinkActive(to, scrollTop) {
    if (activeAnchor) return false          // anchor е активен — всичко останало е неактивно
    if (scrollTop) return location.pathname === "/"
    return false
  }

  const navLinkClass = ({ isActive }) =>
    (isActive && !activeAnchor) ? activeClass : inactiveClass;

  const anchorMobileClass =
    "font-sans text-[15px] font-medium text-neutral-700 hover:text-green-600 px-3 py-3 rounded-xl hover:bg-green-50 transition-colors";

  function handleScrollTop(e, closeMobile = false) {
    e.preventDefault();
    setActiveAnchor(null);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (closeMobile) setMenuOpen(false);
  }

  return (
    <>
      <style>{`
        .nav-active::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: #D4A017;
          border-radius: 50%;
          animation: dotBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes dotBounce {
          0%   { transform: translateX(-50%) scale(0) translateY(-4px); opacity: 0; }
          60%  { transform: translateX(-50%) scale(1.4) translateY(2px);  opacity: 1; }
          100% { transform: translateX(-50%) scale(1)   translateY(0);    opacity: 1; }
        }
      `}</style>

      {/* ── Navbar ───────────────────────────────────────── */}
      <header
        className={[
          "fixed top-0 left-0 right-0 w-full z-50 bg-white transition-shadow duration-300",
          scrolled
            ? "shadow-[0_1px_12px_rgba(0,0,0,0.08)]"
            : "border-b border-neutral-100",
        ].join(" ")}
      >
        <div className="max-w-content mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">

          <Logo />

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Главна навигация">
            {NAV_LINKS.map(({ to, label, anchor, scrollTop }) => {
              if (anchor) {
                return (
                  <AnchorLink
                    key={to}
                    to={to}
                    label={label}
                    className={activeAnchor === to ? activeClass : inactiveClass}
                    onActivate={() => setActiveAnchor(to)}
                  />
                );
              }
              if (scrollTop) {
                return (
                  <a
                    key={to}
                    href={to}
                    onClick={(e) => handleScrollTop(e)}
                    className={isLinkActive(to, true) ? activeClass : inactiveClass}
                  >
                    {label}
                  </a>
                );
              }
              return (
                <NavLink
                  key={to}
                  to={to}
                  end
                  onClick={() => setActiveAnchor(null)}
                  className={navLinkClass}
                >
                  {label}
                </NavLink>
              );
            })}
          </nav>

          {/* Десктоп CTA */}
          <a
            href={VIBER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-800
                       text-white font-sans text-[13px] font-semibold
                       px-6 py-3 rounded-pill transition-colors duration-200 rounded-4xl flex-shrink-0"
            aria-label="Свържи се с Иглика в Viber"
          >
            <ViberIcon size={16} />
            Свържи се с мен
          </a>

          {/* Хамбургер */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]
                       rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label={menuOpen ? "Затвори меню" : "Отвори меню"}
            aria-expanded={menuOpen}
          >
            <span className={["block w-5 h-[1.5px] bg-neutral-700 transition-all duration-300 origin-center", menuOpen ? "translate-y-[6.5px] rotate-45" : ""].join(" ")} />
            <span className={["block w-5 h-[1.5px] bg-neutral-700 transition-all duration-300", menuOpen ? "opacity-0 scale-x-0" : ""].join(" ")} />
            <span className={["block w-5 h-[1.5px] bg-neutral-700 transition-all duration-300 origin-center", menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""].join(" ")} />
          </button>

        </div>
      </header>

      {/* ── Overlay ──────────────────────────────────────── */}
      <div
        className={["fixed inset-0 z-40 bg-black/30 md:hidden transition-opacity duration-300", menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"].join(" ")}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Drawer ───────────────────────────────────────── */}
      <div
        className={["fixed top-0 right-0 bottom-0 z-40 w-72 bg-white md:hidden", "flex flex-col pt-20 pb-8 px-6", "transition-transform duration-300 ease-in-out", menuOpen ? "translate-x-0" : "translate-x-full"].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Мобилна навигация"
      >
        <nav className="flex flex-col gap-1" aria-label="Мобилна навигация">
          {NAV_LINKS.map(({ to, label, anchor, scrollTop }) => {
            if (anchor) {
              return (
                <AnchorLink
                  key={to}
                  to={to}
                  label={label}
                  onClick={() => setMenuOpen(false)}
                  onActivate={() => setActiveAnchor(to)}
                  className={[
                    "font-sans text-[15px] font-medium px-3 py-3 rounded-xl transition-colors",
                    activeAnchor === to
                      ? "text-green-600 bg-green-50"
                      : "text-neutral-700 hover:text-green-600 hover:bg-green-50",
                  ].join(" ")}
                />
              );
            }
            if (scrollTop) {
              return (
                <a
                  key={to}
                  href={to}
                  onClick={(e) => handleScrollTop(e, true)}
                  className={[
                    "font-sans text-[15px] font-medium px-3 py-3 rounded-xl transition-colors",
                    isLinkActive(to, true)
                      ? "text-green-600 bg-green-50"
                      : "text-neutral-700 hover:text-green-600 hover:bg-green-50",
                  ].join(" ")}
                >
                  {label}
                </a>
              );
            }
            return (
              <NavLink
                key={to}
                to={to}
                end
                onClick={() => { setMenuOpen(false); setActiveAnchor(null); }}
                className={({ isActive }) =>
                  ["font-sans text-[15px] font-medium px-3 py-3 rounded-xl transition-colors",
                    (isActive && !activeAnchor) ? "text-green-600 bg-green-50" : "text-neutral-700 hover:text-green-600 hover:bg-green-50",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            );
          })}
        </nav>

        <div className="my-6 h-px bg-neutral-100" />

        <a
          href={VIBER_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center gap-2.5 bg-[#7360F2] hover:bg-[#5a4bd1]
                     text-white font-sans text-[14px] font-semibold
                     px-6 py-3 rounded-4xl rounded-pill transition-colors duration-200"
        >
          <ViberIcon size={18} />
          Свържи се в Viber
        </a>

        <div className="mt-auto flex items-center gap-4 px-1">
          <span className="font-sans text-[11px] text-neutral-400 uppercase tracking-wider">
            Следвай ме
          </span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="text-neutral-400 hover:text-orange-600 transition-colors" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
             className="text-neutral-400 hover:text-green-600 transition-colors" aria-label="Facebook">
            <FacebookIcon />
          </a>
        </div>
      </div>

      <div className="h-16" aria-hidden="true" />
    </>
  );
}

function ViberIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.997 0C5.375 0 .005 5.37.005 11.992c0 2.096.549 4.15 1.593 5.96L.054 24l6.235-1.635a11.98 11.98 0 005.708 1.453h.005C18.624 23.818 24 18.45 24 11.829 24 5.37 18.624 0 11.997 0zm0 21.818h-.004a9.944 9.944 0 01-5.073-1.387l-.364-.216-3.773 1.018 1.018-3.696-.237-.38a9.927 9.927 0 01-1.524-5.285C2.04 6.47 6.476 2.04 12 2.04c5.523 0 9.96 4.43 9.96 9.79 0 5.522-4.437 9.988-9.963 9.988zm5.456-7.39c-.298-.149-1.765-.87-2.038-.968-.273-.1-.472-.149-.67.149-.198.298-.769.968-.943 1.167-.173.198-.347.223-.645.074-.298-.149-1.26-.464-2.4-1.48-.887-.791-1.485-1.768-1.659-2.066-.174-.298-.018-.459.13-.607.134-.134.298-.348.447-.521.15-.174.199-.298.299-.497.1-.198.05-.372-.025-.521-.075-.149-.67-1.613-.917-2.209-.242-.58-.488-.501-.67-.51-.173-.008-.372-.01-.571-.01-.199 0-.521.075-.794.373-.273.298-1.042 1.018-1.042 2.483 0 1.464 1.067 2.879 1.216 3.077.148.198 2.099 3.205 5.086 4.494.711.307 1.266.491 1.699.628.714.227 1.364.195 1.877.118.572-.085 1.765-.721 2.013-1.417.248-.695.248-1.29.174-1.415-.074-.124-.273-.198-.571-.347z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}