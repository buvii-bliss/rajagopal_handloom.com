import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ArrowLeft,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  ChevronRight,
  ReceiptText,
} from "lucide-react";

const MyOrder = ({ orders = [] }) => {
  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const getStatusStyle = (status) => {
    switch ((status || "").toLowerCase()) {
      case "delivered":
        return {
          color: "text-green-700",
          bg: "bg-green-50",
          icon: <CheckCircle2 size={15} />,
        };

      case "shipped":
        return {
          color: "text-blue-700",
          bg: "bg-blue-50",
          icon: <Truck size={15} />,
        };

      case "cancelled":
        return {
          color: "text-red-700",
          bg: "bg-red-50",
          icon: <XCircle size={15} />,
        };

      default:
        return {
          color: "text-amber-700",
          bg: "bg-amber-50",
          icon: <Clock3 size={15} />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f3] px-3 py-6 pb-24 sm:px-6 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a17b40] sm:text-xs">
              Rajagopal Handloom
            </p>

            <h1 className="text-2xl font-bold text-[#651d2b] sm:text-3xl">
              My Orders
            </h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Track and manage your handloom purchases.
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f1e5df] text-[#7b2638] sm:h-14 sm:w-14">
            <Package size={24} />
          </div>
        </div>

        <div className="mb-5 h-px bg-[#e9d8c8]" />

        {/* Orders Count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">
            Your Orders{" "}
            <span className="ml-1 rounded-full bg-[#7b2638] px-2.5 py-1 text-xs text-white">
              {orders.length}
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

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-[#eadfd4] bg-white px-4 py-14 text-center shadow-sm sm:py-20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8eeea] text-[#7b2638]">
              <ReceiptText size={34} strokeWidth={1.5} />
            </div>

            <h2 className="text-xl font-bold text-[#651d2b]">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Your orders will appear here once you complete a purchase.
              Explore our traditional handloom collections.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#7b2638] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5e1928]"
            >
              <ShoppingBag size={17} />
              Explore Collections
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order, index) => {
              const status = getStatusStyle(order.status);
              const items = order.items || order.products || [];

              const orderTotal =
                order.total ??
                order.totalAmount ??
                items.reduce(
                  (sum, item) =>
                    sum +
                    Number(item.price || 0) * Number(item.quantity || 1),
                  0
                );

              return (
                <div
                  key={order.id || order.orderNumber || index}
                  className="overflow-hidden rounded-xl border border-[#eadfd4] bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e5db] bg-[#fffdfa] px-4 py-4 sm:px-5">
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="mt-1 text-sm font-bold text-[#651d2b]">
                        #{order.orderNumber || order.id || `ORD-${index + 1}`}
                      </p>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${status.bg} ${status.color}`}
                    >
                      {status.icon}
                      {order.status || "Pending"}
                    </div>
                  </div>

                  {/* Product Items */}
                  <div className="space-y-4 p-4 sm:p-5">
                    {items.length > 0 ? (
                      items.map((product, productIndex) => (
                        <div
                          key={product.id || productIndex}
                          className="flex gap-3 sm:gap-4"
                        >
                          <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f5eee7] sm:h-28 sm:w-24">
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
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col justify-center">
                            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-[#421923] sm:text-base">
                              {product.name || "Handloom Collection"}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                              Quantity: {product.quantity || 1}
                            </p>

                            <p className="mt-2 text-sm font-bold text-[#7b2638]">
                              {formatPrice(
                                Number(product.price || 0) *
                                  Number(product.quantity || 1)
                              )}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        Order item details are unavailable.
                      </p>
                    )}
                  </div>

                  {/* Order Footer */}
                  <div className="border-t border-[#f0e5db] px-4 py-4 sm:px-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-500">
                          {order.date || order.createdAt
                            ? `Ordered on ${order.date || order.createdAt}`
                            : "Order Total"}
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#651d2b]">
                          {formatPrice(orderTotal)}
                        </p>
                      </div>

                      <div className="flex w-full gap-2 sm:w-auto">
                        <Link
                          to={`/order/${order.id}`}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#7b2638] px-3 py-2.5 text-xs font-semibold text-[#7b2638] transition hover:bg-[#f8eeea] sm:flex-none sm:px-4 sm:text-sm"
                        >
                          View Details
                          <ChevronRight size={15} />
                        </Link>

                        <Link
                          to="/"
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#7b2638] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5e1928] sm:flex-none sm:px-4 sm:text-sm"
                        >
                          <ShoppingBag size={15} />
                          Buy Again
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;