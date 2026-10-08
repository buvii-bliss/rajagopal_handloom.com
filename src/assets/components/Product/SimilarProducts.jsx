import React from "react";
import { Link } from "react-router-dom";

import products from "../../Data/Product";

function SimilarProducts({ product }) {
    const similarProducts = products
        .filter(
            (item) =>
                item.category === product.category &&
                item.id !== product.id
        )
        .slice(0, 6);

    if (similarProducts.length === 0) {
        return null;
    }

    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-[#52080f] sm:text-2xl">
                    Similar Products
                </h2>

                <button
                    type="button"
                    className="text-xs font-semibold text-[#650b13] sm:text-sm"
                >
                    View All →
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {similarProducts.map((item) => (
                    <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        className="group overflow-hidden rounded-lg border border-[#eadfce] bg-white p-2 transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="aspect-square overflow-hidden rounded-md bg-[#f5ecdf]">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="px-1 pt-2">
                            <h3 className="line-clamp-2 text-xs font-medium leading-4 text-[#3d2020]">
                                {item.name}
                            </h3>

                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-sm font-bold text-[#2d1a1a]">
                                    ₹
                                    {item.price.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>

                                <span className="text-[10px] text-[#e4a900]">
                                    ★ {item.rating}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default SimilarProducts;