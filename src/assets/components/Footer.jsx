import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

function Footer() {
const [email, setEmail] = useState("");
const [subscribed, setSubscribed] = useState(false);


const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Connect this to your newsletter API to save subscriptions.
    setSubscribed(true);
    setEmail("");
};

const shopLinks = [
    { label: "All Products", href: "/#products-section" },
    { label: "Sarees", href: "/#products-section" },
    { label: "Kurtas & Sets", href: "/#products-section" },
    { label: "Dhoti & Mundu", href: "/#products-section" },
    { label: "Shopping Deals", href: "/#deals-section" },
];

const supportLinks = [
    { label: "My Account", href: "/account" },
    { label: "My Orders", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/",
        icon: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="0.8" fill="currentColor" />
            </>
        ),
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/",
        icon: (
            <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9a1 1 0 0 1 1-1Z" />
        ),
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/",
        icon: (
            <>
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="m10 9 5 3-5 3Z" />
            </>
        ),
    },
];

return (
    <footer className="relative overflow-hidden bg-[#35070c] text-white">

        {/* Decorative gold lines */}
        <div className="h-1 w-full bg-gradient-to-r from-[#650b13] via-[#e4bd63] to-[#650b13]" />

        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full border border-[#e4bd63]/10" />
        <div className="pointer-events-none absolute -right-12 top-20 h-48 w-48 rounded-full border border-[#e4bd63]/10" />

        {/* Newsletter section */}
        <div className="relative border-b border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:py-12">
                <div className="max-w-lg">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e4bd63]">
                        A little something special
                    </span>

                    <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                        Beautiful traditions,{" "}
                        <span className="italic text-[#e4bd63]">
                            delivered to you.
                        </span>
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-white/60">
                        Discover new collections, exclusive offers and
                        handloom favourites.
                    </p>
                </div>

                <form
                    onSubmit={handleSubscribe}
                    className="w-full max-w-md"
                >
                    <div className="flex overflow-hidden rounded-lg border border-[#e4bd63]/40 bg-white/[0.06] p-1">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setSubscribed(false);
                            }}
                            placeholder="Enter your email address"
                            aria-label="Email address"
                            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-white/40 sm:px-4"
                        />

                        <button
                            type="submit"
                            className="shrink-0 rounded-md bg-[#e4bd63] px-4 py-3 text-xs font-bold text-[#42070c] transition hover:bg-[#f2d58a] sm:px-5 sm:text-sm"
                        >
                            Subscribe
                        </button>
                    </div>

                    {subscribed && (
                        <p className="mt-2 text-xs text-[#f1cf76]">
                            Thank you! Newsletter signup received.
                        </p>
                    )}

                    <p className="mt-2 text-[10px] text-white/40">
                        Stay inspired. Unsubscribe whenever you wish.
                    </p>
                </form>
            </div>
        </div>

        {/* Main footer */}
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 sm:px-8 md:grid-cols-4 lg:gap-12 lg:py-14">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
                <Link to="/" className="inline-flex items-center">
                    <img
                        src={logo}
                        alt="Rajagopal Handlooms"
                        className="h-20 w-32 object-contain object-left sm:h-24 sm:w-40"
                    />
                </Link>

                <p className="mt-4 max-w-xs text-sm leading-7 text-white/60">
                    Celebrate the timeless beauty of traditional
                    handloom. Find thoughtfully selected styles
                    crafted to make every occasion special.
                </p>

                <div className="mt-5 flex items-center gap-3">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={social.name}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e4bd63]/30 text-[#e4bd63] transition hover:border-[#e4bd63] hover:bg-[#e4bd63] hover:text-[#42070c]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {social.icon}
                            </svg>
                        </a>
                    ))}
                </div>
            </div>

            {/* Shop links */}
            <div>
                <h3 className="font-serif text-lg font-bold text-[#f1cf76]">
                    Shop
                </h3>

                <div className="mb-5 mt-3 h-px w-10 bg-[#e4bd63]/70" />

                <ul className="space-y-3">
                    {shopLinks.map((item) => (
                        <li key={item.label}>
                            <Link
                                to={item.href}
                                className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-[#f1cf76]"
                            >
                                <span className="text-[#e4bd63]/60 transition group-hover:translate-x-1">
                                    ›
                                </span>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Customer service */}
            <div>
                <h3 className="font-serif text-lg font-bold text-[#f1cf76]">
                    Customer Care
                </h3>

                <div className="mb-5 mt-3 h-px w-10 bg-[#e4bd63]/70" />

                <ul className="space-y-3">
                    {supportLinks.map((item) => (
                        <li key={item.label}>
                            <Link
                                to={item.href}
                                className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-[#f1cf76]"
                            >
                                <span className="text-[#e4bd63]/60 transition group-hover:translate-x-1">
                                    ›
                                </span>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-1">
                <h3 className="font-serif text-lg font-bold text-[#f1cf76]">
                    Get in Touch
                </h3>

                <div className="mb-5 mt-3 h-px w-10 bg-[#e4bd63]/70" />

                <p className="mb-5 text-sm leading-6 text-white/60">
                    Have a question about a product or order? We are
                    here to help.
                </p>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4bd63]/10 text-[#e4bd63]">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                            >
                                <path d="M4 6h16v12H4z" />
                                <path d="m4 7 8 6 8-6" />
                            </svg>
                        </span>

                        <div>
                            <p className="text-xs text-white/40">
                                Email us
                            </p>
                            <a
                                href="mailto:support@example.com"
                                className="mt-1 block break-all text-sm text-white/80 transition hover:text-[#f1cf76]"
                            >
                                support@example.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4bd63]/10 text-[#e4bd63]">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                            >
                                <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.9L7.1 10.3a16 16 0 0 0 6 6l1.9-1.9a2 2 0 0 1 1.9-.6l2.8.5a2 2 0 0 1 2.3 2.6Z" />
                            </svg>
                        </span>

                        <div>
                            <p className="text-xs text-white/40">
                                Call us
                            </p>
                            <a
                                href="tel:+910000000000"
                                className="mt-1 block text-sm text-white/80 transition hover:text-[#f1cf76]"
                            >
                                +91 00000 00000
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e4bd63]/25 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#86c88a]" />
                    <span className="text-[10px] font-medium text-white/70">
                        Here to help with your shopping
                    </span>
                </div>
            </div>
        </div>

        {/* Trust strip */}
        <div className="border-y border-white/10 bg-black/10">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8">
                {[
                    {
                        title: "Timeless Handloom",
                        subtitle: "Tradition in every thread",
                        icon: "✦",
                    },
                    {
                        title: "Secure Shopping",
                        subtitle: "Shop with confidence",
                        icon: "◇",
                    },
                    {
                        title: "Customer Support",
                        subtitle: "We are here to assist",
                        icon: "♡",
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="flex items-center justify-center gap-3 sm:justify-start"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e4bd63]/30 text-xl text-[#e4bd63]">
                            {item.icon}
                        </span>

                        <div>
                            <p className="text-xs font-bold text-white">
                                {item.title}
                            </p>
                            <p className="mt-1 text-[11px] text-white/45">
                                {item.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Copyright */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:px-8 md:flex-row md:text-left">
            <p className="text-xs text-white/45">
                © {new Date().getFullYear()} Rajagopal Handlooms.
                All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/45">
                <Link
                    to="/privacy-policy"
                    className="transition hover:text-[#f1cf76]"
                >
                    Privacy Policy
                </Link>

                <span className="h-3 w-px bg-white/20" />

                <Link
                    to="/terms"
                    className="transition hover:text-[#f1cf76]"
                >
                    Terms & Conditions
                </Link>
            </div>

            <p className="text-[10px] tracking-wide text-[#e4bd63]/70">
                WOVEN WITH TRADITION
            </p>
        </div>
    </footer>
);


}

export default Footer;
