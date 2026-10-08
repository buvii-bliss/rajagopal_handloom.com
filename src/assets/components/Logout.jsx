import React from "react";

function Logout({ onClose, onConfirm }) {
    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm rounded-xl bg-[#fffaf2] p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* CLOSE */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#f1e4d2] text-[#52080f] transition hover:bg-[#e4bd63]"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M6 6l12 12M18 6 6 18"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {/* ICON */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8e8d9] text-[#650b13]">
                    <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M10 17l5-5-5-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        <path
                            d="M15 12H3"
                            strokeLinecap="round"
                        />

                        <path
                            d="M21 3v18"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* CONTENT */}
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-bold text-[#3d2020]">
                        Logout
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Are you sure you want to logout from your account?
                    </p>
                </div>

                {/* BUTTONS */}
                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-11 flex-1 rounded-md border border-[#dbcbb8] bg-white text-sm font-semibold text-[#3d2020] transition hover:bg-[#f5eadf]"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="h-11 flex-1 rounded-md bg-[#650b13] text-sm font-bold text-white transition hover:bg-[#820f19]"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Logout;