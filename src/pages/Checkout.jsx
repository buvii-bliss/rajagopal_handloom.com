import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import DummyPayment from "../assets/components/checkout/DummyPayment";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function Checkout() {
  
const location = useLocation();
const navigate = useNavigate();

const checkoutCart = location.state?.cart || [];
const buyNowProduct = location.state?.product;
const buyNowQuantity = Math.max(
  1,
  Number(location.state?.quantity || 1)
);

const [cartItems, setCartItems] = useState(() => {
  if (checkoutCart.length > 0) {
    return checkoutCart;
  }

  if (buyNowProduct) {
    return [{
      ...buyNowProduct,
      quantity: buyNowQuantity,
    }];
  }

  return [];
});

const removeCheckoutItem = (productId, selectedColor, selectedSize) => {
  setCartItems((items) =>
    items.filter(
      (item) =>
        !(
          String(item.id) === String(productId) &&
          String(item.selectedColor || "Default") ===
            String(selectedColor || "Default") &&
          String(item.selectedSize || "Free Size") ===
            String(selectedSize || "Free Size")
        )
    )
  );
};

const orderTotal = cartItems.reduce(
  (total, item) =>
    total +
    Number(item.price || 0) * Number(item.quantity || 1),
  0
);

  const [step, setStep] = useState(1);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [formError, setFormError] = useState("");

  const isBuyNow = Boolean(buyNowProduct);

 

  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) *
            Number(item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const shipping =
    subtotal === 0 || subtotal >= 2000 ? 0 : 80;

  const total = subtotal + shipping;

  const updateCustomer = (e) => {
    setCustomer((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const updateQuantity = (id, change) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Number(item.quantity || 1) + change
              ),
            }
          : item
      )
    );
  };

  const validateAddress = (e) => {
    e.preventDefault();
    setFormError("");

    if (cartItems.length === 0) {
      setFormError(
        "No product selected. Please select a product using Buy Now."
      );
      return;
    }

    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
    } = customer;

    if (
      !fullName.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !/^[6-9]\d{9}$/.test(phone.trim()) ||
      !/^\d{6}$/.test(pincode.trim())
    ) {
      setFormError(
        "Enter your name, a valid 10-digit Indian mobile number, full address, city, state, and 6-digit PIN code."
      );
      return;
    }

    setStep(2);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePaymentSuccess = (payment) => {
    const order = {
      orderId: `RH${Date.now().toString().slice(-8)}`,
      customer,
      items: cartItems,
      subtotal,
      shipping,
      total,
      payment,
      createdAt: new Date().toISOString(),
    };

    // Demo only: store the order locally in this browser.
    try {
      const previousOrders = JSON.parse(
        localStorage.getItem("demoOrders") || "[]"
      );

      localStorage.setItem(
        "demoOrders",
        JSON.stringify([order, ...previousOrders])
      );

      // Remove purchased products from the cart only when
      // they were selected through Buy Now.
      if (isBuyNow) {
        const savedCart = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

        if (Array.isArray(savedCart)) {
          const remainingCart = savedCart.filter((item) => {
            const product = item.product || item;
            return String(product.id) !== String(buyNowProduct.id);
          });

          localStorage.setItem(
            "cart",
            JSON.stringify(remainingCart)
          );
        }
      }
    } catch {
      // Confirmation can still display if storage is unavailable.
    }

    setCompletedOrder(order);
    setStep(3);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Order confirmation
  if (step === 3 && completedOrder) {
    return (
      <main className="min-h-screen bg-[#fbf7f0] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-[#eadfce] bg-white p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
            <CheckCircle2 size={44} />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a88746]">
            Rajagopal Handloom
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-[#481421]">
            Demo Order Placed!
          </h1>

          <p className="mt-3 leading-7 text-gray-600">
            Your test checkout is complete. No real payment was
            processed and no actual order was sent to a server.
          </p>

          <div className="my-7 rounded-2xl bg-[#fbf7f0] p-5 text-left">
            <div className="flex justify-between gap-4 py-2 text-sm">
              <span className="text-gray-500">Demo Order ID</span>
              <span className="font-bold text-[#481421]">
                {completedOrder.orderId}
              </span>
            </div>

            <div className="flex justify-between gap-4 py-2 text-sm">
              <span className="text-gray-500">Payment method</span>
              <span className="font-semibold uppercase text-gray-800">
                {completedOrder.payment?.method || "Demo"}
              </span>
            </div>

            <div className="flex justify-between gap-4 border-t border-[#eadfce] pt-4">
              <span className="font-semibold text-gray-700">
                Order total
              </span>
              <span className="text-xl font-extrabold text-[#751d32]">
                {money(completedOrder.total)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="flex-1 rounded-xl bg-[#751d32] px-5 py-3 font-semibold text-white transition hover:bg-[#571324]"
            >
              Continue Shopping
            </Link>

            <button
              onClick={() => navigate("/")}
              className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf7f0] px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#751d32] hover:text-[#a88746]"
        >
          <ArrowLeft size={17} />
          Continue Shopping
        </Link>

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a88746]">
              Rajagopal Handloom
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#481421] sm:text-4xl">
              Checkout
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Complete your delivery details and place your demo order.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 1
                  ? "bg-[#751d32] text-white"
                  : "bg-gray-200"
              }`}
            >
              1
            </span>

            <span>Address</span>

            <span className="mx-1 h-px w-6 bg-[#d7c8b5] sm:w-10" />

            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 2
                  ? "bg-[#751d32] text-white"
                  : "bg-gray-200"
              }`}
            >
              2
            </span>

            <span>Payment</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl border border-[#eadfce] bg-white px-5 py-14 text-center">
            <ShoppingBag
              className="mx-auto text-[#a88746]"
              size={44}
            />

            <h2 className="mt-4 text-xl font-bold text-[#481421]">
              No product selected
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your order summary is empty. Choose a product and click
              Buy Now to continue to checkout.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl bg-[#751d32] px-6 py-3 font-semibold text-white hover:bg-[#571324]"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
            <div className="min-w-0 space-y-6">
              {step === 1 ? (
                <form
                  onSubmit={validateAddress}
                  className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eee9] text-[#751d32]">
                      <MapPin size={22} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-[#481421]">
                        Delivery Address
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Where should we deliver your handloom products?
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      {
                        name: "fullName",
                        label: "Full Name",
                        placeholder: "Enter your full name",
                        type: "text",
                        span: true,
                      },
                      {
                        name: "phone",
                        label: "Mobile Number",
                        placeholder: "10-digit mobile number",
                        type: "tel",
                      },
                      {
                        name: "email",
                        label: "Email Address (Optional)",
                        placeholder: "you@example.com",
                        type: "email",
                      },
                      {
                        name: "address",
                        label: "House / Street Address",
                        placeholder: "House number, street, area",
                        type: "text",
                        span: true,
                      },
                      {
                        name: "city",
                        label: "City",
                        placeholder: "Enter city",
                        type: "text",
                      },
                      {
                        name: "state",
                        label: "State",
                        placeholder: "Enter state",
                        type: "text",
                      },
                      {
                        name: "pincode",
                        label: "PIN Code",
                        placeholder: "6-digit PIN code",
                        type: "text",
                      },
                    ].map((field) => (
                      <div
                        key={field.name}
                        className={field.span ? "sm:col-span-2" : ""}
                      >
                        <label
                          htmlFor={field.name}
                          className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                          {field.label}
                        </label>

                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          value={customer[field.name]}
                          onChange={updateCustomer}
                          required={field.name !== "email"}
                          maxLength={
                            field.name === "phone"
                              ? 10
                              : field.name === "pincode"
                                ? 6
                                : undefined
                          }
                          autoComplete="on"
                          placeholder={field.placeholder}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#751d32] focus:ring-2 focus:ring-[#751d32]/10"
                        />
                      </div>
                    ))}
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                    >
                      {formError}
                    </p>
                  )}

                  <div className="mt-6 flex items-center gap-2 rounded-xl bg-[#fbf7f0] p-4 text-sm text-gray-600">
                    <Truck
                      size={20}
                      className="shrink-0 text-[#a88746]"
                    />
                    <p>
                      Shipping is free on orders of ₹2,000 or more.
                      Otherwise, a demo shipping fee of ₹80 applies.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full rounded-xl bg-[#751d32] px-5 py-3.5 font-bold text-white transition hover:bg-[#571324]"
                  >
                    Continue to Payment
                  </button>
                </form>
              ) : (
                <DummyPayment
                  amount={total}
                  onSuccess={handlePaymentSuccess}
                  onBack={() => {
                    setStep(1);
                    setFormError("");
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                />
              )}

              <div className="flex items-start gap-3 rounded-xl border border-[#eadfce] bg-white p-4 text-sm text-gray-500">
                <PackageCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-[#a88746]"
                />

                <p>
                  This is a frontend demo. Orders are stored in this
                  browser only. A production checkout requires a backend,
                  order validation, and a real payment provider.
                </p>
              </div>
            </div>

            {/* Order Summary: only the selected Buy Now product */}
            <aside className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-bold text-[#481421]">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "item" : "items"}
              </p>

              <div className="mt-5 max-h-[360px] space-y-4 overflow-y-auto pr-1">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id ?? "product"}-${index}`}
                    className="flex gap-3"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-[#fbf7f0]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name || "Handloom product"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#a88746]">
                          <ShoppingBag size={24} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
                        {item.name || "Handloom Product"}
                      </h3>

                      <p className="mt-1 text-sm font-bold text-[#751d32]">
                        {money(item.price)}
                      </p>

                      {item.size && (
                        <p className="mt-1 text-xs text-gray-500">
                          Size: {item.size}
                        </p>
                      )}

                      <div className="mt-2 inline-flex items-center overflow-hidden rounded-lg border border-gray-200">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label={`Decrease quantity of ${item.name || "product"}`}
                          disabled={Number(item.quantity) <= 1}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label={`Increase quantity of ${item.name || "product"}`}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="shrink-0 text-sm font-bold text-gray-800">
                      {money(
                        Number(item.price || 0) *
                          Number(item.quantity || 1)
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3 border-t border-dashed border-[#eadfce] pt-5 text-sm">
                <div className="flex justify-between gap-3 text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    {money(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-gray-500">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? "font-semibold text-green-700"
                        : "font-semibold text-gray-800"
                    }
                  >
                    {shipping === 0 ? "FREE" : money(shipping)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-t border-[#eadfce] pt-4">
                  <span className="font-bold text-[#481421]">
                    Total Amount
                  </span>

                  <span className="text-xl font-extrabold text-[#751d32]">
                    {money(total)}
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-[#fbf7f0] p-3 text-xs leading-5 text-gray-500">
                Demo pricing only. Any discounts, taxes, or actual
                delivery charges should be calculated and verified by
                your backend.
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
