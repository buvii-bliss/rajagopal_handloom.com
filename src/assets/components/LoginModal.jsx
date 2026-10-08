import React, { useState } from "react";

function LoginModal({ onClose, onRegister, onLogin }) {
    const [loginValue, setLoginValue] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!loginValue.trim() || !password.trim()) {
            setError("Please enter your mobile/email and password.");
            return;
        }

        setError("");

        // Get a display name from email/mobile
        let userName = loginValue.trim();

        if (userName.includes("@")) {
            userName = userName
                .split("@")[0]
                .replace(/[._-]/g, " ");
        }

        // Capitalize name
        userName = userName
            .split(" ")
            .filter(Boolean)
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");

        onLogin?.({
            name: userName,
            emailOrMobile: loginValue.trim(),
        });

        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md rounded-xl bg-[#fffaf2] p-6 shadow-2xl sm:p-8"
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

                {/* LOGO */}
                <div className="mb-5 text-center">
                    <div className="font-serif text-3xl font-bold text-[#650b13]">
                        Handloom
                    </div>

                    <p className="mt-1 text-[10px] tracking-[2px] text-[#92715d]">
                        TIMELESS WEAVES. MODERN YOU.
                    </p>
                </div>

                <h2 className="text-center text-xl font-bold text-[#3d2020]">
                    Welcome Back
                </h2>

                <p className="mt-1 text-center text-sm text-gray-500">
                    Sign in to continue shopping
                </p>

                <form onSubmit={handleSubmit}>
                    {/* MOBILE / EMAIL */}
                    <div className="mt-6">
                        <label className="mb-1 block text-xs font-semibold text-[#3d2020]">
                            Mobile Number / Email
                        </label>

                        <input
                            type="text"
                            value={loginValue}
                            onChange={(e) => setLoginValue(e.target.value)}
                            placeholder="Enter mobile number or email"
                            className="h-11 w-full rounded-md border border-[#dbcbb8] bg-white px-4 text-sm outline-none transition focus:border-[#650b13] focus:ring-1 focus:ring-[#650b13]"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between">
                            <label className="text-xs font-semibold text-[#3d2020]">
                                Password
                            </label>

                            <button
                                type="button"
                                className="text-xs font-semibold text-[#650b13]"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="h-11 w-full rounded-md border border-[#dbcbb8] bg-white px-4 text-sm outline-none transition focus:border-[#650b13] focus:ring-1 focus:ring-[#650b13]"
                        />
                    </div>

                    {/* ERROR */}
                    {error && (
                        <p className="mt-3 text-xs font-medium text-red-600">
                            {error}
                        </p>
                    )}

                    {/* SIGN IN */}
                    <button
                        type="submit"
                        className="mt-5 h-11 w-full rounded-md bg-[#650b13] text-sm font-bold text-white transition hover:bg-[#820f19]"
                    >
                        Sign In
                    </button>
                </form>

                {/* DIVIDER */}
                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#dfd0be]" />

                    <span className="text-xs text-gray-400">
                        New to Handloom?
                    </span>

                    <div className="h-px flex-1 bg-[#dfd0be]" />
                </div>

                {/* REGISTER */}
                <button
                    type="button"
                    onClick={onRegister}
                    className="h-11 w-full rounded-md border border-[#650b13] bg-white text-sm font-bold text-[#650b13] transition hover:bg-[#650b13] hover:text-white"
                >
                    Create Your Account
                </button>
            </div>
        </div>
    );
}

export default LoginModal;