import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await db.product.remove(slug);
  return NextResponse.json({ message: "Deleted" });
}
