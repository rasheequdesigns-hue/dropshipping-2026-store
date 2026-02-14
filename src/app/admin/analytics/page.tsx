import { db } from "@/lib/db";
import { formatINR } from "@/lib/currency";

export default async function AnalyticsPage() {
  const m = await db.metrics.get();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Box label="Revenue" value={formatINR(m.totalSales)} />
        <Box label="Orders" value={String(m.totalOrders)} />
        <Box label="Active Products" value={String(m.activeProducts)} />
      </div>
      <div>
        <h2 className="mb-2 text-lg font-semibold">Top products</h2>
        <ul className="list-disc pl-6 text-sm text-zinc-700">
          {m.topProducts.map((p) => <li key={p.slug}>{p.name} - ?{p.price}</li>)}
          {m.topProducts.length === 0 ? <li>No data yet.</li> : null}
        </ul>
      </div>
    </div>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border bg-zinc-50 p-4"><p className="text-sm text-zinc-600">{label}</p><p className="text-2xl font-bold">{value}</p></div>;
}
