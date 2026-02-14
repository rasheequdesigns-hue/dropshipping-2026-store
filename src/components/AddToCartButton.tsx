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
    <button
      onClick={() => addItem(product)}
      className="rounded-md bg-zinc-900 px-5 py-3 text-sm font-semibold text-white"
      type="button"
    >
      Add to Cart
    </button>
  );
}
