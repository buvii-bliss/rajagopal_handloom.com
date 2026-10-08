
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search as SearchIcon,
  X,
  Clock3,
  Trash2,
  TrendingUp,
} from "lucide-react";
import products from "../Data/Product";

const STORAGE_KEY = "nilaash_recent_searches";

function Search({ onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

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

  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return [];

    return products
      .filter((product) => {
        const searchableText = [
          product.name,
          product.category,
          product.keywords || "",
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(value);
      })
      .slice(0, 8);
  }, [query]);

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
      // Search still works if localStorage is unavailable.
    }
  };

  const submitSearch = (value = query) => {
    const trimmed = value.trim();

    if (!trimmed) return;

    saveRecentSearch(trimmed);
    onSearch?.(trimmed);
    navigate("/");
  };

  const removeRecentSearch = (value) => {
    const updated = recentSearches.filter((item) => item !== value);

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

  return (
    <div className="min-h-screen bg-[#fffaf2]">
      {/* Search header */}
      <div className="sticky top-0 z-40 border-b border-[#eadfce] bg-white px-3 py-3 shadow-sm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitSearch();
          }}
          className="mx-auto flex max-w-3xl items-center gap-2"
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
            <SearchIcon size={18} className="shrink-0 text-[#7b5550]" />

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
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="shrink-0 text-gray-500"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="shrink-0 text-sm font-semibold text-[#650b13]"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-5">
        {/* Live product suggestions */}
        {query.trim() && (
          <section className="mb-7">
            <h2 className="mb-3 text-sm font-bold text-[#52080f]">
              Products
            </h2>

            {suggestions.length > 0 ? (
              <div className="divide-y divide-[#eee3d5] rounded-xl bg-white px-3">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="flex w-full items-center gap-3 py-3 text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 shrink-0 rounded-lg bg-[#f5ecdf] object-cover"
                    />

                    <span className="min-w-0 flex-1">
                      <span className="block line-clamp-2 text-sm font-medium text-[#3d2020]">
                        {product.name}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        {product.category}
                      </span>
                      <span className="mt-1 block text-sm font-bold text-[#650b13]">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>
                    </span>

                    <SearchIcon
                      size={16}
                      className="shrink-0 text-gray-400"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-lg bg-white p-4 text-sm text-gray-500">
                No matching products found. Try another search.
              </p>
            )}

            <button
              type="button"
              onClick={() => submitSearch()}
              className="mt-3 w-full rounded-lg bg-[#650b13] py-3 text-sm font-semibold text-white"
            >
              Search for "{query.trim()}"
            </button>
          </section>
        )}

        {/* Recent searches */}
        {!query.trim() && recentSearches.length > 0 && (
          <section className="mb-7">
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

            <div className="divide-y divide-[#eee3d5] rounded-xl bg-white px-3">
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
                    onClick={() => {
                      setQuery(item);
                      submitSearch(item);
                    }}
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
        {!query.trim() && (
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#52080f]">
              <TrendingUp size={17} />
              Popular Searches
            </h2>

            <div className="flex flex-wrap gap-2">
              {[
                "Sarees",
                "Kurtas",
                "Dhoti",
                "Mundu",
                "Handloom Cotton",
                "New Arrivals",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setQuery(item);
                    submitSearch(item);
                  }}
                  className="rounded-full border border-[#e6d8c4] bg-white px-3 py-2 text-xs font-medium text-[#650b13] transition hover:border-[#650b13]"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        )}

        {!query.trim() && recentSearches.length === 0 && (
          <p className="mt-6 text-center text-xs text-gray-500">
            Your recent searches will appear here.
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;