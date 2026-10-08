import React from "react";

function SellerInfo() {
    return (
        <section className="rounded-lg border border-[#eadfce] bg-white p-4">
            <h3 className="text-sm font-bold text-[#3d2020]">
                Sold By
            </h3>

            <div className="mt-4 flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff4df] text-xl">
                        🏪
                    </div>

                    <div>
                        <p className="text-sm font-bold text-[#3d2020]">
                            HANDLOOM STORE
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                            <span className="rounded bg-[#07883f] px-1.5 py-0.5 text-[10px] font-bold text-white">
                                4.2 ★
                            </span>

                            <span className="text-[10px] text-gray-500">
                                2,292 Ratings
                            </span>
                        </div>

                        <p className="mt-1 text-[10px] text-gray-500">
                            11 Products
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="rounded border border-[#650b13] px-4 py-2 text-xs font-semibold text-[#650b13] hover:bg-[#650b13] hover:text-white"
                >
                    View Shop
                </button>
            </div>
        </section>
    );
}

export default SellerInfo;