// src/data/category.js

import products from "./Product";

const categoryOrder = [
    "Sarees",
    "Kids Collection",
    "Dhoti & Mundu",
    "Kurtas & Sets",
    "Handloom Cotton",
    "Stoles & Dupattas",
    "Home Furnishings",
    "Bags & Accessories",
    "Silk Collection",
    "Linen",
    "New Arrivals",
    "Offers",
];

const Categories = [
    {
        name: "All Products",
        count: products.length,
    },
    ...categoryOrder
        .filter((name) =>
            products.some((product) => product.category === name)
        )
        .map((name) => ({
            name,
            count: products.filter((product) => product.category === name).length,
        })),
];

export default Categories;