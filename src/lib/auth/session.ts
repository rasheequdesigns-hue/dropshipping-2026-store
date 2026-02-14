import { cookies } from "next/headers";

export const ADMIN_COOKIE = "dropforge_admin";

export async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return Boolean(token && process.env.ADMIN_PANEL_TOKEN && token === process.env.ADMIN_PANEL_TOKEN);
}
