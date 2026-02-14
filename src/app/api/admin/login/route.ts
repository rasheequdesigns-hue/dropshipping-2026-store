import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE } from "@/lib/auth/session";

const schema = z.object({ password: z.string().min(1) });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!process.env.ADMIN_PANEL_TOKEN) {
    return NextResponse.json({ error: "ADMIN_PANEL_TOKEN missing" }, { status: 500 });
  }

  if (parsed.data.password !== process.env.ADMIN_PANEL_TOKEN) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, process.env.ADMIN_PANEL_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return response;
}
