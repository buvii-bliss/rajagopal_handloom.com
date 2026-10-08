import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Logout from "./Logout";
import logo from "../img/logo.png";

const Navbar = ({
    wishlistCount = 0,
    cartCount = 0,
    searchQuery = "",
    onSearch,
    setSelectedCategory,
    userName = "",
    isLoggedIn = false,
    onLogin,
    onLogout,
    onRegister,
}) => {
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [wishlistAnimate, setWishlistAnimate] = useState(false);
    const [cartAnimate, setCartAnimate] = useState(false);
    const [searchText, setSearchText] = useState(searchQuery);

    const categories = [
        "Sarees",
        "Kurtas & Sets",
        "Dhoti & Mundu",
        "New Arrivals",
        "Offers",
    ];

    // Sync search value
    useEffect(() => {
        setSearchText(searchQuery);
    }, [searchQuery]);

    // Scroll to products section
    const scrollToProducts = () => {
        const section = document.getElementById("products-section");
        if (!section) return;

        setTimeout(() => {
            const navbar = document.getElementById("main-navbar");
            const navbarHeight = navbar
                ? navbar.getBoundingClientRect().height
                : 0;

            const sectionPosition =
                section.getBoundingClientRect().top + window.pageYOffset;

            const targetPosition = sectionPosition - navbarHeight - 20;

            window.scrollTo({
                top: Math.max(targetPosition, 0),
                behavior: "smooth",
            });
        }, 100);
    };

    // Handle category selection
    const handleCategory = (category) => {
        setSelectedCategory?.(category);
        onSearch?.("");
        setSearchText("");
        setMobileMenuOpen(false);

        if (window.location.pathname !== "/") {
            navigate("/");

            setTimeout(() => {
                setSelectedCategory?.(category);
                scrollToProducts();
            }, 300);

            return;
        }

        setTimeout(() => {
            scrollToProducts();
        }, 100);
    };

    // Handle desktop search
    const handleSearch = (e) => {
        e.preventDefault();

        const value = searchText.trim();
        onSearch?.(value);
        setMobileMenuOpen(false);

        if (window.location.pathname !== "/") {
            navigate("/");

            setTimeout(() => {
                scrollToProducts();
            }, 150);

            return;
        }

        scrollToProducts();
    };

    // Open dedicated search page on mobile
    const openSearchPage = () => {
        setMobileMenuOpen(false);
        navigate("/search");
    };

    // Wishlist animation
    useEffect(() => {
        if (wishlistCount > 0) {
            setWishlistAnimate(true);

            const timer = setTimeout(() => {
                setWishlistAnimate(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [wishlistCount]);

    // Cart animation
    useEffect(() => {
        if (cartCount > 0) {
            setCartAnimate(true);

            const timer = setTimeout(() => {
                setCartAnimate(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [cartCount]);

    // Login
    const openLogin = () => {
        setRegisterModalOpen(false);
        setLoginModalOpen(true);
    };

    // Register
    const openRegister = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
    };

    // Logout
    const openLogout = () => {
        setMobileMenuOpen(false);
        setLogoutModalOpen(true);
    };

    const closeLogout = () => {
        setLogoutModalOpen(false);
    };

    const confirmLogout = () => {
        setLogoutModalOpen(false);
        onLogout?.();
    };

    // Home
    const goHome = () => {
        setMobileMenuOpen(false);

        if (window.location.pathname !== "/") {
            navigate("/");

            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }, 150);

            return;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Login success
    const handleLoginSubmit = (loginData) => {
        const result = onLogin?.(loginData);

        if (result?.success) {
            setLoginModalOpen(false);
        }

        return result;
    };

    // Register success
    const handleRegisterSubmit = (userData) => {
        const result = onRegister?.(userData);

        if (result !== false) {
            setRegisterModalOpen(false);
        }

        return result;
    };

    return (
        <>
            {/* Main Navbar */}
            <header
                id="main-navbar"
                className="sticky top-0 z-50 w-full"
            >
                {/* Top Bar */}
                <div className="border-b border-[#7d3338] bg-[#52080f] text-white">
                    <div className="mx-auto flex min-h-[70px] max-w-[1600px] items-center gap-2 px-3 sm:gap-4 sm:px-5 lg:h-[82px] lg:px-8">

                        {/* Logo */}
                        <button
                            type="button"
                            onClick={goHome}
                            className="flex h-[62px] w-[150px] shrink-0 items-center justify-center sm:h-[68px] sm:w-[94px] lg:h-[74px] lg:w-[159px]"
                        >
                            <img
                                src={logo}
                                alt="Rajagopal"
                                className="h-full w-full object-contain"
                            />
                        </button>

                        {/* Desktop Search */}
                        <form
                            onSubmit={handleSearch}
                            className="hidden min-w-0 flex-1 md:block"
                        >
                            <div className="mx-auto flex h-[46px] max-w-[850px] overflow-hidden rounded-md bg-white">
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                    placeholder="Search sarees, fabrics, kurtas..."
                                    className="min-w-0 flex-1 px-5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                                />

                                <button
                                    type="submit"
                                    aria-label="Search products"
                                    className="flex w-[62px] shrink-0 items-center justify-center bg-[#e4bd63] text-[#4b080e] transition hover:bg-[#f1d17e]"
                                >
                                    <SearchIcon size={24} strokeWidth={2.5} />
                                </button>
                            </div>
                        </form>

                        {/* Account */}
                        <button
                            type="button"
                            onClick={isLoggedIn ? undefined : openLogin}
                            className="hidden min-w-fit text-left lg:block"
                        >
                            {isLoggedIn ? (
                                <>
                                    <span className="block text-[11px] text-[#e7c878]">
                                        Hello,
                                    </span>
                                    <span className="block max-w-[130px] truncate text-sm font-semibold">
                                        {userName}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="block text-[11px] text-[#e7c878]">
                                        Hello,
                                    </span>
                                    <span className="text-sm font-semibold">
                                        Sign in
                                    </span>
                                </>
                            )}
                        </button>

                        {/* Logout */}
                        {isLoggedIn && (
                            <button
                                type="button"
                                onClick={openLogout}
                                className="hidden text-xs font-semibold text-[#e7c878] hover:text-white lg:block"
                            >
                                Logout
                            </button>
                        )}

                        {/* My Orders */}
                        <button
                            type="button"
                            onClick={() => navigate("/orders")}
                            className="hidden min-w-fit text-left lg:block"
                        >
                            <span className="text-sm font-semibold text-[#e7c878]">
                                My Orders
                            </span>
                        </button>

                        {/* Desktop Wishlist */}
                        <button
                            type="button"
                            aria-label="Wishlist"
                            onClick={() => navigate("/wishlist")}
                            className="group relative hidden min-w-fit items-center lg:flex"
                        >
                            <div className="relative">
                                <svg
                                    className={`h-6 w-6 text-[#f1cf76] transition ${
                                        wishlistAnimate
                                            ? "scale-125 animate-bounce"
                                            : "group-hover:scale-110"
                                    }`}
                                    fill={wishlistCount > 0 ? "currentColor" : "none"}
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
                                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e4bd63] px-1 text-[8px] font-bold text-[#52080f]">
                                        {wishlistCount}
                                    </span>
                                )}
                            </div>
                        </button>

                        {/* Desktop Cart */}
                        <button
                            type="button"
                            aria-label="Cart"
                            onClick={() => navigate("/cart")}
                            className="group relative hidden min-w-fit items-center lg:flex"
                        >
                            <div className="relative">
                                <svg
                                    className={`h-6 w-6 text-[#f1cf76] transition ${
                                        cartAnimate
                                            ? "scale-125 animate-bounce"
                                            : "group-hover:scale-110"
                                    }`}
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
                                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e4bd63] px-1 text-[8px] font-bold text-[#52080f]">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </button>

                        {/* Mobile Actions */}
                        <div className="ml-auto flex items-center gap-1 md:hidden">

                            {/* Mobile Search Icon */}
                            <button
                                type="button"
                                onClick={openSearchPage}
                                aria-label="Open search"
                                className="flex h-9 w-9 shrink-0 items-center justify-center text-[#f1cf76] transition hover:text-white"
                            >
                                <SearchIcon size={22} strokeWidth={2} />
                            </button>

                            {/* Mobile Wishlist */}
                            <button
                                type="button"
                                aria-label="Wishlist"
                                onClick={() => navigate("/wishlist")}
                                className="relative flex h-9 w-9 items-center justify-center"
                            >
                                <svg
                                    className={`h-6 w-6 text-[#f1cf76] ${
                                        wishlistAnimate ? "animate-bounce" : ""
                                    }`}
                                    fill={wishlistCount > 0 ? "currentColor" : "none"}
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
                                    <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e4bd63] px-1 text-[8px] font-bold text-[#52080f]">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Cart */}
                            <button
                                type="button"
                                aria-label="Cart"
                                onClick={() => navigate("/cart")}
                                className="relative flex h-9 w-9 items-center justify-center"
                            >
                                <svg
                                    className={`h-6 w-6 text-[#f1cf76] ${
                                        cartAnimate ? "animate-bounce" : ""
                                    }`}
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
                                    <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e4bd63] px-1 text-[8px] font-bold text-[#52080f]">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu */}
                            <button
                                type="button"
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#8e4549] text-[#f1cf76]"
                            >
                                {mobileMenuOpen ? (
                                    <svg
                                        className="h-5 w-5"
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
                                ) : (
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M4 6h16M4 12h16M4 18h16"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden border-b border-[#70252b] bg-[#650b13] md:block">
                    <div className="mx-auto flex h-[52px] max-w-[1600px] items-center px-5 lg:px-8">

                        {/* All */}
                        <button
                            type="button"
                            onClick={() => handleCategory("All")}
                            className="flex h-full shrink-0 items-center gap-3 border-r border-[#7c2b31] px-3 pr-7 text-sm font-semibold text-white transition hover:bg-[#780e17]"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M4 6h16M4 12h16M4 18h16"
                                    strokeLinecap="round"
                                />
                            </svg>
                            All
                        </button>

                        {/* Main Links */}
                        <nav className="flex items-center gap-6 px-5">
                            <button
                                type="button"
                                onClick={goHome}
                                className="whitespace-nowrap text-[13px] font-semibold text-white hover:text-[#f3d27b]"
                            >
                                Home
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/orders")}
                                className="whitespace-nowrap text-[13px] font-semibold text-white hover:text-[#f3d27b]"
                            >
                                My Orders
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/contact")}
                                className="whitespace-nowrap text-[13px] font-semibold text-white hover:text-[#f3d27b]"
                            >
                                Contact Us
                            </button>
                        </nav>

                        {/* Categories */}
                        <nav className="ml-auto flex min-w-0 items-center gap-6">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => handleCategory(category)}
                                    className={`whitespace-nowrap text-[13px] font-semibold text-white hover:text-[#f3d27b] ${
                                        category === "Offers" ? "text-[#f3d27b]" : ""
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="border-t border-[#7b2d33] bg-[#4a070d] md:hidden">
                        <div className="max-h-[70vh] overflow-y-auto px-4 py-3">

                            {/* Account */}
                            <button
                                type="button"
                                onClick={() => {
                                    if (isLoggedIn) {
                                        openLogout();
                                    } else {
                                        openLogin();
                                    }
                                }}
                                className="flex w-full items-center justify-between border-b border-[#713037] py-3 text-left text-white"
                            >
                                <div>
                                    {isLoggedIn ? (
                                        <>
                                            <span className="block text-xs text-[#e7c878]">
                                                Hello
                                            </span>
                                            <span className="font-semibold">
                                                {userName}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="block text-xs text-[#e7c878]">
                                                Hello, Sign in
                                            </span>
                                            <span className="font-semibold">
                                                Account & Lists
                                            </span>
                                        </>
                                    )}
                                </div>
                                <span>›</span>
                            </button>

                            {/* Home */}
                            <button
                                type="button"
                                onClick={goHome}
                                className="flex w-full items-center justify-between border-b border-[#713037] py-3 text-left text-white"
                            >
                                <span className="font-semibold">Home</span>
                                <span>›</span>
                            </button>

                            {/* My Orders */}
                            <button
                                type="button"
                                onClick={() => {
                                    navigate("/orders");
                                    setMobileMenuOpen(false);
                                }}
                                className="flex w-full items-center justify-between border-b border-[#713037] py-3 text-left text-white"
                            >
                                <span className="font-semibold">My Orders</span>
                                <span>›</span>
                            </button>

                            {/* Contact */}
                            <button
                                type="button"
                                onClick={() => {
                                    navigate("/contact");
                                    setMobileMenuOpen(false);
                                }}
                                className="flex w-full items-center justify-between border-b border-[#713037] py-3 text-left text-white"
                            >
                                <span className="font-semibold">Contact Us</span>
                                <span>›</span>
                            </button>

                            {/* Wishlist */}
                            <button
                                type="button"
                                onClick={() => {
                                    navigate("/wishlist");
                                    setMobileMenuOpen(false);
                                }}
                                className="flex w-full items-center justify-between border-b border-[#713037] py-3 text-white"
                            >
                                <span className="flex items-center gap-3 font-semibold">
                                    <svg
                                        className="h-5 w-5 text-[#e4bd63]"
                                        fill={wishlistCount > 0 ? "currentColor" : "none"}
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
                                    Wishlist
                                </span>

                                <span className="rounded-full bg-[#e4bd63] px-2 py-0.5 text-xs font-bold text-[#52080f]">
                                    {wishlistCount}
                                </span>
                            </button>

                            {/* Categories */}
                            <div className="pt-3">
                                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#e4bd63]">
                                    Shop By Category
                                </p>

                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => handleCategory(category)}
                                        className="flex w-full items-center justify-between border-b border-[#713037] py-2.5 text-left text-sm font-medium text-white"
                                    >
                                        {category}
                                        <span className="text-[#d9aeb1]">›</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Login Modal */}
            {loginModalOpen && (
                <LoginModal
                    onClose={() => setLoginModalOpen(false)}
                    onRegister={openRegister}
                    onLogin={handleLoginSubmit}
                />
            )}

            {/* Register Modal */}
            {registerModalOpen && (
                <RegisterModal
                    onClose={() => setRegisterModalOpen(false)}
                    onLogin={openLogin}
                    onRegister={handleRegisterSubmit}
                />
            )}

            {/* Logout Modal */}
            {logoutModalOpen && (
                <Logout
                    onClose={closeLogout}
                    onConfirm={confirmLogout}
                />
            )}
        </>
    );
};

export default Navbar;