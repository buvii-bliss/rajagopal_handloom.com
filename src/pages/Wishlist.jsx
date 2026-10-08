import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";

const Wishlist = ({
  wishlist = [],
  toggleWishlist,
  addToCart,
}) => {
  const navigate = useNavigate();

  const handleRemove = (product) => {
    if (toggleWishlist) {
      toggleWishlist(product);
    }
  };

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product);
      navigate("/cart");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f3] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7 flex items-center justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#a17b40]">
              Rajagopal Handloom
            </p>

            <h1 className="text-2xl font-bold text-[#651d2b] sm:text-3xl">
              My Wishlist
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Your favourite handloom collections, all in one place.
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f1e5df] text-[#7b2638]">
            <Heart size={23} />
          </div>
        </div>

        <div className="mb-6 h-px bg-[#e9d8c8]" />

        {/* Wishlist count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">
            Saved Items{" "}
            <span className="ml-1 rounded-full bg-[#7b2638] px-2.5 py-1 text-xs font-semibold text-white">
              {wishlist.length}
            </span>
          </p>

          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#7b2638] transition hover:text-[#a17b40]"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="rounded-2xl border border-[#eadfd4] bg-white px-5 py-14 text-center shadow-sm sm:py-20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8eeea]">
              <Heart size={34} strokeWidth={1.5} className="text-[#7b2638]" />
            </div>

            <h2 className="text-xl font-semibold text-[#651d2b]">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Discover beautiful handloom sarees and traditional collections.
              Save your favourites here for later.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#7b2638] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5e1928]"
            >
              <ShoppingBag size={17} />
              Explore Collections
            </Link>
          </div>
        ) : (
          /* Wishlist Products */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-xl border border-[#eadfd4] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f5eee7]">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={
                        product.image ||
                        product.image_url ||
                        product.thumbnail ||
                        "/placeholder.png"
                      }
                      alt={product.name || "Handloom product"}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleRemove(product)}
                    aria-label={`Remove ${product.name || "product"} from wishlist`}
                    title="Remove from wishlist"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#7b2638] shadow-sm transition hover:bg-[#7b2638] hover:text-white"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="line-clamp-2 min-h-[44px] text-sm font-semibold leading-5 text-[#421923] transition hover:text-[#a17b40]">
                      {product.name || "Handloom Collection"}
                    </h3>
                  </Link>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-lg font-bold text-[#7b2638]">
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </span>

                    {product.originalPrice &&
                      Number(product.originalPrice) >
                        Number(product.price) && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹
                          {Number(product.originalPrice).toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#7b2638] bg-[#7b2638] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5e1928]"
                  >
                    <ShoppingBag size={17} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;