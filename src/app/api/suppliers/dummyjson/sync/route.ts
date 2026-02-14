import { NextResponse } from "next/server";
import { mapSupplierToProduct } from "@/lib/supplierMapping";
import { db } from "@/lib/db";

type DummyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stock: number;
};

export async function POST() {
  try {
    const supplierRes = await fetch("https://dummyjson.com/products?limit=20", { cache: "no-store" });
    const supplierJson = (await supplierRes.json()) as { products?: DummyProduct[] };
    const items = supplierJson.products ?? [];

    const mapped = items.map((item) =>
      mapSupplierToProduct({
        title: item.title,
        body: item.description,
        amount: Math.round(Number(item.price || 0) * 100),
        image_url: item.thumbnail,
        sku: String(item.id),
        category: item.category,
        available: Number(item.stock || 0) > 0
      })
    );

    for (const p of mapped) {
      await db.product.upsert({
        where: { slug: p.slug },
        update: {
          name: p.name,
          description: p.description,
          price: p.price,
          image: p.image,
          category: p.category,
          inStock: p.inStock
        },
        create: {
          slug: p.slug,
          name: p.name,
          description: p.description,
          price: p.price,
          image: p.image,
          category: p.category,
          inStock: p.inStock
        }
      });
    }

    return NextResponse.json({ ok: true, imported: mapped.length });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
