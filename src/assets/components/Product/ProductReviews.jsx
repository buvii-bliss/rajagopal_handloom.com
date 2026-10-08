import React from "react";

function ProductReviews({ product }) {
    const totalReviews = product.reviews;

    const ratings = [
        {
            label: "Excellent",
            count: Math.round(totalReviews * 0.55),
            width: "70%",
        },
        {
            label: "Very Good",
            count: Math.round(totalReviews * 0.18),
            width: "35%",
        },
        {
            label: "Good",
            count: Math.round(totalReviews * 0.12),
            width: "25%",
        },
        {
            label: "Average",
            count: Math.round(totalReviews * 0.07),
            width: "15%",
        },
        {
            label: "Poor",
            count: Math.round(totalReviews * 0.08),
            width: "20%",
        },
    ];

    return (
        <section className="rounded-lg border border-[#eadfce] bg-white p-4 sm:p-5">
            <h3 className="text-sm font-bold text-[#3d2020]">
                Product Ratings & Reviews
            </h3>

            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-[130px_1fr]">

                {/* RATING */}
                <div className="text-center sm:border-r sm:border-[#eadfce] sm:pr-5">
                    <p className="text-4xl font-bold text-[#079447]">
                        {product.rating}
                    </p>

                    <div className="mt-1 text-sm text-[#e4a900]">
                        ★ ★ ★ ★ ★
                    </div>

                    <p className="mt-2 text-[10px] text-gray-500">
                        {totalReviews} Ratings
                    </p>

                    <p className="text-[10px] text-gray-500">
                        Verified Reviews
                    </p>
                </div>

                {/* RATING BARS */}
                <div className="space-y-3">
                    {ratings.map((rating) => (
                        <div
                            key={rating.label}
                            className="flex items-center gap-2"
                        >
                            <span className="w-[65px] text-[10px] text-gray-600">
                                {rating.label}
                            </span>

                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e8e8ee]">
                                <div
                                    className="h-full rounded-full bg-[#08a357]"
                                    style={{
                                        width: rating.width,
                                    }}
                                />
                            </div>

                            <span className="w-8 text-right text-[9px] text-gray-500">
                                {rating.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* REVIEW */}
            <div className="mt-6 border-t border-[#eadfce] pt-5">
                <div className="flex items-center gap-2">
                    <span className="rounded bg-[#07883f] px-2 py-1 text-[10px] font-bold text-white">
                        {product.rating} ★
                    </span>

                    <span className="text-xs font-semibold text-[#3d2020]">
                        Beautiful Product
                    </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-600">
                    Excellent quality and beautiful handloom finish.
                    The product looks exactly as shown and the fabric
                    feels premium.
                </p>

                <p className="mt-2 text-[10px] text-gray-400">
                    Verified Purchase
                </p>
            </div>
        </section>
    );
}

export default ProductReviews;