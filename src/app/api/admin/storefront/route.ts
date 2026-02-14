import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const settings = await db.storefront.get();
  return NextResponse.json({ settings });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const settings = await db.storefront.update(body);
  return NextResponse.json({ message: "Storefront saved", settings });
}
