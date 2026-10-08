
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import products from "../Data/Product";
import ProductReviews from "./Product/ProductReviews";
import SimilarProducts from "./Product/SimilarProducts";

const GOLD = "#b58a3a";
const MAROON = "#650b13";

const bulkTiers = [
    { min: 1, max: 99, discount: 0, label: "Regular Price" },
    { min: 100, max: 199, discount: 20, label: "100+ Pieces" },
    { min: 200, max: 299, discount: 25, label: "200+ Pieces" },
    { min: 300, max: Infinity, discount: 30, label: "300+ Pieces" },
];

const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);

const getCategoryType = (category = "", name = "") => {
    const value = `${category} ${name}`.toLowerCase();

    if (/saree|sari|dhoti|mundu|veshti/.test(value)) {
        return "free";
    }

    if (/kurti|kurta|shirt|blouse|top|dress|salwar|churidar|legging|trouser|pant|tunic/.test(value)) {
        return "sized";
    }

    return "sized";
};

const getSizes = (product) => {
    if (getCategoryType(product.category, product.name) === "free") {
        return [{ name: "Free Size", available: true }];
    }

    const defaultSizes = ["S", "M", "L", "XL", "XXL"];

    // Supports either ["S", "M", "L"] or
    // [{ name: "S", available: true }, ...]
    const source = product.sizes || product.availableSizes;

    if (!Array.isArray(source) || source.length === 0) {
        return defaultSizes.map((name) => ({
            name,
            available: true,
        }));
    }

    return source.map((item) => {
        if (typeof item === "string") {
            return { name: item, available: true };
        }

        return {
            name: item.name || item.size,
            available: item.available ?? item.inStock ?? true,
        };
    }).filter((item) => item.name);
};

const getMedia = (product, variant) => {
    const images = variant?.images?.length
        ? variant.images
        : [variant?.image || product.image].filter(Boolean);

    const videos = [
        ...(Array.isArray(product.videos) ? product.videos : []),
        ...(product.video ? [product.video] : []),
        ...(Array.isArray(variant?.videos) ? variant.videos : []),
        ...(variant?.video ? [variant.video] : []),
    ];

    const normalizedVideos = videos.map((item) =>
        typeof item === "string" ? item : item.url || item.src
    ).filter(Boolean);

    return [
        ...images.map((src) => ({ type: "image", src })),
        ...normalizedVideos.map((src) => ({ type: "video", src })),
    ];
};

