import React from "react";

import saree1 from "../../img/saree1.jpg";
import saree2 from "../../img/saree2.jpg";

function Sale() {
    return (
        <section className="bg-[#fffaf2] px-4 py-4">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-2">

                {/* WHOLESALE */}
                <div className="group relative min-h-[180px] overflow-hidden rounded-lg">
                    <img
                        src={saree1}
                        alt="Wholesale Collection"
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#3d050b]/90 via-[#52080f]/65 to-transparent" />

                    <div className="relative flex min-h-[180px] max-w-[65%] flex-col justify-center px-5 py-5 sm:px-8">
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e4bd63]">
                            Wholesale Special
                        </p>

                        <h2 className="font-serif text-xl font-bold text-white sm:text-2xl">
                            Wholesale
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-white/80 sm:text-sm">
                            Special prices for bulk orders and resellers.
                        </p>

                        <button
                            type="button"
                            className="mt-3 w-fit rounded-md bg-[#e4bd63] px-4 py-2 text-xs font-bold text-[#52080f] transition hover:bg-[#f2d17d]"
                        >
                            Shop Wholesale →
                        </button>
                    </div>
                </div>

                {/* RETAIL */}
                <div className="group relative min-h-[180px] overflow-hidden rounded-lg">
                    <img
                        src={saree2}
                        alt="Retail Collection"
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#f6e4c7]/95 via-[#f6e4c7]/70 to-transparent" />

                    <div className="relative flex min-h-[180px] max-w-[65%] flex-col justify-center px-5 py-5 sm:px-8">
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a4b35]">
                            Retail Collection
                        </p>

                        <h2 className="font-serif text-xl font-bold text-[#52080f] sm:text-2xl">
                            Retail Sale
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-[#5b3b32] sm:text-sm">
                            Shop beautiful handloom collections at special prices.
                        </p>

                        <button
                            type="button"
                            className="mt-3 w-fit rounded-md border border-[#9a6047] bg-white/70 px-4 py-2 text-xs font-bold text-[#650b13] transition hover:bg-white"
                        >
                            Shop Retail →
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Sale;