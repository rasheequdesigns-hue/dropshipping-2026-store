import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="card overflow-hidden bg-gradient-to-r from-indigo-700 to-violet-700 px-6 py-12 text-white">
        <p className="mb-2 text-xs uppercase tracking-[0.22em] text-indigo-100">DropForge 2026</p>
        <h1 className="text-4xl font-black md:text-5xl">A premium storefront for your dropshipping brand</h1>
        <p className="mt-4 max-w-2xl text-indigo-100">Better conversion-focused UI, clean checkout flow, and full Admin v3 operations panel.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/shop" className="rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700">Explore Products</Link>
          <Link href="/admin" className="rounded-xl border border-indigo-200 px-5 py-3 font-semibold text-white">Open Admin</Link>
        </div>
      </section>

      <section className="card p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black">Featured products</h2>
          <Link href="/shop" className="font-semibold text-indigo-700">View all ?</Link>
        </div>

        {featured.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-zinc-600">
            No products yet. Add your first product from <Link href="/admin/catalog" className="font-semibold text-indigo-700">Admin ? Catalog</Link>.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
