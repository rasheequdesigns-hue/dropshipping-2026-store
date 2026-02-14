import { cookies } from "next/headers";
import { getAdminToken } from "@/lib/auth/token";

export const ADMIN_COOKIE = "dropforge_admin";

export async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const adminToken = getAdminToken();
  return Boolean(token && token === adminToken);
}
