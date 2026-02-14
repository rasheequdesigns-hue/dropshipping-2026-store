import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const products = await db.product.list();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const body = await request.json();
  const slug = String(body.slug || body.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (!slug) return NextResponse.json({ message: "Missing slug/name" }, { status: 400 });

  await db.product.upsert({
    where: { slug },
    update: {
      name: body.name,
      description: body.description,
      price: Number(body.price || 0),
      salePrice: Number(body.salePrice || 0),
      taxRate: Number(body.taxRate || 0),
      sku: body.sku,
      brand: body.brand,
      images: Array.isArray(body.images) ? body.images : [],
      thumbnail: body.thumbnail,
      category: body.category,
      tags: Array.isArray(body.tags) ? body.tags : [],
      stock: Number(body.stock || 0),
      lowStockThreshold: Number(body.lowStockThreshold || 5),
      status: body.status === "published" ? "published" : "draft",
      inStock: Number(body.stock || 0) > 0
    },
    create: {
      slug,
      name: String(body.name || "Untitled"),
      description: body.description,
      price: Number(body.price || 0),
      salePrice: Number(body.salePrice || 0),
      taxRate: Number(body.taxRate || 0),
      sku: body.sku,
      brand: body.brand,
      images: Array.isArray(body.images) ? body.images : [],
      thumbnail: body.thumbnail,
      image: body.thumbnail || (Array.isArray(body.images) && body.images[0]) || "",
      category: body.category,
      tags: Array.isArray(body.tags) ? body.tags : [],
      stock: Number(body.stock || 0),
      lowStockThreshold: Number(body.lowStockThreshold || 5),
      status: body.status === "published" ? "published" : "draft",
      inStock: Number(body.stock || 0) > 0
    }
  });

  return NextResponse.json({ message: "Product saved" });
}
