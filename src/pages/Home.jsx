import React from "react";

import Hero from "../assets/components/Home/Hero";
import Category from "../assets/components/Home/Category";
import Sale from "../assets/components/Home/Sale";
import Collection from "../assets/components/Home/Collection";
import ShowProduct from "../assets/components/Home/ShowProduct";
import Offer from "../assets/components/Home/Offer";

function Home({
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    wishlist,
    toggleWishlist,
    addToCart,
}) {
    return (
        <main>
            <Hero />

            <Category
                setSelectedCategory={setSelectedCategory}
            />

          


            <ShowProduct
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
            />
                        <Collection />
                        <Offer />

            <Sale />
        </main>
    );
}

export default Home;