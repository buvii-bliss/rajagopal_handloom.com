import React, { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Search from "./assets/components/Search";
import Navbar from "./assets/components/Navbar";
import BottomBar from "./assets/components/BottomBar";
import ScrollToTop from "./assets/components/ScrollToTop";

import Home from "./pages/Home";
import ProductDetails from "./assets/components/ProductDetails";

function App() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [userName, setUserName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ================= WISHLIST =================
    const toggleWishlist = (product) => {
        setWishlist((previous) => {
            const exists = previous.some(
                (item) => item.id === product.id
            );

            if (exists) {
                return previous.filter(
                    (item) => item.id !== product.id
                );
            }

            return [...previous, product];
        });
    };

    // ================= CART =================
    const addToCart = (product) => {
        setCart((previous) => {
            const exists = previous.some(
                (item) => item.id === product.id
            );

            if (exists) {
                return previous;
            }

            return [...previous, product];
        });
    };

    // ================= LOGIN =================
    const handleLogin = (user) => {
        setUserName(user.name);
        setIsLoggedIn(true);

        return {
            success: true,
        };
    };

    // ================= REGISTER =================
    const handleRegister = (user) => {
        setUserName(user.name);
        setIsLoggedIn(true);

        return {
            success: true,
        };
    };

    // ================= LOGOUT =================
    const handleLogout = () => {
        setUserName("");
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <ScrollToTop />

            <div className="min-h-screen bg-[#fffaf2] pb-16 md:pb-0">
                <Navbar
                    wishlistCount={wishlist.length}
                    cartCount={cart.length}
                    searchQuery={searchQuery}
                    onSearch={setSearchQuery}
                    setSelectedCategory={setSelectedCategory}
                    userName={userName}
                    isLoggedIn={isLoggedIn}
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                    onLogout={handleLogout}
                />

                <Routes>
                    {/* Home */}
                    <Route
                        path="/"
                        element={
                            <Home
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                searchQuery={searchQuery}
                                wishlist={wishlist}
                                toggleWishlist={toggleWishlist}
                                addToCart={addToCart}
                            />
                        }
                    />

                    {/* Product Details */}
                    <Route
                        path="/product/:id"
                        element={
                            <ProductDetails
                                addToCart={addToCart}
                                wishlist={wishlist}
                                toggleWishlist={toggleWishlist}
                            />
                        }
                    />

                    {/* Search Page */}
                    <Route
                        path="/search"
                        element={
                            <Search onSearch={setSearchQuery} />
                        }
                    />
                </Routes>

                <BottomBar
                    wishlistCount={wishlist.length}
                    cartCount={cart.length}
                />
            </div>
        </BrowserRouter>
    );
}

export default App;