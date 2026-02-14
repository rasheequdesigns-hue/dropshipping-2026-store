"use client";

import { useEffect, useMemo, useState } from "react";

type Order = { id: string; email: string | null; totalAmount: number; status: string; items: { name: string; quantity: number }[] };

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    const res = await fetch("/api/admin/orders", { cache: "no-store" });
    const data = await res.json();
    setOrders(data.orders || []);
  };

  useEffect(() => {
    fetch("/api/admin/orders", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setOrders(data.orders || []));
  }, []);

  const filtered = useMemo(() => (filter === "all" ? orders : orders.filter((o) => o.status === filter)), [orders, filter]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    await load();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black">Orders</h1>
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "shipped", "delivered", "returned", "paid"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-xl px-3 py-1.5 text-sm font-semibold ${filter === s ? "bg-indigo-600 text-white" : "bg-zinc-100"}`} type="button">{s}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((o) => (
          <div key={o.id} className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{o.id} � ?{o.totalAmount}</p>
              <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="input w-auto text-sm">
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="returned">Returned</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <p className="text-sm text-zinc-600">{o.email || "No email"}</p>
            <p className="mt-1 text-sm">Items: {o.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}</p>
          </div>
        ))}
        {filtered.length === 0 ? <p className="text-zinc-500">No orders in this status.</p> : null}
      </div>
    </div>
  );
}
