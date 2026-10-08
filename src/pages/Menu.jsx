
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    Heart,
    ShoppingCart,
    Zap,
    SlidersHorizontal,
    ChevronDown,
    X,
    Star,
} from "lucide-react";

import products from "../assets/Data/Product";
import Categories from "../assets/Data/Categories";
import CartAnime from "../assets/components/Animation/CartAnime";

const categories = Categories.map((category) => ({
    ...category,
    count:
        category.name === "All Products"
            ? products.length
            : products.filter(
                  (product) => product.category === category.name
              ).length,
}));

export default function Menu({ wishlist = [], toggleWishlist, addToCart }) {
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState("All Products");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("latest");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (activeCategory !== "All Products") {
            result = result.filter(
                (product) => product.category === activeCategory
            );
        }

        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();

            result = result.filter((product) => {
                const searchableText = [
                    product.name,
                    product.category,
                    ...(Array.isArray(product.keywords)
                        ? product.keywords
                        : [product.keywords]),
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(query);
            });
        }

        switch (sortBy) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;

            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;

            case "name":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case "rating":
                result.sort(
                    (a, b) => (b.rating || 0) - (a.rating || 0)
                );
                break;

            default:
                result.sort((a, b) => b.id - a.id);
        }

        return result;
    }, [activeCategory, searchTerm, sortBy]);

    // Buy Now
    const buyNow = (product) => {
        if (addToCart(product)) {
            navigate("/cart");
        }
    };

    // Shared category list
    const CategoryList = ({ mobile = false }) => (
        <div className="space-y-1">
            {categories.map((category) => (
                <button
                    key={category.name}
                    type="button"
                    onClick={() => {
                        setActiveCategory(category.name);

                        if (mobile) {
                            setMobileFiltersOpen(false);
                        }
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${
                        activeCategory === category.name
                            ? "bg-[#50070D] font-semibold text-[#E7C15F] shadow-sm"
                            : "text-[#5C3033] hover:bg-[#50070D]/[0.06] hover:text-[#50070D]"
                    }`}
                >
                    <span>{category.name}</span>

                    <span
                        className={`ml-3 text-xs ${
                            activeCategory === category.name
                                ? "text-[#E7C15F]"
                                : "text-[#9A7778]"
                        }`}
                    >
                        {category.count}
                    </span>
                </button>
            ))}
        </div>
    );

    return (
        <main className="min-h-screen bg-[#FFF9EF] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1500px]">
                {/* Page heading */}
                <div className="mb-7">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8A2027]">
                        Rajagopal Handloom Collection
                    </p>

                    <h1 className="font-serif text-3xl font-bold text-[#50070D] sm:text-4xl">
                        Shop All Collections
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#80696A]">
                        Discover timeless sarees, traditional handloom,
                        beautiful kids' collections, and styles for every
                        occasion.
                    </p>

                    <div className="mt-4 h-[2px] w-20 rounded-full bg-[#E7C15F]" />
                </div>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-10">
                    {/* Desktop sidebar */}
                    <aside className="sticky top-24 hidden rounded-2xl border border-[#50070D]/10 bg-white p-5 shadow-sm lg:block">
                        <div className="relative mb-7">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                placeholder="Search sarees, fabrics..."
                                className="w-full rounded-xl border border-[#50070D]/10 bg-[#FFF9EF] py-3 pl-4 pr-10 text-sm text-[#50070D] outline-none transition placeholder:text-[#A99595] focus:border-[#E7C15F] focus:ring-2 focus:ring-[#E7C15F]/30"
                            />

                            <Search
                                size={19}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#50070D]"
                            />
                        </div>

                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-serif text-2xl font-bold text-[#50070D]">
                                Categories
                            </h2>

                            <span className="rounded-full bg-[#E7C15F]/25 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#50070D]">
                                Shop
                            </span>
                        </div>

                        <CategoryList />

                        <div className="mt-7 rounded-xl bg-[#50070D] p-4 text-white">
                            <p className="font-serif text-lg font-semibold text-[#E7C15F]">
                                Tradition, beautifully woven.
                            </p>

                            <p className="mt-2 text-xs leading-5 text-white/75">
                                Find something special for yourself and your
                                family.
                            </p>

                            <span className="mt-3 block h-1 w-12 rounded-full bg-[#E7C15F]" />
                        </div>
                    </aside>

                    {/* Product listing */}
                    <section className="min-w-0">
                        {/* Results and sorting */}
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-[#6B484A]">
                                    Showing{" "}
                                    <span className="font-bold text-[#50070D]">
                                        {filteredProducts.length}
                                    </span>{" "}
                                    products
                                </p>

                                <p className="mt-1 text-xs text-[#9A7778]">
                                    {activeCategory}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(true)}
                                    className="flex items-center gap-2 rounded-xl border border-[#50070D]/15 bg-white px-3 py-2.5 text-sm text-[#50070D] lg:hidden"
                                >
                                    <SlidersHorizontal size={16} />
                                    Filters
                                </button>

                                <label className="relative">
                                    <span className="sr-only">
                                        Sort products
                                    </span>

                                    <select
                                        value={sortBy}
                                        onChange={(event) =>
                                            setSortBy(event.target.value)
                                        }
                                        className="w-[155px] appearance-none rounded-xl border border-[#50070D]/15 bg-white py-2.5 pl-3 pr-9 text-sm text-[#50070D] outline-none focus:border-[#E7C15F] sm:w-[190px]"
                                    >
                                        <option value="latest">
                                            Sort by latest
                                        </option>
                                        <option value="price-low">
                                            Price: Low to High
                                        </option>
                                        <option value="price-high">
                                            Price: High to Low
                                        </option>
                                        <option value="rating">
                                            Top Rated
                                        </option>
                                        <option value="name">
                                            Name: A to Z
                                        </option>
                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#50070D]"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Mobile search */}
                        <div className="relative mb-5 lg:hidden">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                placeholder="Search sarees, fabrics, kurtas..."
                                className="w-full rounded-xl border border-[#50070D]/10 bg-white py-3 pl-4 pr-11 text-sm text-[#50070D] outline-none focus:border-[#E7C15F]"
                            />

                            <Search
                                size={19}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#50070D]"
                            />
                        </div>

                        {/* Mobile category shortcuts */}
                        <div className="mb-5 flex gap-2 overflow-x-auto pb-2 lg:hidden">
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    type="button"
                                    onClick={() =>
                                        setActiveCategory(category.name)
                                    }
                                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${
                                        activeCategory === category.name
                                            ? "border-[#50070D] bg-[#50070D] text-[#E7C15F]"
                                            : "border-[#50070D]/10 bg-white text-[#6B484A]"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {/* Product cards */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                                {filteredProducts.map((product) => {
                                    const isWishlisted = wishlist.some(
                                        (item) => item.id === product.id
                                    );
                                    const originalPrice =
                                        product.originalPrice ?? product.price;

                                    const discount =
                                        originalPrice > product.price
                                            ? Math.round(
                                                  ((originalPrice -
                                                      product.price) /
                                                      originalPrice) *
                                                      100
                                              )
                                            : 0;

                                    return (
                                        <article
                                            key={product.id}
                                            className="group overflow-hidden rounded-2xl border border-[#50070D]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#50070D]/10"
                                        >
                                            {/* Product image */}
                                            <div className="relative aspect-[4/5] overflow-hidden bg-[#F3E7D2]">
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="block h-full w-full"
                                                    aria-label={`View ${product.name}`}
                                                >
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                                    />
                                                </Link>

                                                {discount > 0 && (
                                                    <span className="absolute left-2 top-2 rounded-full bg-[#E7C15F] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#50070D] sm:left-3 sm:top-3 sm:text-[10px]">
                                                        {discount}% OFF
                                                    </span>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleWishlist(product)
                                                    }
                                                    aria-label={
                                                        isWishlisted
                                                            ? "Remove from wishlist"
                                                            : "Add to wishlist"
                                                    }
                                                    className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition sm:right-3 sm:top-3 sm:h-9 sm:w-9 ${
                                                        isWishlisted
                                                            ? "bg-[#50070D] text-[#E7C15F]"
                                                            : "bg-white/95 text-[#50070D] hover:bg-[#50070D] hover:text-[#E7C15F]"
                                                    }`}
                                                >
                                                    <Heart
                                                        size={17}
                                                        fill={
                                                            isWishlisted
                                                                ? "currentColor"
                                                                : "none"
                                                        }
                                                    />
                                                </button>
                                            </div>

                                            {/* Product information */}
                                            <div className="p-3 sm:p-4">
                                                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8A2027] sm:text-[10px]">
                                                    {product.category}
                                                </p>

                                                <Link to={`/product/${product.id}`}>
                                                    <h3 className="line-clamp-2 min-h-[40px] font-serif text-sm font-bold leading-5 text-[#50070D] transition hover:text-[#8A2027] sm:min-h-0 sm:text-base">
                                                        {product.name}
                                                    </h3>
                                                </Link>

                                              

                                                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                                                    <span className="text-lg font-bold text-[#50070D] sm:text-xl">
                                                        ₹
                                                        {Number(
                                                            product.price
                                                        ).toLocaleString("en-IN")}
                                                    </span>

                                                    {originalPrice > product.price && (
                                                        <span className="text-[10px] text-[#A99595] line-through sm:text-xs">
                                                            ₹
                                                            {Number(
                                                                originalPrice
                                                            ).toLocaleString("en-IN")}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Product actions */}
                                                <div className="mt-4 grid grid-cols-2 items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => buyNow(product)}
                                                        className="flex min-w-0 items-center justify-center gap-1 rounded-xl bg-[#E7C15F] px-2 py-2.5 text-[10px] font-bold uppercase tracking-wide text-[#50070D] transition hover:bg-[#D9AE43] sm:gap-2 sm:text-xs"
                                                    >
                                                        
                                                        Buy Now
                                                    </button>

                                                    <CartAnime
                                                        onAdd={() =>
                                                            addToCart(product)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#50070D]/20 bg-white px-5 text-center">
                                <Search
                                    size={36}
                                    className="mb-3 text-[#B9A1A1]"
                                />

                                <h3 className="font-serif text-xl font-bold text-[#50070D]">
                                    No products found
                                </h3>

                                <p className="mt-2 text-sm text-[#80696A]">
                                    Try another search or choose a different
                                    category.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchTerm("");
                                        setActiveCategory("All Products");
                                    }}
                                    className="mt-5 rounded-xl bg-[#50070D] px-5 py-3 text-sm font-semibold text-[#E7C15F] transition hover:bg-[#3D0509]"
                                >
                                    View All Products
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {/* Mobile category filter drawer */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <button
                        type="button"
                        aria-label="Close filters"
                        onClick={() => setMobileFiltersOpen(false)}
                        className="absolute inset-0 bg-[#260307]/60"
                    />

                    <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-[#FFF9EF] p-5 shadow-2xl">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A2027]">
                                    Browse
                                </p>

                                <h2 className="mt-1 font-serif text-2xl font-bold text-[#50070D]">
                                    Categories
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(false)}
                                aria-label="Close category filters"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#50070D] shadow-sm"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <CategoryList mobile />

                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen(false)}
                            className="mt-5 w-full rounded-xl bg-[#50070D] py-3 font-semibold text-[#E7C15F] transition hover:bg-[#3D0509]"
                        >
                            Show {filteredProducts.length} Products
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
