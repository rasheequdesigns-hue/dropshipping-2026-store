import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function ShopPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Shop</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
