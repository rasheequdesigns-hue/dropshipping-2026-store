import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatINR } from "@/lib/currency";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative h-56 w-full">
        <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-zinc-500">{product.category}</p>
        <h3 className="font-semibold text-zinc-900">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-900">{formatINR(product.price)}</span>
          {product.compareAtPrice ? (
            <span className="text-sm text-zinc-500 line-through">{formatINR(product.compareAtPrice)}</span>
          ) : null}
        </div>
        <Link href={`/product/${product.slug}`} className="inline-block rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white">
          View Product
        </Link>
      </div>
    </article>
  );
}
