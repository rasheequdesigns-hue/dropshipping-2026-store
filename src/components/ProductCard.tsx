import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatINR } from "@/lib/currency";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card overflow-hidden">
      <div className="relative h-56 w-full bg-zinc-100">
        <Image src={product.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"} alt={product.name} fill className="object-cover" unoptimized />
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-indigo-600">{product.category || "General"}</p>
        <h3 className="font-bold text-zinc-900">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-900">{formatINR(product.price)}</span>
          {product.compareAtPrice ? <span className="text-sm text-zinc-500 line-through">{formatINR(product.compareAtPrice)}</span> : null}
        </div>
        <Link href={`/product/${product.slug}`} className="btn-primary inline-block text-sm">
          View Product
        </Link>
      </div>
    </article>
  );
}
