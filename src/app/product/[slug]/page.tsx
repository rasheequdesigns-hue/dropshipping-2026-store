import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import { formatINR } from "@/lib/currency";
import { AddToCartButton } from "@/components/AddToCartButton";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative h-[420px] overflow-hidden rounded-xl border border-zinc-200">
        <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
      </div>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-zinc-500">{product.category}</p>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-zinc-600">{product.description}</p>
        <p className="text-2xl font-bold">{formatINR(product.price)}</p>
        <div className="flex gap-3">
          <AddToCartButton product={{ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image }} />
          <Link href="/checkout" className="rounded-md border border-zinc-300 px-5 py-3 text-sm font-semibold">Buy Now</Link>
        </div>
      </div>
    </div>
  );
}
