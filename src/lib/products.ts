export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  badge?: string;
  inStock: boolean;
};

// Intentionally empty: all demo/test products removed.
export const products: Product[] = [];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
