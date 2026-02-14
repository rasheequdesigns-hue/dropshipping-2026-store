"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";
import { formatINR } from "@/lib/currency";

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCartStore();

  if (items.length === 0) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-black">Cart</h1>
        <p className="card p-6 text-zinc-600">Your cart is empty.</p>
        <Link href="/shop" className="btn-primary inline-block">Go to shop</Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-black">Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="card flex gap-4 p-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-xl">
              <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-zinc-600">{formatINR(item.price)}</p>
              <div className="mt-2 flex items-center gap-2">
                <input type="number" min={1} value={item.quantity} onChange={(e) => updateQty(item.id, Number(e.target.value))} className="input w-20" />
                <button onClick={() => removeItem(item.id)} className="text-sm font-semibold text-rose-600" type="button">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card flex items-center justify-between p-4">
        <p className="font-bold">Total: {formatINR(total())}</p>
        <Link href="/checkout" className="btn-primary">Proceed to Checkout</Link>
      </div>
    </section>
  );
}
