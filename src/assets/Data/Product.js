
import banner1 from "../../assets/img/banner1.png";
import kurta from "../../assets/img/kurta.webp";
import kutri from "../../assets/img/kurti.webp";
import dhotii from "../../assets/img/dhotii.webp";
import dhoti from "../../assets/img/dhoti.webp";
import saree1 from "../../assets/img/saree1.jpg";
import saree2 from "../../assets/img/saree2.jpg";
import saree from "../../assets/img/onam.webp";
import kid from "../../assets/img/kid1.webp";
import pink from "../../assets/img/pinky.jpeg";
import pinky from "../../assets/img/pinkbaby.webp";
import baby from "../../assets/img/babyboy.webp";
import kid2 from "../../assets/img/kid2.jpg";

// Bulk discounts are applied in ProductDetails.jsx.
// 100–199 pieces: 20%
// 200–299 pieces: 25%
// 300+ pieces: 30%

const bulkDiscounts = [
    { minQuantity: 100, discount: 20 },
    { minQuantity: 200, discount: 25 },
    { minQuantity: 300, discount: 30 },
];

const freeSize = [
    { name: "Free Size", available: true },
];

const clothingSizes = [
    { name: "S", available: true },
    { name: "M", available: true },
    { name: "L", available: true },
    { name: "XL", available: true },
    { name: "XXL", available: true },
];

