
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Search as SearchIcon,
  X,
  Clock3,
  TrendingUp,
  SlidersHorizontal,
} from "lucide-react";
import products from "../Data/Product";

const STORAGE_KEY = "nilaash_recent_searches";

function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [recentSearches, setRecentSearches] = useState([]);
  const [sortBy, setSortBy] = useState("relevant");

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setRecentSearches(Array.isArray(saved) ? saved : []);
    } catch {
      setRecentSearches([]);
    }
  }, []);

  // Keep the input synchronized with the URL query.
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const saveRecentSearch = (value) => {
    const trimmed = value.trim();

    if (!trimmed) return;

    const updated = [
      trimmed,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase()
      ),
    ].slice(0, 10);

    setRecentSearches(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Search still works if storage is unavailable.
    }
  };

  const submitSearch = (value = query) => {
    const trimmed = value.trim();

    if (!trimmed) {
      setSearchParams({});
      return;
    }

    saveRecentSearch(trimmed);
    setQuery(trimmed);
    setSearchParams({ q: trimmed });
  };

  const removeRecentSearch = (value) => {
    const updated = recentSearches.filter(
      (item) => item !== value
    );

    setRecentSearches(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors.
    }
  };

  const clearHistory = () => {
    setRecentSearches([]);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  };

  // Filter products on this page.
  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return [];

    const matched = products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.keywords || "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(value);
    });

    if (sortBy === "price-low") {
      return [...matched].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "price-high") {
      return [...matched].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sortBy === "name") {
      return [...matched].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return matched;
  }, [query, sortBy]);

  const popularSearches = [
    "Sarees",
    "Kurtas",
    "Dhoti",
    "Mundu",
    "Handloom Cotton",
    "New Arrivals",
  ];

  const hasSearch = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#fffaf2]">
      {/* Search header */}
      <div className="sticky top-0 z-40 border-b border-[#eadfce] bg-white px-3 py-3 shadow-sm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitSearch();
          }}
          className="mx-auto flex max-w-6xl items-center gap-2"
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex h-10 w-9 shrink-0 items-center justify-center text-[#52080f]"
          >
            <ArrowLeft size={22} />
          </button>

          <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#e6d8c4] bg-[#fffaf2] px-3 focus-within:border-[#8b5b43]">
            <SearchIcon
              size={18}
              className="shrink-0 text-[#7b5550]"
            />

            <input
              autoFocus
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sarees, kurtas, dhotis..."
              className="min-w-0 flex-1 bg-transparent text-sm text-[#3d2020] outline-none placeholder:text-gray-400"
            />

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSearchParams({});
                }}
                aria-label="Clear search"
                className="shrink-0 text-gray-500"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="shrink-0 rounded-lg bg-[#650b13] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#52080f]"
          >
            Search
          </button>
        </form>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Search results */}
        {hasSearch ? (
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#52080f] sm:text-2xl">
                  Search Results
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""} found for
                  {" "}
                  <span className="font-semibold text-[#650b13]">
                    "{query.trim()}"
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-[#e6d8c4] bg-white px-3 py-2">
                <SlidersHorizontal size={16} className="text-[#650b13]" />

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="max-w-[160px] bg-transparent text-xs text-[#493535] outline-none"
                  aria-label="Sort products"
                >
                  <option value="relevant">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="group min-w-0 overflow-hidden rounded-xl border border-[#eee3d5] bg-white text-left transition duration-200 hover:-translate-y-1 hover:border-[#d7bca0] hover:shadow-lg"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-[#f5ecdf]">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-3">
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#9a7770]">
                        {product.category}
                      </p>

                      <h2 className="line-clamp-2 min-h-10 text-sm font-medium text-[#3d2020]">
                        {product.name}
                      </h2>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-[#650b13]">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </span>

                        {product.originalPrice &&
                          Number(product.originalPrice) >
                            Number(product.price) && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹
                              {Number(product.originalPrice).toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          )}
                      </div>

                      <div className="mt-3 border-t border-[#f0e6da] pt-2 text-xs font-semibold text-[#650b13]">
                        View Product →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#eee3d5] bg-white px-5 py-14 text-center">
                <SearchIcon
                  size={35}
                  className="mx-auto mb-3 text-[#b9a49a]"
                />

                <h2 className="text-base font-semibold text-[#52080f]">
                  No products found
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                  We couldn't find products matching "{query}". Try a
                  different product name or category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSearchParams({});
                  }}
                  className="mt-5 rounded-lg bg-[#650b13] px-5 py-3 text-sm font-semibold text-white"
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <section className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-sm font-bold text-[#52080f]">
                    <Clock3 size={17} />
                    Recent Searches
                  </h2>

                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-xs font-semibold text-[#8a343b]"
                  >
                    Clear all
                  </button>
                </div>

                <div className="divide-y divide-[#eee3d5] rounded-xl border border-[#eee3d5] bg-white px-3">
                  {recentSearches.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 py-3"
                    >
                      <Clock3
                        size={16}
                        className="shrink-0 text-gray-400"
                      />

                      <button
                        type="button"
                        onClick={() => submitSearch(item)}
                        className="min-w-0 flex-1 truncate text-left text-sm text-[#493535]"
                      >
                        {item}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeRecentSearch(item)}
                        aria-label={`Remove ${item} from recent searches`}
                        className="shrink-0 p-1 text-gray-400 hover:text-[#650b13]"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Popular searches */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#52080f]">
                <TrendingUp size={17} />
                Popular Searches
              </h2>

              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => submitSearch(item)}
                    className="rounded-full border border-[#e6d8c4] bg-white px-4 py-2.5 text-xs font-medium text-[#650b13] transition hover:border-[#650b13] hover:bg-[#650b13] hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            {recentSearches.length === 0 && (
              <p className="mt-8 text-center text-xs text-gray-500">
                Your recent searches will appear here.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Search;
