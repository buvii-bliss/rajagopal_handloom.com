import React, { useState } from "react";

function RegisterModal({ onClose, onLogin, onRegister }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            email,
            mobile,
            password,
            confirmPassword,
        } = formData;

        // ================= VALIDATION =================

        if (!name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!mobile.trim()) {
            setError("Please enter your mobile number.");
            return;
        }

        if (mobile.length < 10) {
            setError("Please enter a valid mobile number.");
            return;
        }

        if (!password) {
            setError("Please create a password.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (!confirmPassword) {
            setError("Please confirm your password.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // ================= REGISTER =================

        const userData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            mobile: mobile.trim(),
            password: password,
        };

        if (onRegister) {
            onRegister(userData);
        }

        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative my-auto w-full max-w-md rounded-xl bg-[#fffaf2] p-6 shadow-2xl sm:p-8"
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

                {/* TITLE */}
                <h2 className="text-center text-xl font-bold text-[#3d2020]">
                    Create Account
                </h2>

                <p className="mt-1 text-center text-sm text-gray-500">
                    Join us and discover timeless handloom
                </p>

                <form onSubmit={handleSubmit}>
                    {/* NAME */}
                    <div className="mt-5">
                        <label className="mb-1 block text-xs font-semibold text-[#3d2020]">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="h-11 w-full rounded-md border border-[#dbcbb8] bg-white px-4 text-sm outline-none transition focus:border-[#650b13] focus:ring-1 focus:ring-[#650b13]"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="mt-3">
                        <label className="mb-1 block text-xs font-semibold text-[#3d2020]">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="h-11 w-full rounded-md border border-[#dbcbb8] bg-white px-4 text-sm outline-none transition focus:border-[#650b13] focus:ring-1 focus:ring-[#650b13]"
                        />
                    </div>

                    {/* MOBILE */}
                    <div className="mt-3">
                        <label className="mb-1 block text-xs font-semibold text-[#3d2020]">
                            Mobile Number
                        </label>

                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            maxLength={10}
                            className="h-11 w-full rounded-md border border-[#dbcbb8] bg-white px-4 text-sm outline-none transition focus:border-[#650b13] focus:ring-1 focus:ring-[#650b13]"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mt-3">
                        <label className="mb-1 block text-xs font-semibold text-[#3d2020]">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="h-11 w-full rounded-md border border-[#dbcbb8] bg-white px-4 pr-11 text-sm outline-none transition focus:border-[#650b13] focus:ring-1 focus:ring-[#650b13]"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((previous) => !previous)
                                }
                                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[#92715d] transition hover:text-[#650b13]"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    // Eye Off
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M3 3l18 18"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M10.58 10.58a2 2 0 002.83 2.83"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M9.88 4.24A10.94 10.94 0 0112 4c5 0 8.5 4 9.5 6-.36.72-1.18 1.92-2.55 3.12M6.61 6.61C4.59 8.06 3.3 9.7 2.5 10c1 2 4.5 6 9.5 6 1.05 0 2.03-.17 2.93-.47"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                ) : (
                                    // Eye
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle cx="12" cy="12" r="2.5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="mt-3">
                        <label className="mb-1 block text-xs font-semibold text-[#3d2020]">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className={`h-11 w-full rounded-md border bg-white px-4 pr-11 text-sm outline-none transition focus:ring-1 ${
                                    formData.confirmPassword &&
                                    formData.password !==
                                        formData.confirmPassword
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                                        : "border-[#dbcbb8] focus:border-[#650b13] focus:ring-[#650b13]"
                                }`}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (previous) => !previous
                                    )
                                }
                                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[#92715d] transition hover:text-[#650b13]"
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                            >
                                {showConfirmPassword ? (
                                    // Eye Off
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M3 3l18 18"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M10.58 10.58a2 2 0 002.83 2.83"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M9.88 4.24A10.94 10.94 0 0112 4c5 0 8.5 4 9.5 6-.36.72-1.18 1.92-2.55 3.12M6.61 6.61C4.59 8.06 3.3 9.7 2.5 10c1 2 4.5 6 9.5 6 1.05 0 2.03-.17 2.93-.47"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                ) : (
                                    // Eye
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle cx="12" cy="12" r="2.5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                            {error}
                        </p>
                    )}

                    {/* REGISTER */}
                    <button
                        type="submit"
                        className="mt-5 h-11 w-full rounded-md bg-[#650b13] text-sm font-bold text-white transition hover:bg-[#820f19]"
                    >
                        Create Account
                    </button>
                </form>

                {/* LOGIN */}
                <div className="mt-5 text-center">
                    <span className="text-sm text-gray-500">
                        Already have an account?{" "}
                    </span>

                    <button
                        type="button"
                        onClick={onLogin}
                        className="text-sm font-bold text-[#650b13] hover:underline"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterModal;