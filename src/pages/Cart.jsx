import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";

const Cart = ({ cart = [], setCart }) => {
  const navigate = useNavigate();

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, (item.quantity || 1) - 1),
            }
          : item
      )
    );
  };

  // Remove product
  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Calculate total
  const totalAmount = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.quantity || 1),
        0
      ),
    [cart]
  );

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

 
const handleBuyNow = () => {
  if (cart.length === 0) return;

  navigate("/checkout", {
    state: {
      cart: cart.map((item) => ({
        ...item,
        quantity: Number(item.quantity || 1),
      })),
      buyNow: false,
    },
  });
};


  return (
<div className="min-h-screen bg-[#fcf8f3] px-3 py-6 pb-48 sm:px-6 sm:py-8 sm:pb-48 lg:px-10 lg:pb-8">
        <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a17b40] sm:text-xs">
              Rajagopal Handloom
            </p>

            <h1 className="text-2xl font-bold text-[#651d2b] sm:text-3xl">
              Shopping Cart
            </h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Review your handloom favourites before checkout.
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f1e5df] text-[#7b2638] sm:h-14 sm:w-14">
            <ShoppingCart size={24} />
          </div>
        </div>

        <div className="mb-5 h-px bg-[#e9d8c8]" />

        {/* Cart Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">
            Your Items{" "}
            <span className="ml-1 rounded-full bg-[#7b2638] px-2.5 py-1 text-xs text-white">
              {cart.reduce(
                (count, item) => count + Number(item.quantity || 1),
                0
              )}
            </span>
          </p>

          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#7b2638] hover:text-[#a17b40] sm:text-sm"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="rounded-2xl border border-[#eadfd4] bg-white px-4 py-14 text-center shadow-sm sm:py-20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8eeea] text-[#7b2638]">
              <ShoppingBag size={34} strokeWidth={1.5} />
            </div>

            <h2 className="text-xl font-bold text-[#651d2b]">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Explore our traditional handloom collections and find something
              special for you.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#7b2638] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5e1928]"
            >
              <ShoppingBag size={17} />
              Shop Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">
            {/* Cart Items */}
            <div className="space-y-3">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 rounded-xl border border-[#eadfd4] bg-white p-3 shadow-sm sm:gap-5 sm:p-4"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${product.id}`}
                    className="h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f5eee7] sm:h-36 sm:w-32"
                  >
                    <img
                      src={
                        product.image ||
                        product.image_url ||
                        product.thumbnail ||
                        "/placeholder.png"
                      }
                      alt={product.name || "Handloom product"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${product.id}`}
                          className="line-clamp-2 text-sm font-semibold leading-5 text-[#421923] hover:text-[#a17b40] sm:text-base"
                        >
                          {product.name || "Handloom Collection"}
                        </Link>

                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`Remove ${product.name || "product"}`}
                          className="shrink-0 rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        Traditional Handloom
                      </p>

                      <p className="mt-2 text-base font-bold text-[#7b2638] sm:text-lg">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-lg border border-[#e8d8c9]">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(product.id)}
                          disabled={(product.quantity || 1) <= 1}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center text-[#7b2638] transition hover:bg-[#f8eeea] disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="min-w-8 text-center text-sm font-semibold text-gray-800">
                          {product.quantity || 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(product.id)}
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center text-[#7b2638] transition hover:bg-[#f8eeea] sm:h-9 sm:w-9"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <p className="text-right text-sm font-bold text-[#651d2b]">
                        {formatPrice(
                          Number(product.price || 0) *
                            Number(product.quantity || 1)
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Order Summary */}
            <div className="hidden rounded-xl border border-[#eadfd4] bg-white p-5 shadow-sm lg:block">
              <h2 className="text-lg font-bold text-[#651d2b]">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 border-b border-dashed border-[#e8d8c9] pb-5 text-sm">
                <div className="flex justify-between gap-3 text-gray-600">
                  <span>Items ({cart.length})</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>

                <div className="flex justify-between gap-3 text-gray-600">
                  <span>Delivery</span>
                  <span className="font-medium text-gray-500">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="font-semibold text-gray-800">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-[#7b2638]">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleBuyNow}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#7b2638] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#5e1928]"
              >
                Buy Now
                <ShoppingBag size={18} />
              </button>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={16} className="text-[#a17b40]" />
                A beautiful tradition, delivered to you
              </p>
            </div>
          </div>
        )}
      </div>

    {/* Sticky Checkout Bar — Above Mobile Bottom Navigation */}
{cart.length > 0 && (
  <div
    className="
      fixed inset-x-0 bottom-[64px] z-40
      border-t border-[#eadfd4]
      bg-white px-4 py-3
      shadow-[0_-5px_20px_rgba(70,30,20,0.08)]
      sm:bottom-[70px] sm:px-6 sm:py-4
      lg:hidden
    "
  >
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500">
          Total Amount
        </p>

        <p className="text-xl font-bold text-[#7b2638] sm:text-2xl">
          {formatPrice(totalAmount)}
        </p>

        <p className="text-[10px] text-gray-400">
          Delivery calculated at checkout
        </p>
      </div>

      <button
        type="button"
        onClick={handleBuyNow}
        className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#7b2638] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#5e1928] sm:px-8"
      >
        Buy Now
        <ShoppingBag size={17} />
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Cart;