import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Logout from "./Logout";
import logo from "../img/logo.png";

const Navbar = ({
    wishlistCount: propWishlistCount,
    cartCount: propCartCount,
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

    const [storedWishlistCount, setStoredWishlistCount] = useState(0);
    const [storedCartCount, setStoredCartCount] = useState(0);

    const categories = [
        "Sarees",
        "Kurtas & Sets",
        "Dhoti & Mundu",
        "New Arrivals",
        "Offers",
    ];

    // Read wishlist and cart data from localStorage.
    const refreshCounts = useCallback(() => {
        try {
            const wishlist = JSON.parse(
                localStorage.getItem("wishlist") || "[]"
            );

            const cart = JSON.parse(
                localStorage.getItem("cart") || "[]"
            );

            setStoredWishlistCount(
                Array.isArray(wishlist) ? wishlist.length : 0
            );

            setStoredCartCount(
                Array.isArray(cart)
                    ? cart.reduce(
                          (total, item) =>
                              total + Math.max(0, Number(item.quantity) || 1),
                          0
                      )
                    : 0
            );
        } catch (error) {
            console.error("Unable to read wishlist/cart:", error);
            setStoredWishlistCount(0);
            setStoredCartCount(0);
        }
    }, []);

    // Use passed counts when provided; otherwise use localStorage counts.
    const wishlistCount =
        propWishlistCount !== undefined
            ? propWishlistCount
            : storedWishlistCount;

    const cartCount =
        propCartCount !== undefined
            ? propCartCount
            : storedCartCount;

    useEffect(() => {
        refreshCounts();

        const handleWishlistUpdate = () => refreshCounts();
        const handleCartUpdate = () => refreshCounts();

        window.addEventListener("wishlistUpdated", handleWishlistUpdate);
        window.addEventListener("cartUpdated", handleCartUpdate);
        window.addEventListener("storage", handleWishlistUpdate);
        window.addEventListener("focus", handleWishlistUpdate);

        return () => {
            window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
            window.removeEventListener("cartUpdated", handleCartUpdate);
            window.removeEventListener("storage", handleWishlistUpdate);
            window.removeEventListener("focus", handleWishlistUpdate);
        };
    }, [refreshCounts]);

    useEffect(() => {
        setSearchText(searchQuery);
    }, [searchQuery]);

    // Wishlist animation
    useEffect(() => {
        if (!wishlistCount) return;

        setWishlistAnimate(true);

        const timer = setTimeout(() => setWishlistAnimate(false), 500);
        return () => clearTimeout(timer);
    }, [wishlistCount]);

    // Cart animation
    useEffect(() => {
        if (!cartCount) return;

        setCartAnimate(true);

        const timer = setTimeout(() => setCartAnimate(false), 500);
        return () => clearTimeout(timer);
    }, [cartCount]);

    const navigateTo = (path) => {
        setMobileMenuOpen(false);
        navigate(path);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const scrollToProducts = () => {
        setTimeout(() => {
            const section = document.getElementById("products-section");
            if (!section) return;

            const navbar = document.getElementById("main-navbar");
            const navbarHeight = navbar
                ? navbar.getBoundingClientRect().height
                : 0;

            const sectionPosition =
                section.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: Math.max(sectionPosition - navbarHeight - 20, 0),
                behavior: "smooth",
            });
        }, 100);
    };

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

        scrollToProducts();
    };

    const handleSearch = (event) => {
        event.preventDefault();

        onSearch?.(searchText.trim());
        setMobileMenuOpen(false);

        if (window.location.pathname !== "/") {
            navigate("/");
            setTimeout(scrollToProducts, 150);
            return;
        }

        scrollToProducts();
    };

    const openSearchPage = () => {
        setMobileMenuOpen(false);
        navigate("/search");
    };

    const openLogin = () => {
        setMobileMenuOpen(false);
        setRegisterModalOpen(false);
        setLoginModalOpen(true);
    };

    const openRegister = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
    };

    const openLogout = () => {
        setMobileMenuOpen(false);
        setLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        setLogoutModalOpen(false);
        onLogout?.();
    };

    const goHome = () => {
        setMobileMenuOpen(false);

        if (window.location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 150);
            return;
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleLoginSubmit = (loginData) => {
        const result = onLogin?.(loginData);

        if (result?.success) {
            setLoginModalOpen(false);
        }

        return result;
    };

    const handleRegisterSubmit = (userData) => {
        const result = onRegister?.(userData);

        if (result !== false) {
            setRegisterModalOpen(false);
        }

        return result;
    };

    const HeartIcon = ({ mobile = false }) => (
        <div className="relative">
            <svg
                className={`h-6 w-6 text-[#E7C15F] transition ${
                    wishlistAnimate ? "scale-125 animate-bounce" : ""
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
                <span
                    className={`absolute -right-2 -top-2 flex min-w-4 items-center justify-center rounded-full bg-[#E7C15F] px-1 font-bold text-[#50070D] ${
                        mobile ? "h-4 text-[9px]" : "h-4 text-[9px]"
                    }`}
                >
                    {wishlistCount}
                </span>
            )}
        </div>
    );

    const CartIcon = () => (
        <div className="relative">
            <svg
                className={`h-6 w-6 text-[#E7C15F] transition ${
                    cartAnimate ? "scale-125 animate-bounce" : ""
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
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E7C15F] px-1 text-[9px] font-bold text-[#50070D]">
                    {cartCount}
                </span>
            )}
        </div>
    );

    return (
        <>
            <header id="main-navbar" className="sticky top-0 z-50 w-full">
                {/* Top bar */}
                <div className="border-b border-[#793037] bg-[#50070D] text-white">
                    <div className="mx-auto flex min-h-[70px] max-w-[1600px] items-center gap-2 px-3 sm:gap-4 sm:px-5 lg:h-[82px] lg:px-8">
                        {/* Logo */}
                        <button
                            type="button"
                            onClick={goHome}
                            aria-label="Go to homepage"
                            className="flex h-[62px] w-[130px] shrink-0 items-center justify-center sm:h-[68px] sm:w-[150px] lg:h-[74px] lg:w-[200px]"
                        >
                            <img
                                src={logo}
                                alt="Rajagopal Handloom"
                                className="h-full w-full object-contain"
                            />
                        </button>

                        {/* Desktop search */}
                        <form
                            onSubmit={handleSearch}
                            className="hidden min-w-0 flex-1 md:block"
                        >
                            <div className="mx-auto flex h-[46px] max-w-[850px] overflow-hidden rounded-lg bg-white">
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={(event) =>
                                        setSearchText(event.target.value)
                                    }
                                    placeholder="Search sarees, fabrics, kurtas..."
                                    aria-label="Search products"
                                    className="min-w-0 flex-1 px-5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                                />

                                <button
                                    type="submit"
                                    aria-label="Search products"
                                    className="flex w-[62px] shrink-0 items-center justify-center bg-[#E7C15F] text-[#50070D] transition hover:bg-[#F3D887]"
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
                            <span className="block text-[11px] text-[#E7C15F]">
                                Hello,
                            </span>
                            <span className="block max-w-[130px] truncate text-sm font-semibold">
                                {isLoggedIn ? userName : "Sign in"}
                            </span>
                        </button>

                        {isLoggedIn && (
                            <button
                                type="button"
                                onClick={openLogout}
                                className="hidden text-xs font-semibold text-[#E7C15F] hover:text-white lg:block"
                            >
                                Logout
                            </button>
                        )}

                        {/* Orders */}
                        <button
                            type="button"
                            onClick={() => navigateTo("/my-orders")}
                            className="hidden min-w-fit text-left lg:block"
                        >
                            <span className="text-sm font-semibold text-[#E7C15F]">
                                My Orders
                            </span>
                        </button>

                        {/* Desktop wishlist */}
                        <button
                            type="button"
                            aria-label={`Wishlist, ${wishlistCount} items`}
                            onClick={() => navigateTo("/wishlist")}
                            className="group relative hidden min-w-fit items-center lg:flex"
                        >
                            <HeartIcon />
                        </button>

                        {/* Desktop cart */}
                        <button
                            type="button"
                            aria-label={`Cart, ${cartCount} items`}
                            onClick={() => navigateTo("/cart")}
                            className="group relative hidden min-w-fit items-center lg:flex"
                        >
                            <CartIcon />
                        </button>

                        {/* Mobile actions */}
                        <div className="ml-auto flex items-center gap-1 md:hidden">
                            <button
                                type="button"
                                onClick={openSearchPage}
                                aria-label="Open search"
                                className="flex h-9 w-9 shrink-0 items-center justify-center text-[#E7C15F]"
                            >
                                <SearchIcon size={22} />
                            </button>

                            <button
                                type="button"
                                aria-label="Wishlist"
                                onClick={() => navigateTo("/wishlist")}
                                className="flex h-9 w-9 items-center justify-center"
                            >
                                <HeartIcon mobile />
                            </button>

                            <button
                                type="button"
                                aria-label="Cart"
                                onClick={() => navigateTo("/cart")}
                                className="flex h-9 w-9 items-center justify-center"
                            >
                                <CartIcon />
                            </button>

                            <button
                                type="button"
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={mobileMenuOpen}
                                onClick={() =>
                                    setMobileMenuOpen((open) => !open)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#793037] text-[#E7C15F]"
                            >
                                {mobileMenuOpen ? (
                                    <X size={22} />
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

                {/* Desktop navigation */}
                <div className="hidden border-b border-[#793037] bg-[#650B13] md:block">
                    <div className="mx-auto flex h-[52px] max-w-[1600px] items-center px-5 lg:px-8">
                        <button
                            type="button"
                            onClick={() => handleCategory("All Products")}
                            className="flex h-full shrink-0 items-center gap-3 border-r border-[#793037] px-3 pr-7 text-sm font-semibold text-white transition hover:bg-[#790F19]"
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

                        <nav className="flex items-center gap-6 px-5">
                            <button
                                type="button"
                                onClick={goHome}
                                className="whitespace-nowrap text-[13px] font-semibold text-white hover:text-[#E7C15F]"
                            >
                                Home
                            </button>

                            <button
                                type="button"
                                onClick={() => navigateTo("/my-orders")}
                                className="whitespace-nowrap text-[13px] font-semibold text-white hover:text-[#E7C15F]"
                            >
                                My Orders
                            </button>

                            <button
                                type="button"
                                onClick={() => navigateTo("/contact")}
                                className="whitespace-nowrap text-[13px] font-semibold text-white hover:text-[#E7C15F]"
                            >
                                Contact Us
                            </button>
                        </nav>

                        <nav className="ml-auto flex min-w-0 items-center gap-6">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => handleCategory(category)}
                                    className={`whitespace-nowrap text-[13px] font-semibold transition hover:text-[#E7C15F] ${
                                        category === "Offers"
                                            ? "text-[#E7C15F]"
                                            : "text-white"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="border-t border-[#793037] bg-[#3D0509] md:hidden">
                        <div className="max-h-[70vh] overflow-y-auto px-4 py-3">
                            <button
                                type="button"
                                onClick={() => {
                                    if (isLoggedIn) {
                                        openLogout();
                                    } else {
                                        openLogin();
                                    }
                                }}
                                className="flex w-full items-center justify-between border-b border-[#793037] py-3 text-left text-white"
                            >
                                <span>
                                    <span className="block text-xs text-[#E7C15F]">
                                        Hello
                                    </span>
                                    <span className="font-semibold">
                                        {isLoggedIn ? userName : "Sign in"}
                                    </span>
                                </span>
                                <span>›</span>
                            </button>

                            {[
                                { label: "Home", action: goHome },
                                {
                                    label: "My Orders",
                                    action: () => navigateTo("/my-orders"),
                                },
                                {
                                    label: "Contact Us",
                                    action: () => navigateTo("/contact"),
                                },
                            ].map((item) => (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={item.action}
                                    className="flex w-full items-center justify-between border-b border-[#793037] py-3 text-left font-semibold text-white"
                                >
                                    {item.label}
                                    <span>›</span>
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() => navigateTo("/wishlist")}
                                className="flex w-full items-center justify-between border-b border-[#793037] py-3 text-white"
                            >
                                <span className="flex items-center gap-3 font-semibold">
                                    <HeartIcon mobile />
                                    Wishlist
                                </span>
                                <span className="rounded-full bg-[#E7C15F] px-2 py-0.5 text-xs font-bold text-[#50070D]">
                                    {wishlistCount}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => navigateTo("/cart")}
                                className="flex w-full items-center justify-between border-b border-[#793037] py-3 text-white"
                            >
                                <span className="flex items-center gap-3 font-semibold">
                                    <CartIcon />
                                    Cart
                                </span>
                                <span className="rounded-full bg-[#E7C15F] px-2 py-0.5 text-xs font-bold text-[#50070D]">
                                    {cartCount}
                                </span>
                            </button>

                            <div className="pt-3">
                                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E7C15F]">
                                    Shop By Category
                                </p>

                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => handleCategory(category)}
                                        className="flex w-full items-center justify-between border-b border-[#793037] py-2.5 text-left text-sm font-medium text-white"
                                    >
                                        {category}
                                        <span className="text-[#E7C15F]">›</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Login modal */}
            {loginModalOpen && (
                <LoginModal
                    onClose={() => setLoginModalOpen(false)}
                    onRegister={openRegister}
                    onLogin={handleLoginSubmit}
                />
            )}

            {/* Register modal */}
            {registerModalOpen && (
                <RegisterModal
                    onClose={() => setRegisterModalOpen(false)}
                    onLogin={openLogin}
                    onRegister={handleRegisterSubmit}
                />
            )}

            {/* Logout modal */}
            {logoutModalOpen && (
                <Logout
                    onClose={() => setLogoutModalOpen(false)}
                    onConfirm={confirmLogout}
                />
            )}
        </>
    );
};

export default Navbar;

