import { db } from "@/lib/db";
import { formatINR } from "@/lib/currency";

export default async function AdminDashboardPage() {
  const metrics = await db.metrics.get();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <Card title="Total Sales" value={formatINR(metrics.totalSales)} />
        <Card title="Active Products" value={String(metrics.activeProducts)} />
        <Card title="Low Stock Alerts" value={String(metrics.lowStockCount)} />
        <Card title="Orders" value={String(metrics.totalOrders)} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-sm text-zinc-600">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
