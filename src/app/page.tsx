import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const featured = products.slice(0, 3);
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-zinc-900 px-6 py-14 text-white">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-300">Launch-ready storefront</p>
        <h1 className="text-4xl font-bold md:text-5xl">Sell winning products with DropForge</h1>
        <p className="mt-4 max-w-2xl text-zinc-200">Custom Next.js ecommerce starter for dropshipping in 2026. Fast, scalable, and conversion-focused.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/shop" className="rounded-md bg-white px-5 py-3 font-medium text-zinc-900">Start Shopping</Link>
          <Link href="/about" className="rounded-md border border-zinc-400 px-5 py-3 font-medium">Learn More</Link>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured products</h2>
          <Link href="/shop" className="text-sm font-semibold">View all ?</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
