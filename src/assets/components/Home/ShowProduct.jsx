
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Zap } from "lucide-react";
import products from "../../Data/Product";
import CartAnime from "../Animation/CartAnime";

function ShowProduct({
    selectedCategory,
    searchQuery = "",
    wishlist = [],
    toggleWishlist,
    addToCart,
}) {
    const navigate = useNavigate();
    const query = searchQuery.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const searchableText = `
            ${product.name}
            ${product.category}
            ${product.keywords || ""}
        `.toLowerCase();

        const matchesSearch =
            !query || searchableText.includes(query);

        return matchesCategory && matchesSearch;
    });

    const handleBuyNow = (product) => {
        navigate("/checkout", {
            state: {
                product,
                quantity: 1,
                buyNow: true,
            },
        });
    };

    return (
        <section
            id="products-section"
            className="bg-[#fffaf2] px-4 pb-7"
            style={{ scrollMarginTop: "220px" }}
        >
            <div className="mx-auto max-w-7xl">
                <div className="mb-3 flex items-center justify-between">
                    <div>
                        <h2 className="font-serif text-xl font-bold text-[#52080f] sm:text-2xl">
                            {searchQuery.trim()
                                ? "Search Results"
                                : selectedCategory === "All"
                                ? "Best Sellers"
                                : selectedCategory}
                        </h2>

                        {searchQuery.trim() && (
                            <p className="mt-0.5 text-xs text-gray-500">
                                Showing results for "{searchQuery}"
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            navigate("/");
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                        className="text-xs font-semibold text-[#650b13] sm:text-sm"
                    >
                        View All →
                    </button>
                </div>

                {filteredProducts.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {filteredProducts.map((product) => {
                            const isWishlisted = wishlist.some(
                                (item) =>
                                    String(
                                        typeof item === "object"
                                            ? item.id
                                            : item
                                    ) === String(product.id)
                            );

                            return (
                                <div
                                    key={product.id}
                                    className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#eadfce] bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="block"
                                    >
                                        <div className="relative aspect-square overflow-hidden rounded-md bg-[#f5ecdf]">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            {product.originalPrice > product.price && (
                                                <span className="absolute left-1.5 top-1.5 rounded bg-[#650b13] px-1.5 py-1 text-[9px] font-bold text-white sm:text-[10px]">
                                                    {Math.round(
                                                        ((product.originalPrice - product.price) /
                                                            product.originalPrice) *
                                                            100
                                                    )}
                                                    % OFF
                                                </span>
                                            )}

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleWishlist?.(product);
                                                }}
                                                aria-label="Toggle wishlist"
                                                className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
                                                    isWishlisted
                                                        ? "scale-110 text-[#c2182b]"
                                                        : "text-[#650b13] hover:scale-110"
                                                }`}
                                            >
                                                <svg
                                                    className={`h-5 w-5 ${
                                                        isWishlisted
                                                            ? "fill-current"
                                                            : "fill-none"
                                                    }`}
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                >
                                                    <path
                                                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="px-1 pt-2">
                                            <h3 className="line-clamp-2 min-h-[36px] text-xs font-medium leading-4 text-[#3d2020]">
                                                {product.name}
                                            </h3>

                                            <div className="mt-1 flex flex-wrap items-center gap-1.5">
                                                <p className="text-sm font-bold text-[#2d1a1a] sm:text-base">
                                                    ₹{product.price.toLocaleString("en-IN")}
                                                </p>

                                                {product.originalPrice > product.price && (
                                                    <p className="text-[10px] text-gray-400 line-through">
                                                        ₹{product.originalPrice.toLocaleString("en-IN")}
                                                    </p>
                                                )}
                                            </div>

                                            {/* <div className="mt-1 flex items-center gap-1">
                                                <span className="text-xs text-[#e4a900]">
                                                    ★
                                                </span>
                                                <span className="text-[11px] font-semibold text-[#3d2020]">
                                                    {product.rating}
                                                </span>
                                                <span className="text-[9px] text-gray-400">
                                                    ({product.reviews})
                                                </span>
                                            </div> */}
                                        </div>
                                    </Link>

   <div className="mt-3 grid grid-cols-2 items-center gap-2">
  {/* Animated Add to Cart */}
  <div className="min-w-0 [&>button]:!mt-0 [&>button]:!h-9 [&>button]:!rounded-lg [&>button]:!px-1 [&>button]:!text-[11px] sm:[&>button]:!text-xs">
    <CartAnime onAdd={() => addToCart?.(product)} />
  </div>

  {/* Buy Now */}
  <button
    type="button"
    onClick={() =>
      navigate("/checkout", {
        state: {
          product,
          quantity: 1,
          buyNow: true,
        },
      })
    }
    className="flex h-9 min-w-0 items-center justify-center gap-1
               rounded-lg bg-[#F0BE4F] px-1 text-[11px]
               font-semibold text-[#331934] transition
               hover:bg-[#e3ad35] active:scale-[0.98]
               sm:text-xs"
  >
    <Zap size={14} className="shrink-0" />
    <span className="truncate">Buy Now</span>
  </button>
</div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {filteredProducts.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-sm font-semibold text-[#52080f]">
                            No products found
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Try searching for another product or category.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ShowProduct;