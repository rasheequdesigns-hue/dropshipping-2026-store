import type { Product } from "@/lib/products";

export type SupplierItem = {
  title: string;
  body?: string;
  amount: number;
  image_url?: string;
  sku?: string;
  category?: string;
  available?: boolean;
};

export function mapSupplierToProduct(item: SupplierItem): Product {
  const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    id: item.sku || slug,
    slug,
    name: item.title,
    description: item.body || "",
    price: item.amount,
    image: item.image_url || "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    category: item.category || "General",
    inStock: item.available ?? true
  };
}
