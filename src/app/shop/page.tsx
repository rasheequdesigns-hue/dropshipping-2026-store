import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

export default function ShopPage() {
  return (
    <section className="space-y-5">
      <div className="card flex items-center justify-between p-5">
        <h1 className="text-3xl font-black">Shop</h1>
        <Link href="/admin/catalog" className="btn-secondary text-sm">Manage Catalog</Link>
      </div>
      {products.length === 0 ? (
        <p className="card p-6 text-zinc-600">No products added yet. Add products from your admin panel.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  );
}
