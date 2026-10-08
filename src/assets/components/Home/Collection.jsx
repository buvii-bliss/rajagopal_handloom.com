import React from "react";

import saree1 from "../../img/saree1.jpg";
import kid from "../../img/kid1.webp";
import saree from "../../img/onam.webp";
import boy from "../../img/boy2.jpg";

function Collection() {
    const collections = [
        {
            title: "Wedding Collection",
            image: saree1,
        },
        {
            title: "Men's Collection",
            image: boy,
        },
        {
            title: "Kids Collection",
            image: kid,
        },
        {
            title: "New Arrivals",
            image: saree,
        },
    ];

    return (
        <section className="bg-[#fffaf2] px-4 py-4">
            <div className="mx-auto max-w-7xl">
                {/* HEADER */}
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-serif text-xl font-bold text-[#52080f] sm:text-2xl">
                        Curated for You
                    </h2>

                    <button
                        type="button"
                        className="text-xs font-semibold text-[#650b13] sm:text-sm"
                    >
                        View All →
                    </button>
                </div>

                {/* COLLECTIONS */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {collections.map((collection) => (
                        <div
                            key={collection.title}
                            className="group relative h-[150px] overflow-hidden rounded-lg sm:h-[170px]"
                        >
                            {/* IMAGE */}
                            <img
                                src={collection.image}
                                alt={collection.title}
                                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />

                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                            {/* CONTENT */}
                            <div className="absolute bottom-3 left-4">
                                <h3 className="font-serif text-base font-semibold text-white sm:text-lg">
                                    {collection.title}
                                </h3>

                                <button
                                    type="button"
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