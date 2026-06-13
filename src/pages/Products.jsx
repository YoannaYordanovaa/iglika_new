import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, getOrderUrl } from "../api";
import Footer from "../components/Footer";

// ── Категории ──────────────────────────────────────────────────
const CATEGORIES = [
  { id: "shop", label: "Всички продукти", emoji: "🌿" },
  { id: "drinks", label: "Напитки", emoji: "🥤" },
  { id: "supplements", label: "Добавки", emoji: "💊" },
  { id: "face", label: "Грижа за лицето", emoji: "✨" },
  { id: "body", label: "Грижа за тялото", emoji: "🧴" },
  { id: "hygiene", label: "Лична хигиена", emoji: "🪥" },
  { id: "weight-loss", label: "Контрол на теглото", emoji: "⚖️" },
  { id: "packages", label: "Пакети", emoji: "🎁" },
];

const PER_PAGE = 12;

function parsePrice(price) {
  if (!price) return 0;
  return (
    parseFloat(
      price
        .toString()
        .replace(/,/g, "")
        .replace(/[^\d.-]/g, ""),
    ) || 0
  );
}

const EURO_RATE = 1.95583;

function toEuro(price) {
  return (parsePrice(price) / EURO_RATE).toFixed(2);
}

function toEuroDiscounted(price) {
  return ((parsePrice(price) * 0.85) / EURO_RATE).toFixed(2);
}

// ── Skeleton ───────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-neutral-100" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-3.5 bg-neutral-100 rounded w-3/4" />
        <div className="h-3 bg-neutral-100 rounded w-full" />
        <div className="h-3 bg-neutral-100 rounded w-2/3" />
        <div className="mt-2 flex justify-between items-center gap-2">
          <div className="h-6 bg-neutral-100 rounded w-16" />
          <div className="h-8 bg-neutral-100 rounded-pill w-20" />
        </div>
      </div>
    </div>
  );
}