function ProductDetails({ addToCart, wishlist = [], toggleWishlist }) {
    const { id } = useParams();

    const product = products.find((item) => String(item.id) === String(id));

    const variants = useMemo(() => {
        if (!product) return [];

        return product.variants?.length
            ? product.variants
            : [{
                id: "default",
                name: "Default",
                images: [product.image].filter(Boolean),
            }];
    }, [product]);

    const [variantIndex, setVariantIndex] = useState(0);
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [notice, setNotice] = useState("");

    if (!product) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#fffaf2] px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#52080f]">
                        Product Not Found
                    </h1>
                    <Link
                        to="/"
                        className="mt-4 inline-block rounded-md bg-[#650b13] px-5 py-2 text-sm font-semibold text-white"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const activeVariant = variants[variantIndex] || variants[0];
    const media = getMedia(product, activeVariant);
    const activeMedia = media[activeMediaIndex] || media[0];

    const sizes = getSizes(product);
    const isFreeSize = getCategoryType(product.category, product.name) === "free";

    const selectedSizeData = sizes.find((size) => size.name === selectedSize);
    const isSizeAvailable = selectedSizeData?.available ?? false;

    // Product.js price is treated as the original price.
    const originalPrice = Number(product.originalPrice ?? product.price ?? 0);

    const currentTier = [...bulkTiers]
        .reverse()
        .find((tier) => quantity >= tier.min) || bulkTiers[0];

    const discountedPrice = Math.round(
        originalPrice * (1 - currentTier.discount / 100)
    );

    const totalPrice = discountedPrice * quantity;
    const totalSavings = (originalPrice - discountedPrice) * quantity;

    const isWishlisted = Array.isArray(wishlist)
        ? wishlist.some((item) =>
            String(typeof item === "object" ? item.id : item) === String(product.id)
        )
        : false;

    const chooseVariant = (index) => {
        setVariantIndex(index);
        setActiveMediaIndex(0);
        setNotice("");
    };

    const updateQuantity = (value) => {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) return;

        setQuantity(Math.max(1, Math.min(10000, Math.floor(parsed))));
    };

    const handleOrder = (isBulk = false) => {
        if (!selectedSize || !isSizeAvailable) {
            setNotice("Please select an available size.");
            return;
        }

        if (isBulk && quantity < 100) {
            setQuantity(100);
            setNotice("Bulk pricing starts at 100 pieces. Review the updated total and click Bulk Order again.");
            return;
        }

        const selectedProduct = {
            ...product,
            selectedVariant: activeVariant,
            selectedColor: activeVariant?.name || "Default",
            selectedImage: activeMedia?.type === "image"
                ? activeMedia.src
                : activeVariant?.images?.[0] || activeVariant?.image || product.image,
            selectedSize,
            quantity,
            originalPrice,
            price: discountedPrice,
            unitPrice: discountedPrice,
            discount: currentTier.discount,
            totalPrice,
            isBulkOrder: isBulk || quantity >= 100,
        };

        if (typeof addToCart === "function") {
            addToCart(selectedProduct);
            setNotice("Product added to cart.");
        } else {
            setNotice("Cart action is not connected yet.");
        }
    };

    const handleWishlist = () => {
        if (typeof toggleWishlist === "function") {
            toggleWishlist(product);
        }
    };

    return (
        <main className="min-h-screen bg-[#fffaf2] px-3 py-3 sm:px-5 sm:py-4">
            <div className="mx-auto max-w-7xl">
                {/* Breadcrumb */}
                <nav className="mb-3 flex items-center gap-2 overflow-hidden whitespace-nowrap text-xs text-gray-500">
                    <Link to="/" className="shrink-0 font-medium text-[#650b13] hover:underline">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="shrink-0">{product.category}</span>
                    <span>/</span>
                    <span className="truncate text-gray-600">{product.name}</span>
                </nav>

                {/* Main product area */}
                <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-8">
                    {/* Gallery */}
                    <section className="min-w-0">
                        <div className="grid grid-cols-[62px_minmax(0,1fr)] gap-3 sm:grid-cols-[76px_minmax(0,1fr)]">
                            {/* Image and video thumbnails */}
                            <div className="flex max-h-[430px] flex-col gap-2 overflow-y-auto pr-1">
                                {media.map((item, index) => (
                                    <button
                                        key={`${item.type}-${item.src}-${index}`}
                                        type="button"
                                        onClick={() => setActiveMediaIndex(index)}
                                        aria-label={item.type === "video" ? "Play product video" : `View product image ${index + 1}`}
                                        className={`relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-lg border-2 bg-white ${
                                            activeMediaIndex === index
                                                ? "border-[#b58a3a]"
                                                : "border-[#eadfce]"
                                        }`}
                                    >
                                        {item.type === "image" ? (
                                            <img
                                                src={item.src}
                                                alt={`${product.name} thumbnail`}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="relative flex h-full w-full items-center justify-center bg-[#2b1717]">
                                                <video
                                                    src={item.src}
                                                    muted
                                                    playsInline
                                                    preload="metadata"
                                                    className="h-full w-full object-cover opacity-70"
                                                />
                                                <span className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm text-[#650b13]">
                                                    ▶
                                                </span>
                                                <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1 text-[9px] text-white">
                                                    VIDEO
                                                </span>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Main image/video */}
                            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl border border-[#eadfce] bg-white sm:min-h-[400px] lg:h-[min(66vh,580px)] lg:min-h-[420px]">
                                {activeMedia ? (
                                    activeMedia.type === "video" ? (
                                        <video
                                            key={activeMedia.src}
                                            src={activeMedia.src}
                                            controls
                                            playsInline
                                            className="h-full max-h-[580px] w-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={activeMedia.src}
                                            alt={product.name}
                                            className="h-full max-h-[580px] w-full object-cover"
                                        />
                                    )
                                ) : (
                                    <div className="p-5 text-sm text-gray-400">
                                        No product media available
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={handleWishlist}
                                    aria-label="Toggle wishlist"
                                    className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border bg-white text-xl shadow-sm ${
                                        isWishlisted ? "text-red-600" : "text-gray-500"
                                    }`}
                                >
                                    {isWishlisted ? "♥" : "♡"}
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Product information */}
                    <section className="min-w-0 space-y-3">
                        <div>
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7534]">
                                {product.category}
                            </p>
                            <h1 className="text-xl font-bold leading-snug text-[#42070c] sm:text-2xl">
                                {product.name}
                            </h1>

                            {product.rating && (
                                <p className="mt-1 text-xs text-gray-500">
                                    <span className="font-semibold text-[#987027]">
                                        ★ {product.rating}
                                    </span>
                                    {product.reviews ? ` · ${product.reviews} reviews` : ""}
                                </p>
                            )}
                        </div>

                        {/* Price and bulk discount */}
                        <div className="rounded-xl border border-[#ead9b9] bg-white p-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-2xl font-bold text-[#650b13]">
                                    {formatPrice(discountedPrice)}
                                </span>
                                {currentTier.discount > 0 && (
                                    <>
                                        <span className="text-sm text-gray-400 line-through">
                                            {formatPrice(originalPrice)}
                                        </span>
                                        <span className="rounded bg-green-50 px-2 py-1 text-[11px] font-bold text-green-700">
                                            {currentTier.discount}% OFF
                                        </span>
                                    </>
                                )}
                                {currentTier.discount === 0 && (
                                    <span className="text-xs text-gray-500">Per piece</span>
                                )}
                            </div>
                            <p className="mt-1 text-[11px] text-gray-500">
                                {currentTier.discount > 0
                                    ? `You save ${formatPrice(originalPrice - discountedPrice)} per piece`
                                    : "Bulk discounts apply automatically from 100 pieces."}
                            </p>

                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {bulkTiers.slice(1).map((tier) => (
                                    <button
                                        key={tier.min}
                                        type="button"
                                        onClick={() => updateQuantity(tier.min)}
                                        className={`rounded-lg border p-2 text-left transition ${
                                            currentTier.min === tier.min
                                                ? "border-[#650b13] bg-[#650b13] text-white"
                                                : "border-[#eadfce] bg-[#fffaf2] text-[#52080f] hover:border-[#b58a3a]"
                                        }`}
                                    >
                                        <span className="block text-[10px] font-semibold">
                                            {tier.label}
                                        </span>
                                        <span className="mt-1 block text-sm font-bold">
                                            {tier.discount}% OFF
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color variants */}
                        {variants.length > 1 && (
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="text-xs font-bold text-[#42070c]">
                                        Color: <span className="font-normal">{activeVariant?.name}</span>
                                    </p>
                                    <span className="text-[10px] text-gray-500">
                                        {variants.length} options
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {variants.map((variant, index) => (
                                        <button
                                            key={variant.id ?? variant.name ?? index}
                                            type="button"
                                            onClick={() => chooseVariant(index)}
                                            title={variant.name}
                                            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
                                                variantIndex === index
                                                    ? "border-[#650b13] bg-[#fff0e9] font-semibold text-[#650b13]"
                                                    : "border-[#e4d5c2] bg-white text-gray-700"
                                            }`}
                                        >
                                            {(variant.images?.[0] || variant.image) && (
                                                <img
                                                    src={variant.images?.[0] || variant.image}
                                                    alt=""
                                                    className="h-6 w-6 rounded-full border border-[#eadfce] object-cover"
                                                />
                                            )}
                                            {variant.name || `Color ${index + 1}`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size selection */}
                        <div>
                            <div className="mb-2 flex items-center justify-between gap-2">
                                <p className="text-xs font-bold text-[#42070c]">
                                    {isFreeSize ? "Size" : "Select Size"}
                                </p>
                                {!isFreeSize && (
                                    <button
                                        type="button"
                                        onClick={() => setShowSizeChart(true)}
                                        className="text-[11px] font-semibold text-[#650b13] underline underline-offset-2"
                                    >
                                        Size chart
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {sizes.map((size) => {
                                    const unavailable = !size.available;

                                    return (
                                        <button
                                            key={size.name}
                                            type="button"
                                            disabled={unavailable}
                                            onClick={() => {
                                                setSelectedSize(size.name);
                                                setNotice("");
                                            }}
                                            className={`relative min-w-12 rounded-lg border px-3 py-2 text-xs font-semibold ${
                                                unavailable
                                                    ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300 line-through"
                                                    : selectedSize === size.name
                                                        ? "border-[#650b13] bg-[#650b13] text-white"
                                                        : "border-[#e4d5c2] bg-white text-[#52080f] hover:border-[#b58a3a]"
                                            }`}
                                        >
                                            {size.name}
                                            {unavailable && (
                                                <span className="sr-only">Unavailable</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            {!selectedSize && (
                                <p className="mt-1 text-[10px] text-gray-500">
                                    Please choose a size to continue.
                                </p>
                            )}
                        </div>

                        {/* Quantity and total */}
                        <div className="rounded-xl border border-[#eadfce] bg-white p-3">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-bold text-[#42070c]">
                                        Order quantity
                                    </p>
                                    <p className="mt-1 text-[10px] text-gray-500">
                                        {quantity >= 300
                                            ? "Highest bulk discount applied"
                                            : quantity >= 200
                                                ? "200+ pieces discount applied"
                                                : quantity >= 100
                                                    ? "100+ pieces discount applied"
                                                    : "Bulk discounts start at 100 pieces"}
                                    </p>
                                </div>

                                <div className="flex items-center overflow-hidden rounded-lg border border-[#e4d5c2]">
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(quantity - 1)}
                                        className="h-9 w-9 text-lg text-[#650b13] hover:bg-[#fff5e6]"
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10000"
                                        value={quantity}
                                        onChange={(event) => updateQuantity(event.target.value)}
                                        className="h-9 w-16 border-x border-[#e4d5c2] text-center text-sm font-semibold outline-none"
                                        aria-label="Order quantity"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(quantity + 1)}
                                        className="h-9 w-9 text-lg text-[#650b13] hover:bg-[#fff5e6]"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mt-3 flex items-end justify-between border-t border-dashed border-[#e4d5c2] pt-3">
                                <div>
                                    <p className="text-[11px] text-gray-500">
                                        Total for {quantity} {quantity === 1 ? "piece" : "pieces"}
                                    </p>
                                    <p className="text-xl font-bold text-[#650b13]">
                                        {formatPrice(totalPrice)}
                                    </p>
                                </div>
                                {totalSavings > 0 && (
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-500">Total savings</p>
                                        <p className="text-sm font-bold text-green-700">
                                            {formatPrice(totalSavings)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order actions */}
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => handleOrder(false)}
                                className="rounded-lg border border-[#650b13] bg-white px-3 py-3 text-xs font-bold text-[#650b13] transition hover:bg-[#fff0e9] sm:text-sm"
                            >
                                Add to Cart
                            </button>

                            <button
                                type="button"
                                onClick={() => handleOrder(true)}
                                className="rounded-lg bg-[#650b13] px-3 py-3 text-xs font-bold text-white transition hover:bg-[#4c070d] sm:text-sm"
                            >
                                Bulk Order
                            </button>
                        </div>

                        {notice && (
                            <p
                                role="status"
                                className="rounded-lg border border-[#ead9b9] bg-white px-3 py-2 text-xs text-[#650b13]"
                            >
                                {notice}
                            </p>
                        )}

                        <div className="grid grid-cols-3 gap-2 border-t border-[#e8dccb] pt-3 text-center">
                            <div>
                                <span className="text-sm">✓</span>
                                <p className="mt-1 text-[10px] text-gray-600">Quality checked</p>
                            </div>
                            <div>
                                <span className="text-sm">↺</span>
                                <p className="mt-1 text-[10px] text-gray-600">Easy support</p>
                            </div>
                            <div>
                                <span className="text-sm">◆</span>
                                <p className="mt-1 text-[10px] text-gray-600">Secure checkout</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Reviews */}
                {/* <div className="mt-6 border-t border-[#e5d7c5] pt-5">
                    <ProductReviews product={product} />
                </div> */}

                {/* Similar products */}
                <div className="mt-6 border-t border-[#e5d7c5] pt-5">
                    <SimilarProducts product={product} />
                </div>
            </div>

            {/* Size chart modal */}
            {showSizeChart && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3"
                    onClick={() => setShowSizeChart(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="size-chart-title"
                        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-[#fffaf2] p-4 shadow-2xl sm:p-6"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9a7534]">
                                    Fit guide
                                </p>
                                <h2 id="size-chart-title" className="text-xl font-bold text-[#52080f]">
                                    Size Chart
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowSizeChart(false)}
                                aria-label="Close size chart"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4d5c2] text-lg text-[#650b13]"
                            >
                                ×
                            </button>
                        </div>

                        <p className="mb-3 text-xs leading-5 text-gray-600">
                            Approximate body measurements in inches. Actual sizing may vary by brand and product.
                        </p>

                        <div className="overflow-x-auto rounded-lg border border-[#eadfce] bg-white">
                            <table className="w-full min-w-[350px] text-center text-xs">
                                <thead className="bg-[#650b13] text-white">
                                    <tr>
                                        <th className="p-3">Size</th>
                                        <th className="p-3">Bust / Chest</th>
                                        <th className="p-3">Waist</th>
                                        <th className="p-3">Hip</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {[
                                        ["S", "34–36", "28–30", "36–38"],
                                        ["M", "36–38", "30–32", "38–40"],
                                        ["L", "38–40", "32–34", "40–42"],
                                        ["XL", "40–42", "34–36", "42–44"],
                                        ["XXL", "42–44", "36–38", "44–46"],
                                    ].map((row) => (
                                        <tr key={row[0]} className="border-t border-[#f0e7db]">
                                            {row.map((value) => (
                                                <td key={value} className="p-3">{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 rounded-lg bg-[#f4e9d7] p-3 text-xs leading-5 text-[#52080f]">
                            <strong>How to measure:</strong> Measure around the fullest part of the bust/chest, natural waist, and hips. Choose the size that best matches the product's own size guide.
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowSizeChart(false)}
                            className="mt-4 w-full rounded-lg bg-[#650b13] px-4 py-3 text-sm font-bold text-white"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ProductDetails;