const products = [
    {
        id: 1,
        name: "Kanchipuram Silk Saree with Zari Border",
        category: "Sarees",
        price: 4999,
        originalPrice: 5999,
        rating: 4.8,
        reviews: 124,
        image: saree1,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "saree silk kanchipuram zari traditional women",

        variants: [
            {
                id: "1-maroon",
                name: "Maroon",
                images: [saree1, saree2, saree],
            },
            {
                id: "1-pink",
                name: "Pink",
                images: [saree2, saree1, saree],
            },
            {
                id: "1-red",
                name: "Red",
                images: [saree, saree1, saree2],
            },
        ],
    },

    {
        id: 2,
        name: "Cotton Saree with Traditional Border",
        category: "Sarees",
        price: 1899,
        originalPrice: 2299,
        rating: 4.7,
        reviews: 98,
        image: saree2,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "cotton saree traditional handloom women",

        variants: [
            {
                id: "2-green",
                name: "Green",
                images: [saree2, saree1, saree],
            },
            {
                id: "2-maroon",
                name: "Maroon",
                images: [saree1, saree2, saree],
            },
            {
                id: "2-orange",
                name: "Orange",
                images: [saree, saree2, saree1],
            },
        ],
    },

    {
        id: 3,
        name: "Kerala Mundu 100% Cotton",
        category: "Dhoti & Mundu",
        price: 1299,
        originalPrice: 1599,
        rating: 4.9,
        reviews: 76,
        image: dhotii,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "kerala mundu dhoti cotton men traditional",

        variants: [
            {
                id: "3-white",
                name: "White",
                images: [dhotii, dhoti, banner1],
            },
            {
                id: "3-cream",
                name: "Cream",
                images: [dhoti, dhotii, banner1],
            },
        ],
    },

    {
        id: 4,
        name: "Handloom Kurta Set for Men",
        category: "Kurtas & Sets",
        price: 2499,
        originalPrice: 2999,
        rating: 4.6,
        reviews: 65,
        image: kurta,
        sizes: [
            { name: "S", available: true },
            { name: "M", available: true },
            { name: "L", available: false },
            { name: "XL", available: true },
            { name: "XXL", available: true },
        ],
        bulkDiscounts,
        keywords: "kurta men handloom ethnic traditional",

        variants: [
            {
                id: "4-cream",
                name: "Cream",
                images: [kurta, dhoti, dhotii],
            },
            {
                id: "4-white",
                name: "White",
                images: [dhoti, kurta, dhotii],
            },
            {
                id: "4-maroon",
                name: "Maroon",
                images: [saree1, kurta, saree],
            },
        ],
    },

    {
        id: 5,
        name: "Handloom Cotton Fabric",
        category: "Handloom Cotton",
        price: 899,
        originalPrice: 1099,
        rating: 4.8,
        reviews: 52,
        image: dhoti,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "cotton fabric handloom cloth textile",

        variants: [
            {
                id: "5-cream",
                name: "Cream",
                images: [dhoti, dhotii, banner1],
            },
            {
                id: "5-maroon",
                name: "Maroon",
                images: [saree1, saree2, saree],
            },
            {
                id: "5-pink",
                name: "Pink",
                images: [saree2, saree1, saree],
            },
        ],
    },

    {
        id: 6,
        name: "Traditional Handloom Dhoti",
        category: "Dhoti & Mundu",
        price: 1599,
        originalPrice: 1899,
        rating: 4.7,
        reviews: 43,
        image: dhoti,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "dhoti mundu men cotton traditional",

        variants: [
            {
                id: "6-white",
                name: "White",
                images: [dhoti, dhotii, banner1],
            },
            {
                id: "6-cream",
                name: "Cream",
                images: [dhotii, dhoti, banner1],
            },
        ],
    },

    {
        id: 7,
        name: "Premium Handloom Dupatta",
        category: "Stoles & Dupattas",
        price: 1299,
        originalPrice: 1599,
        rating: 4.8,
        reviews: 38,
        image: saree2,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "dupatta stole handloom women traditional",

        variants: [
            {
                id: "7-pink",
                name: "Pink",
                images: [saree2, saree1, saree],
            },
            {
                id: "7-maroon",
                name: "Maroon",
                images: [saree1, saree2, saree],
            },
            {
                id: "7-gold",
                name: "Gold",
                images: [saree, saree1, saree2],
            },
        ],
    },

    {
        id: 8,
        name: "Handloom Decorative Collection",
        category: "Home Furnishings",
        price: 799,
        originalPrice: 999,
        rating: 4.6,
        reviews: 31,
        image: banner1,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "home furnishing decorative handloom",

        variants: [
            {
                id: "8-natural",
                name: "Natural",
                images: [banner1, saree2, dhoti],
            },
            {
                id: "8-maroon",
                name: "Maroon",
                images: [saree1, banner1, saree],
            },
        ],
    },

    {
        id: 9,
        name: "Traditional Handloom Bag",
        category: "Bags & Accessories",
        price: 999,
        originalPrice: 1199,
        rating: 4.7,
        reviews: 27,
        image: kutri,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "bag accessories handloom traditional",

        variants: [
            {
                id: "9-brown",
                name: "Brown",
                images: [kutri, banner1, saree1],
            },
            {
                id: "9-maroon",
                name: "Maroon",
                images: [saree1, kutri, saree],
            },
        ],
    },

    {
        id: 10,
        name: "Handloom Silk Saree",
        category: "Silk Collection",
        price: 5499,
        originalPrice: 6499,
        rating: 4.9,
        reviews: 81,
        image: saree1,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "silk saree handloom premium women",

        variants: [
            {
                id: "10-maroon",
                name: "Maroon",
                images: [saree1, saree2, saree],
            },
            {
                id: "10-pink",
                name: "Pink",
                images: [saree2, saree1, saree],
            },
            {
                id: "10-red",
                name: "Red",
                images: [saree, saree1, saree2],
            },
        ],
    },

    {
        id: 11,
        name: "Pure Linen Handloom Fabric",
        category: "Linen",
        price: 1499,
        originalPrice: 1799,
        rating: 4.8,
        reviews: 45,
        image: saree2,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "linen fabric handloom cloth",

        variants: [
            {
                id: "11-natural",
                name: "Natural",
                images: [saree2, dhoti, banner1],
            },
            {
                id: "11-cream",
                name: "Cream",
                images: [dhoti, saree2, dhotii],
            },
        ],
    },

    {
        id: 12,
        name: "Traditional Cotton Handloom",
        category: "Handloom Cotton",
        price: 1199,
        originalPrice: 1399,
        rating: 4.7,
        reviews: 56,
        image: dhoti,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "cotton handloom traditional fabric",

        variants: [
            {
                id: "12-cream",
                name: "Cream",
                images: [dhoti, dhotii, banner1],
            },
            {
                id: "12-pink",
                name: "Pink",
                images: [saree2, saree1, saree],
            },
            {
                id: "12-maroon",
                name: "Maroon",
                images: [saree1, saree2, saree],
            },
        ],
    },

    {
        id: 13,
        name: "Festive Handloom Collection",
        category: "New Arrivals",
        price: 3999,
        originalPrice: 4599,
        rating: 4.9,
        reviews: 36,
        image: saree,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "festive new arrival onam traditional collection",

        variants: [
            {
                id: "13-red",
                name: "Red",
                images: [saree, saree1, saree2],
            },
            {
                id: "13-maroon",
                name: "Maroon",
                images: [saree1, saree, saree2],
            },
            {
                id: "13-pink",
                name: "Pink",
                images: [saree2, saree1, saree],
            },
        ],
    },

    {
        id: 14,
        name: "Special Festive Saree",
        category: "Offers",
        price: 2999,
        originalPrice: 3599,
        rating: 4.8,
        reviews: 71,
        image: saree,
        sizes: freeSize,
        bulkDiscounts,
        keywords: "offer festive saree discount traditional",

        variants: [
            {
                id: "14-red",
                name: "Red",
                images: [saree, saree1, saree2],
            },
            {
                id: "14-pink",
                name: "Pink",
                images: [saree2, saree, saree1],
            },
            {
                id: "14-maroon",
                name: "Maroon",
                images: [saree1, saree2, saree],
            },
        ],
    },

    {
        id: 15,
        name: "Traditional Kids Collection",
        category: "Kids Collection",
        price: 1499,
        originalPrice: 1799,
        rating: 4.8,
        reviews: 29,
        image: kid,
        sizes: [
            { name: "S", available: true },
            { name: "M", available: true },
            { name: "L", available: false },
            { name: "XL", available: true },
        ],
        bulkDiscounts,
        keywords: "kids children traditional dress handloom",

        variants: [
            {
                id: "15-white",
                name: "white",
                images: [kid, kid2],
            },
            {
                id: "15-pink",
                name: "Pink",
                images: [pink, kid],
            },
           
        ],
    },

    {
        id: 16,
        name: "Women's Traditional Kurti",
        category: "Kurtas & Sets",
        price: 1799,
        originalPrice: 2199,
        rating: 4.7,
        reviews: 42,
        image: kutri,
        sizes: [
            { name: "S", available: true },
            { name: "M", available: true },
            { name: "L", available: false },
            { name: "XL", available: true },
            { name: "XXL", available: true },
        ],
        bulkDiscounts,
        keywords: "kurti women cotton ethnic traditional",

        variants: [
            {
                id: "16-pink",
                name: "Pink",
                images: [kutri, saree2, saree1],
            },
            {
                id: "16-maroon",
                name: "Maroon",
                images: [saree1, kutri, saree],
            },
            {
                id: "16-green",
                name: "Green",
                images: [saree2, kutri, dhotii],
            },
        ],
    },
     {
        id: 17,
        name: "Traditional Kids Collection",
        category: "Kids Collection",
        price: 1499,
        originalPrice: 1799,
        rating: 4.8,
        reviews: 29,
        image: kid,
        sizes: [
            { name: "S", available: true },
            { name: "M", available: true },
            { name: "L", available: false },
            { name: "XL", available: true },
        ],
        bulkDiscounts,
        keywords: "kids children traditional dress handloom",

        variants: [
            {
                id: "15-White",
                name: "White",
                images: [kid, kid, baby],
            },
            {
                id: "15-pink",
                name: "Pink",
                images: [pink, pinky, pink],
            },
           
        ],
    },
];

export default products;