// ── Продуктова карта ───────────────────────────────────────────
function ProductCard({ product }) {
  const [ordering, setOrdering] = useState(false);
  const price = parsePrice(product.price);

  async function handleOrder() {
    setOrdering(true);
    const url = await getOrderUrl(product.id);
    if (url !== "#") window.open(url, "_blank");
    setOrdering(false);
  }

  return (
    <div
      className="bg-white border border-neutral-100 rounded-2xl overflow-hidden
                    flex flex-col group
                    hover:shadow-[0_4px_24px_rgba(74,124,31,0.12)]
                    hover:-translate-y-0.5 transition-all duration-300"
    >
      <div
        className="relative aspect-square bg-white overflow-hidden
                      flex items-center justify-center p-4"
      >
        <img
          src={product.image3}
          alt={product.h1}
          className="w-full h-full object-contain
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/src/assets/Logo.svg";
            e.target.className = "w-16 h-16 object-contain opacity-20";
          }}
        />
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3
          className="font-serif font-semibold text-[13px] sm:text-[15px] text-green-600
                       leading-snug mb-1 line-clamp-2"
        >
          {product.h1}
        </h3>
        <p
          className="font-sans text-[11px] sm:text-[13px] text-neutral-400 leading-[1.6]
                      line-clamp-2 mb-3 flex-1"
        >
          {product.h2}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-neutral-50">
          <div>
            {/* Оригинална цена — зачеркната */}
            <p className="font-sans text-[11px] sm:text-[13px] text-neutral-400 line-through leading-none mb-0.5">
              €{toEuro(product.price)}
            </p>
            {/* Цена с отстъпка */}
            <div className="flex items-center gap-1.5">
              <p className="font-sans font-semibold text-[0.95rem] text-green-600 leading-none">
                €{toEuroDiscounted(product.price)}
              </p>
              <span
                className="font-sans text-[10px] sm:text-[12px] font-semibold bg-orange-50
                       text-orange-600 px-1.5 py-0.5 rounded-lg"
              >
                -15%
              </span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            disabled={ordering}
            className="inline-flex items-center justify-center gap-1.5 flex-shrink-0
                       w-full sm:w-auto
                       bg-green-600 hover:bg-green-800
                       disabled:opacity-60 disabled:cursor-wait
                       text-white font-sans font-semibold text-[12px] rounded-full
                       px-4 py-2 transition-colors duration-200 "
          >
            {ordering ? (
              <>
                <svg
                  className="animate-spin"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                 
                >
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Зарежда
              </>
            ) : (
              <>
                Поръчай
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Пагинация ──────────────────────────────────────────────────
function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;

  function pages() {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3)
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="w-9 h-9 flex items-center justify-center rounded-full
                         border border-neutral-200 text-neutral-500
                         hover:border-green-600 hover:text-green-700
                         disabled:opacity-30 disabled:cursor-default transition-colors"
        aria-label="Предишна страница"
      >
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
          <path d="M10 4l-4 4 4 4" />
        </svg>
      </button>
      {pages().map((p, i) =>
        p === "..." ? (
          <span
            key={`d${i}`}
            className="w-9 h-9 flex items-center justify-center
                                         font-sans text-[13px] text-neutral-400"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === current ? "page" : undefined}
            className={[
              "w-9 h-9 flex items-center justify-center rounded-full",
              "font-sans text-[13px] font-medium transition-colors",
              p === current
                ? "bg-green-600 text-white"
                : "border border-neutral-200 text-neutral-600 hover:border-green-600 hover:text-green-700",
            ].join(" ")}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="w-9 h-9 flex items-center justify-center rounded-full
                         border border-neutral-200 text-neutral-500
                         hover:border-green-600 hover:text-green-700
                         disabled:opacity-30 disabled:cursor-default transition-colors"
        aria-label="Следваща страница"
      >
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
          <path d="M6 4l4 4-4 4" />
        </svg>
      </button>
    </div>
  );
}

// ── Бутон "Обратно нагоре" ─────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Обратно нагоре"
      className={[
        "fixed bottom-6 right-6 z-40",
        "w-11 h-11 rounded-full bg-green-600 hover:bg-green-800",
        "text-white shadow-lg hover:shadow-xl",
        "flex items-center justify-center",
        "transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 10l4-4 4 4" />
      </svg>
    </button>
  );
}

// ══ ГЛАВЕН КОМПОНЕНТ ═══════════════════════════════════════════
export default function Products() {
  const [activeCategory, setActiveCategory] = useState("shop");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);

  const activeCat =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  useEffect(() => {
    setLoading(true);
    setPage(1);
    setSearch("");
    fetchProducts(activeCategory)
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  useEffect(() => {
    setPage(1);
  }, [search, sortBy]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const s = search.toLowerCase();
      return p.h1?.toLowerCase().includes(s) || p.h2?.toLowerCase().includes(s);
    });
    switch (sortBy) {
      case "price_asc":
        return [...result].sort(
          (a, b) => parsePrice(a.price) - parsePrice(b.price),
        );
      case "price_desc":
        return [...result].sort(
          (a, b) => parsePrice(b.price) - parsePrice(a.price),
        );
      case "name_asc":
        return [...result].sort((a, b) =>
          (a.h1 || "").localeCompare(b.h1 || ""),
        );
      case "name_desc":
        return [...result].sort((a, b) =>
          (b.h1 || "").localeCompare(a.h1 || ""),
        );
      default:
        return result;
    }
  }, [products, search, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const currentItems = useMemo(() => {
    return filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  }, [filtered, page]);

  function handlePageChange(p) {
    setPage(p);
    document
      .getElementById("products-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleCategoryChange(id) {
    setActiveCategory(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <main className="min-h-screen bg-[#FAFAF7]">
        {/* ── Breadcrumb + Хедър ───────────────────────── */}
        <div className="bg-white border-b border-neutral-100">
          <div className="max-w-content mx-auto px-5 sm:px-8 pt-6 pb-8 sm:pb-10">
            {/* Breadcrumb */}
            <nav aria-label="Навигационен път" className="mb-5">
              <ol
                className="flex items-center gap-1.5 font-sans text-[12.5px]
                             text-neutral-400 flex-wrap"
              >
                <li>
                  <Link
                    to="/"
                    className="hover:text-green-600 transition-colors"
                  >
                    Начало
                  </Link>
                </li>
                <li aria-hidden="true">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </li>
                <li>
                  <Link
                    to="/products"
                    className={
                      activeCategory === "shop"
                        ? "text-green-600 font-medium"
                        : "hover:text-green-700 transition-colors"
                    }
                  >
                    Продукти
                  </Link>
                </li>
                {activeCategory !== "shop" && (
                  <>
                    <li aria-hidden="true">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 4l4 4-4 4" />
                      </svg>
                    </li>
                    <li>
                      <span
                        className="text-green-600 font-medium"
                        aria-current="page"
                      >
                        {activeCat.label}
                      </span>
                    </li>
                  </>
                )}
              </ol>
            </nav>

            {/* Заглавие */}
            <p className="eyebrow text-orange-600 mb-2 flex items-center gap-2">
              <span
                className="inline-block w-5 h-px bg-orange-400"
                aria-hidden="true"
              />
              Forever Living Products
            </p>
            <h1
              className="font-serif font-semibold text-green-600
                           text-[1.75rem] sm:text-[2.1rem] leading-[1.2]"
            >
              <span aria-hidden="true">{activeCat.emoji} </span>
              {activeCat.label}
            </h1>
          </div>
        </div>

        {/* ── Основен layout: sidebar + съдържание ─────── */}
        <div className="max-w-content mx-auto px-5 sm:px-8 py-8">
          <div className="flex gap-8 items-start">
            {/* ── Sidebar — категории (само десктоп) ─────── */}
            <aside
              className="hidden lg:flex flex-col gap-1 w-60 flex-shrink-0 sticky top-24"
              aria-label="Категории"
            >
              <p
                className="font-sans text-[11px] font-semibold uppercase
                            tracking-[0.1em] text-neutral-400 px-3 mb-2"
              >
                Категории
              </p>
              {CATEGORIES.map(({ id, label, emoji }) => {
                const count =
                  id === activeCategory && !loading ? filtered.length : null;
                return (
                  <button
                    key={id}
                    onClick={() => handleCategoryChange(id)}
                    className={[
                      "flex items-center gap-2.5 w-full text-left",
                      "font-sans text-[13.5px] font-medium",
                      "px-3 py-2.5 rounded-xl transition-colors duration-200",
                      activeCategory === id
                        ? "bg-green-600 text-white"
                        : "text-neutral-600 hover:bg-white hover:text-green-700",
                    ].join(" ")}
                  >
                    <span
                      className="text-[15px] flex-shrink-0"
                      aria-hidden="true"
                    >
                      {emoji}
                    </span>
                    <span className="flex-1">{label}</span>
                    {count !== null && (
                      <span
                        className={[
                          "font-sans text-[11px] font-semibold rounded-full px-1.5 py-0.5",
                          activeCategory === id
                            ? "bg-white/20 text-white"
                            : "bg-neutral-100 text-neutral-400",
                        ].join(" ")}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </aside>

            {/* ── Главна зона ──────────────────────────── */}
            <div className="flex-1 min-w-0" id="products-top">
              {/* Табове — само мобилно и таблет */}
              <div
                className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 mb-6
                              -mx-5 px-5 scrollbar-none"
              >
                {CATEGORIES.map(({ id, label, emoji }) => (
                  <button
                    key={id}
                    onClick={() => handleCategoryChange(id)}
                    className={[
                      "flex items-center gap-1.5 flex-shrink-0",
                      "font-sans font-medium text-[12.5px]",
                      "px-6 py-3 rounded-4xl transition-colors duration-200",
                      activeCategory === id
                        ? "bg-green-600 text-white"
                        : "bg-white border border-neutral-200 text-neutral-600 hover:border-green-600",
                    ].join(" ")}
                  >
                    <span aria-hidden="true">{emoji}</span>
                    {label}
                  </button>
                ))}
              </div>

              {/* Търсене + сортиране */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                  <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-300"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Търси продукт..."
                    className="w-full bg-white border border-neutral-200 rounded-xl
                               pl-9 pr-4 py-2.5 font-sans text-[13.5px] text-neutral-800
                               placeholder:text-neutral-300
                               focus:outline-none focus:border-neutral-400
                               "
                  />
                </div>
                <div className="relative w-full sm:w-auto">
                  {/* Стрелка вдясно */}
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-neutral-200 rounded-xl
               w-full sm:w-auto
               pl-4 pr-9 py-2.5 font-sans text-[13.5px] text-neutral-600
               focus:outline-none focus:border-neutral-400
               transition-colors cursor-pointer"
                  >
                    <option value="default">Сортирай по</option>
                    <option value="price_asc">Цена: Ниска → Висока</option>
                    <option value="price_desc">Цена: Висока → Ниска</option>
                    <option value="name_asc">Име: А → Я</option>
                    <option value="name_desc">Име: Я → А</option>
                  </select>
                </div>
              </div>

              {/* Брой резултати */}
              {!loading && (
                <p className="font-sans text-[12px] text-neutral-400 mb-5">
                  {filtered.length === 0
                    ? "Няма намерени продукти"
                    : `${filtered.length} продукта${search ? ` за „${search}"` : ""}`}
                </p>
              )}

              {/* Решетка */}
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-[2.5rem] mb-3" aria-hidden="true">
                    🌿
                  </p>
                  <p className="font-serif font-semibold text-green-600 text-[1.2rem] mb-2">
                    Няма намерени продукти
                  </p>
                  <p className="font-sans text-[14px] text-neutral-400">
                    Опитай с друго търсене или избери различна категория.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {currentItems.map((product, idx) => (
                      <ProductCard
                        key={`${activeCategory}-${page}-${product.id}-${idx}`}
                        product={product}
                      />
                    ))}
                  </div>
                  <Pagination
                    current={page}
                    total={totalPages}
                    onChange={handlePageChange}
                  />
                  {totalPages > 1 && (
                    <p className="font-sans text-[12px] text-neutral-400 text-center mt-3">
                      Страница {page} от {totalPages}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}