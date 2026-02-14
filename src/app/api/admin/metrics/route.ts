import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const metrics = await db.metrics.get();
  return NextResponse.json({ metrics });
}
