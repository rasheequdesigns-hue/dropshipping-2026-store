import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ ok: true, message: "Order received", order: body }, { status: 201 });
}
