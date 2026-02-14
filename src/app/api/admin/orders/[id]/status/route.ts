import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const status = String(body.status || "pending") as "pending" | "shipped" | "delivered" | "returned" | "paid";
  await db.order.updateStatus(id, status);
  return NextResponse.json({ message: "Order updated" });
}
