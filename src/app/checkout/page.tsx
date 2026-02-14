"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { formatINR } from "@/lib/currency";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Stripe checkout URL missing");
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="text-zinc-600">Total payable: {formatINR(total())}</p>
      <div className="rounded-xl border p-4">
        {items.length === 0 ? <p className="text-zinc-600">Cart is empty.</p> : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>{formatINR(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex gap-3">
        <button
          disabled={loading || items.length === 0}
          onClick={handleStripeCheckout}
          className="rounded-md bg-zinc-900 px-4 py-2 text-white disabled:opacity-50"
          type="button"
        >
          {loading ? "Redirecting..." : "Pay with Stripe"}
        </button>
        <button onClick={clearCart} className="rounded-md border px-4 py-2" type="button">Clear cart</button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </section>
  );
}
