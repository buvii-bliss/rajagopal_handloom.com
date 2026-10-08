import React from "react";

function ProductInfo({
    product,
    addToCart,
    wishlist,
    toggleWishlist,
}) {
    const [selectedSize, setSelectedSize] = React.useState("M");

    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

    const isWishlisted = wishlist?.some(
        (item) => item.id === product.id
    );

    return (
        <div className="space-y-3">

            {/* PRODUCT TITLE */}
            <div className="rounded-lg border border-[#eadfce] bg-white p-4">
                <p className="text-xs text-gray-500">
                    {product.category}
                </p>

                <h1 className="mt-1 text-lg font-semibold leading-6 text-[#3d2020] sm:text-xl">
                    {product.name}
                </h1>

                {/* RATING */}
                <div className="mt-3 flex items-center gap-2">
                    <span className="rounded bg-[#07883f] px-2 py-1 text-xs font-bold text-white">
                        {product.rating} ★
                    </span>

                    <span className="text-xs text-gray-500">
                        {product.reviews} Ratings & Reviews
                    </span>
                </div>

                <div className="mt-3 border-t border-[#f0e5d8] pt-3">
                    <span className="text-2xl font-bold text-[#52080f]">
                        ₹{product.price.toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            {/* SIZE */}
            <div className="rounded-lg border border-[#eadfce] bg-white p-4">
                <h3 className="text-sm font-bold text-[#3d2020]">
                    Select Size
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`min-w-[38px] rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                selectedSize === size
                                    ? "border-[#650b13] bg-[#650b13] text-white"
                                    : "border-[#9d9d9d] text-[#3d2020] hover:border-[#650b13]"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* HIGHLIGHTS */}
            <div className="rounded-lg border border-[#eadfce] bg-white p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#3d2020]">
                        Product Highlights
                    </h3>

                    <button className="text-[10px] font-bold text-[#650b13]">
                        COPY
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                    <div>
                        <p className="text-[10px] text-gray-500">
                            Fabric
                        </p>
                        <p className="text-xs font-medium text-[#3d2020]">
                            Handloom Cotton
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] text-gray-500">
                            Fit / Shape
                        </p>
                        <p className="text-xs font-medium text-[#3d2020]">
                            Regular Fit
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] text-gray-500">
                            Pattern
                        </p>
                        <p className="text-xs font-medium text-[#3d2020]">
                            Traditional
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] text-gray-500">
                            Material
                        </p>
                        <p className="text-xs font-medium text-[#3d2020]">
                            Premium Fabric
                        </p>
                    </div>
                </div>

                <div className="mt-5 border-t border-[#f0e5d8] pt-3">
                    <button className="flex w-full items-center justify-between text-xs font-medium text-[#3d2020]">
                        Additional Details
                        <span>⌄</span>
                    </button>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="h-11 rounded-md border border-[#650b13] bg-white text-sm font-semibold text-[#650b13] transition hover:bg-[#fff5f5]"
                >
                    🛒 Add to Cart
                </button>

                <button
                    type="button"
                    className="h-11 rounded-md bg-[#650b13] text-sm font-semibold text-white transition hover:bg-[#7c0e18]"
                >
                    Buy Now
                </button>
            </div>

            {/* WISHLIST */}
            <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`w-full text-center text-xs font-semibold ${
                    isWishlisted
                        ? "text-[#c2182b]"
                        : "text-[#650b13]"
                }`}
            >
                {isWishlisted
                    ? "♥ Added to Wishlist"
                    : "♡ Add to Wishlist"}
            </button>
        </div>
    );
}

export default ProductInfo;