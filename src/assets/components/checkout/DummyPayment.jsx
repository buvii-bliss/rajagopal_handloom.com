
import { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Banknote,
  ShieldCheck,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

const paymentMethods = [
  { id: "upi", label: "UPI", description: "Pay using UPI", icon: Smartphone },
  { id: "card", label: "Card", description: "Debit or credit card", icon: CreditCard },
  { id: "cod", label: "Cash on Delivery", description: "Pay when delivered", icon: Banknote },
];

export default function DummyPayment({ amount, onSuccess, onBack }) {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    setError("");

    if (method === "upi" && !upiId.trim()) {
      setError("Please enter a dummy UPI ID.");
      return;
    }

    if (
      method === "card" &&
      (!cardName.trim() ||
        cardNumber.replace(/\s/g, "").length < 12 ||
        !expiry.trim() ||
        cvv.length < 3)
    ) {
      setError("Please enter valid dummy card details.");
      return;
    }

    setLoading(true);

    // Simulated payment only. No real payment gateway is connected.
    window.setTimeout(() => {
      setLoading(false);
      onSuccess({
        method,
        transactionId: `DEMO${Date.now()}`,
        status: "success",
      });
    }, 1200);
  };

  return (
    <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8eee9] text-[#751d32]">
          <ShieldCheck size={23} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#481421]">
            Payment Details
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a demo payment method to test checkout.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {paymentMethods.map((item) => {
          const Icon = item.icon;
          const selected = method === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setMethod(item.id);
                setError("");
              }}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left transition sm:flex-col sm:items-start ${
                selected
                  ? "border-[#751d32] bg-[#fff8f0] ring-1 ring-[#751d32]"
                  : "border-gray-200 hover:border-[#c9a45c]"
              }`}
            >
              <Icon
                size={22}
                className={selected ? "text-[#751d32]" : "text-gray-500"}
              />
              <span>
                <span className="block text-sm font-semibold text-gray-800">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  {item.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        {method === "upi" && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Demo UPI ID
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#751d32] focus:ring-2 focus:ring-[#751d32]/10"
            />
            <p className="mt-2 text-xs text-gray-500">
              Enter any non-empty demo UPI ID. No UPI request is sent.
            </p>
          </div>
        )}

        {method === "card" && (
          <>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Cardholder Name
              </label>
              <input
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Demo Customer"
                autoComplete="off"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#751d32]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Card Number
              </label>
              <input
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 16)
                  )
                }
                inputMode="numeric"
                autoComplete="off"
                placeholder="Enter 12–16 dummy digits"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#751d32]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Expiry
                </label>
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  autoComplete="off"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#751d32]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Dummy CVV
                </label>
                <input
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="123"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#751d32]"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Use fictional details only. Do not enter real card information.
            </p>
          </>
        )}

        {method === "cod" && (
          <div className="rounded-xl bg-[#f9f5ed] p-4 text-sm leading-6 text-gray-600">
            You selected Cash on Delivery. This demo will create a test order
            without collecting a payment.
          </div>
        )}

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-5">
          <div>
            <p className="text-xs text-gray-500">Amount to pay</p>
            <p className="text-2xl font-extrabold text-[#481421]">
              ₹{Number(amount || 0).toLocaleString("en-IN")}
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <ShieldCheck size={15} />
            Demo checkout
          </span>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#751d32] px-5 py-3 font-semibold text-white transition hover:bg-[#571324] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Processing demo...
              </>
            ) : (
              <>
                {method === "cod" ? "Place Demo Order" : "Pay with Demo"}
                <CheckCircle2 size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}