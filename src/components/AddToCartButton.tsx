"use client";

import { useCartStore } from "@/lib/cartStore";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
  };
};

export function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button onClick={() => addItem(product)} className="btn-primary" type="button">
      Add to Cart
    </button>
  );
}
