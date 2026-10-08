import React, { useState } from "react";

import banner1 from "../../img/banner1.png";
import dhotii from "../../img/dhotii.webp";
import dhoti from "../../img/dhoti.webp";
import saree1 from "../../img/saree1.jpg";
import saree2 from "../../img/saree2.jpg";
import saree from "../../img/onam.webp";
import kid from "../../img/kid1.webp";
import kurti from "../../img/kurta.webp";

function Category({ setSelectedCategory }) {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = [
        {
            name: "All",
            image: banner1,
        },
        {
            name: "Sarees",
            image: saree1,
        },
        {
            name: "Kurtas & Sets",
            image: kurti,
        },
        {
            name: "Dhoti & Mundu",
            image: dhotii,
        },
        {
            name: "New Arrivals",
            image: saree,
        },
        {
            name: "Offers",
            image: saree2,
        },
        {
            name: "Handloom Cotton",
            image: dhoti,
        },
        {
            name: "Kids Collection",
            image: kid,
        },
    ];

    const handleCategory = (category) => {
        setActiveCategory(category);
        setSelectedCategory(category);

        setTimeout(() => {
            document
                .getElementById("products-section")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        }, 50);
    };

    return (
        <section className="bg-[#fffaf2] px-4 py-4">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-serif text-xl font-bold text-[#52080f] sm:text-2xl">
                        Shop by Category
                    </h2>

                    <button
                        type="button"
                        onClick={() => handleCategory("All")}
                        className="text-xs font-semibold text-[#650b13] sm:text-sm"
                    >
                        View All →
                    </button>
                </div>

                {/* CATEGORIES */}
                <div className="scrollbar-hide flex gap-5 overflow-x-auto pb-2">
                    {categories.map((category) => {
                        const isActive =
                            activeCategory === category.name;

                        return (
                            <button
                                key={category.name}
                                type="button"
                                onClick={() =>
                                    handleCategory(category.name)
                                }
                                className="group min-w-[78px] flex-shrink-0 text-center"
                            >
                                {/* IMAGE */}
                                <div
                                    className={`mx-auto h-[68px] w-[68px] overflow-hidden rounded-full p-[2px] transition-all duration-300 sm:h-[76px] sm:w-[76px] ${
                                        isActive
                                            ? "bg-[#650b13] shadow-md"
                                            : "bg-[#d9c6a8]"
                                    }`}
                                >
                                    <div className="h-full w-full overflow-hidden rounded-full bg-[#f4eadc]">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                </div>

                                {/* TITLE */}
                                <p
                                    className={`mt-1.5 line-clamp-2 text-[11px] font-semibold leading-tight sm:text-xs ${
                                        isActive
                                            ? "text-[#650b13]"
                                            : "text-[#5b2929]"
                                    }`}
                                >
                                    {category.name}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Category;