import React, { useState } from "react";

function CartAnime({ onAdd }) {
    const [added, setAdded] = useState(false);

    const handleClick = () => {
        if (added) return;

        setAdded(true);

        if (onAdd) {
            onAdd();
        }

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={added}
            className={`relative mt-2 flex h-9 w-full items-center justify-center overflow-hidden rounded-md text-xs font-semibold text-white transition-all duration-300 ${
                added
                    ? "bg-[#3d7a45]"
                    : "bg-[#650b13] hover:bg-[#820f19]"
            }`}
        >
            {!added ? (
                <span className="flex items-center gap-2">
                    <svg
                        className="h-4 w-4"
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

                    <span>Add to Cart</span>
                </span>
            ) : (
                <>
                    {/* FULL WIDTH MOVING TROLLEY */}
                    <span className="absolute inset-0 pointer-events-none">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 animate-cart-move">
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
                        </span>
                    </span>

                    {/* ADDED TO CART */}
                    <span className="flex items-center gap-1.5 animate-cart-text">
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="m5 12 4 4L19 6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        Added to Cart
                    </span>
                </>
            )}
        </button>
    );
}

export default CartAnime;