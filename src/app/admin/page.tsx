import Link from "next/link";
import { db } from "@/lib/db";
import { formatINR } from "@/lib/currency";

export default async function AdminDashboardPage() {
  const metrics = await db.metrics.get();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-black">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/admin/catalog" className="btn-primary text-sm">Add Product</Link>
          <Link href="/admin/orders" className="btn-secondary text-sm">Manage Orders</Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card title="Total Sales" value={formatINR(metrics.totalSales)} tone="indigo" />
        <Card title="Active Products" value={String(metrics.activeProducts)} tone="violet" />
        <Card title="Low Stock" value={String(metrics.lowStockCount)} tone="amber" />
        <Card title="Orders" value={String(metrics.totalOrders)} tone="emerald" />
      </div>

      <div className="card p-4">
        <h2 className="mb-2 text-lg font-bold">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/catalog" className="btn-secondary text-sm">Catalog</Link>
          <Link href="/admin/storefront" className="btn-secondary text-sm">Storefront settings</Link>
          <Link href="/admin/analytics" className="btn-secondary text-sm">Analytics</Link>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, tone }: { title: string; value: string; tone: "indigo" | "violet" | "amber" | "emerald" }) {
  const tones: Record<string, string> = {
    indigo: "from-indigo-500 to-indigo-600",
    violet: "from-violet-500 to-violet-600",
    amber: "from-amber-500 to-amber-600",
    emerald: "from-emerald-500 to-emerald-600"
  };

  return (
    <div className={`rounded-2xl bg-gradient-to-r ${tones[tone]} p-[1px]`}>
      <div className="rounded-2xl bg-white p-4">
        <p className="text-sm text-zinc-600">{title}</p>
        <p className="mt-1 text-2xl font-black">{value}</p>
      </div>
    </div>
  );
}
