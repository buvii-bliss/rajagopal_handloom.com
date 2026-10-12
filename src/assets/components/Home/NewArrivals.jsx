import React from "react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "../../data/product";
import { Heart, ShoppingCart } from "lucide-react";

export default function NewArrivals({
  wishlist = [],
  toggleWishlist,
  addToCart,
}) {
  const navigate = useNavigate();

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.products || [];

  // Show the latest products first.
  // Uses created_at when available, otherwise keeps the existing data order.
  const newArrivals = [...products]
    .sort((a, b) => {
      const dateA = new Date(a.created_at || a.createdAt || 0).getTime();
      const dateB = new Date(b.created_at || b.createdAt || 0).getTime();

      if (dateA && dateB && dateA !== dateB) {
        return dateB - dateA;
      }

      return 0;
    })
    .slice(0, 10);

  const getId = (product) => product.id ?? product._id;

  const getPrice = (product) =>
    Number(product.price ?? product.sale_price ?? 0);

  const getOriginalPrice = (product) =>
    Number(
      product.original_price ??
        product.old_price ??
        product.mrp ??
        product.price ??
        0
    );

  const getImage = (product) =>
    product.image ||
    product.image_url ||
    product.images?.[0] ||
    "/placeholder.png";

  const isWishlisted = (product) =>
    wishlist.some(
      (item) =>
        (typeof item === "object" ? item.id ?? item._id : item) ===
        getId(product)
    );

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product);
    } else {
      navigate(`/product/${getId(product)}`);
    }
  };

  const handleBuyNow = (product) => {
    navigate(`/product/${getId(product)}`, {
      state: { product, buyNow: true },
    });
  };

  if (!newArrivals.length) return null;

  return (
    <section className="bg-[#fffaf3] px-3 py-5 sm:px-5 sm:py-7">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#52080f] sm:text-2xl">
              New Arrivals
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Discover our latest traditional collections
            </p>
          </div>

          <Link
            to="/menu"
            className="text-xs font-semibold text-[#650b13] hover:underline sm:text-sm"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {newArrivals.map((product) => {
            const price = getPrice(product);
            const originalPrice = getOriginalPrice(product);

            const discount =
              originalPrice > price && originalPrice > 0
                ? Math.round(
                    ((originalPrice - price) / originalPrice) * 100
                  )
                : 0;

            return (
              <article
                key={getId(product)}
                className="min-w-0 overflow-hidden rounded-xl border border-[#eadcc9] bg-white p-2 shadow-sm transition hover:shadow-md sm:p-2.5"
              >
                <div
                  onClick={() => navigate(`/product/${getId(product)}`)}
                  className="relative cursor-pointer overflow-hidden rounded-lg bg-[#f5eee5]"
                >
                  <img
                    src={getImage(product)}
                    alt={product.name || product.title || "New arrival"}
                    loading="lazy"
                    className="aspect-[4/4.1] w-full object-cover transition duration-300 hover:scale-105"
                  />

                  {discount > 0 && (
                    <span className="absolute left-1.5 top-1.5 rounded bg-[#650b13] px-1.5 py-1 text-[10px] font-bold text-white sm:left-2 sm:top-2 sm:text-xs">
                      {discount}% OFF
                    </span>
                  )}

                  <span className="absolute bottom-1.5 left-1.5 rounded bg-[#e8bf58] px-1.5 py-1 text-[9px] font-bold uppercase text-[#45151a] sm:bottom-2 sm:left-2 sm:text-[10px]">
                    New
                  </span>

                  <button
                    type="button"
                    aria-label="Toggle wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist?.(product);
                    }}
                    className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#650b13] shadow-sm transition hover:scale-105 sm:right-2 sm:top-2 sm:h-9 sm:w-9"
                  >
                    <Heart
                      size={19}
                      strokeWidth={1.8}
                      fill={isWishlisted(product) ? "#650b13" : "none"}
                    />
                  </button>
                </div>

                <div className="px-1 pb-0.5 pt-2">
                  <h3
                    onClick={() => navigate(`/product/${getId(product)}`)}
                    className="min-h-9 cursor-pointer text-xs leading-5 text-[#45151a] hover:text-[#8c1723] sm:text-sm"
                  >
                    {product.name || product.title || "New Arrival"}
                  </h3>

                  <div className="mt-1.5 flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                    <span className="text-base font-bold text-[#251313] sm:text-lg">
                      ₹{price.toLocaleString("en-IN")}
                    </span>

                    {originalPrice > price && (
                      <span className="text-[10px] text-gray-400 line-through sm:text-xs">
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-1.5 min-[400px]:grid-cols-2 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="flex min-h-9 items-center justify-center gap-1 rounded-lg bg-[#650b13] px-1.5 py-2 text-[11px] font-semibold text-white transition hover:bg-[#4d080e] sm:text-xs"
                    >
                      <ShoppingCart size={15} />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBuyNow(product)}
                      className="min-h-9 rounded-lg bg-[#e8bf58] px-1.5 py-2 text-[11px] font-bold text-[#45151a] transition hover:bg-[#d9ae40] sm:text-xs"
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}