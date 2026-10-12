import React from "react";
import { useNavigate } from "react-router-dom";

import saree1 from "../../img/saree1.jpg";
import kid from "../../img/kid1.webp";
import saree from "../../img/onam.webp";
import boy from "../../img/boy2.jpg";

function Collection() {
    const navigate = useNavigate();

    const collections = [
        {
            title: "Wedding Collection",
            image: saree1,
            category: "Wedding",
        },
        {
            title: "Men's Collection",
            image: boy,
            category: "Men",
        },
        {
            title: "Kids Collection",
            image: kid,
            category: "Kids Collection",
        },
        {
            title: "New Arrivals",
            image: saree,
            category: "New Arrivals",
        },
    ];

    const handleShopNow = (category) => {
        navigate("/menu", {
            state: { selectedCategory: category },
        });
    };

    return (
        <section className="bg-[#fffaf2] px-4 py-4">
            <div className="mx-auto max-w-7xl">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-serif text-xl font-bold text-[#52080f] sm:text-2xl">
                        Curated for You
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {collections.map((collection) => (
                        <div
                            key={collection.title}
                            className="group relative h-[150px] overflow-hidden rounded-lg sm:h-[170px]"
                        >
                            <img
                                src={collection.image}
                                alt={collection.title}
                                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                            <div className="absolute bottom-3 left-4">
                                <h3 className="font-serif text-base font-semibold text-white sm:text-lg">
                                    {collection.title}
                                </h3>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleShopNow(collection.category)
                                    }
                                    className="mt-1 text-xs font-medium text-white transition hover:text-[#f3d27b]"
                                >
                                    Shop Now →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Collection;
