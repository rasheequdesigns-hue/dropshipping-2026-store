import { NextResponse } from "next/server";
import { mapSupplierToProduct } from "@/lib/supplierMapping";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = body.products ?? [];

    if (!Array.isArray(items)) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const mapped = items.map((item) =>
      mapSupplierToProduct({
        title: String(item.title ?? item.name ?? "Untitled"),
        body: item.body ? String(item.body) : undefined,
        amount: Number(item.amount ?? item.price ?? 0),
        image_url: item.image_url ? String(item.image_url) : undefined,
        sku: item.sku ? String(item.sku) : undefined,
        category: item.category ? String(item.category) : undefined,
        available: item.available === undefined ? true : Boolean(item.available)
      })
    );

    return NextResponse.json({ message: `Mapped ${mapped.length} products`, products: mapped });
  } catch (error) {
    return NextResponse.json({ message: `Import error: ${String(error)}` }, { status: 500 });
  }
}
