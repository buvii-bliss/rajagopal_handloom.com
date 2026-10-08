import React from "react";
import { useNavigate } from "react-router-dom";

function BottomBar({
    wishlistCount = 0,
    cartCount = 0,
}) {
    const navigate = useNavigate();

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-[#e4d7c7] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] md:hidden">
            <div className="grid h-[62px] grid-cols-4">

                {/* HOME */}
                <button
                    type="button"
                    onClick={() => {
                        navigate("/");
                        scrollTop();
                    }}
                    className="flex flex-col items-center justify-center gap-1 text-[#650b13]"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 21v-6h6v6"
                            strokeLinecap="round"
                        />
                    </svg>

                    <span className="text-[10px] font-semibold">
                        Home
                    </span>
                </button>

                {/* MY ORDERS */}
                <button
                    type="button"
                    onClick={scrollTop}
                    className="flex flex-col items-center justify-center gap-1 text-gray-600"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M6 3h12a2 2 0 0 1 2 2v16l-8-4-8 4V5a2 2 0 0 1 2-2Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className="text-[10px] font-semibold">
                        My Orders
                    </span>
                </button>

                {/* WISHLIST */}
                <button
                    type="button"
                    onClick={scrollTop}
                    className="flex flex-col items-center justify-center gap-1 text-gray-600"
                >
                    <div className="relative">
                        <svg
                            className="h-5 w-5"
                            fill={
                                wishlistCount > 0
                                    ? "currentColor"
                                    : "none"
                            }
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        {wishlistCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#650b13] px-1 text-[8px] font-bold text-white">
                                {wishlistCount}
                            </span>
                        )}
                    </div>

                    <span className="text-[10px] font-semibold">
                        Wishlist
                    </span>
                </button>

                {/* CART */}
                <button
                    type="button"
                    onClick={scrollTop}
                    className="flex flex-col items-center justify-center gap-1 text-gray-600"
                >
                    <div className="relative">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            <circle cx="9" cy="20" r="1.5" />
                            <circle cx="18" cy="20" r="1.5" />
                        </svg>

                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#650b13] px-1 text-[8px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </div>

                    <span className="text-[10px] font-semibold">
                        Cart
                    </span>
                </button>
            </div>
        </div>
    );
}

export default BottomBar;