import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE } from "@/lib/auth/session";
import { getAdminToken } from "@/lib/auth/token";

const schema = z.object({ password: z.string().min(1) });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const adminToken = getAdminToken();

  if (parsed.data.password !== adminToken) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return response;
}
