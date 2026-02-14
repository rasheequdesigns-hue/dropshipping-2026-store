import Link from "next/link";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/catalog", label: "Catalog" },
  { href: "/admin/storefront", label: "Storefront" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/analytics", label: "Analytics" }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-[70vh] gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-xl border border-zinc-200 bg-white p-4">
        <h2 className="mb-4 text-lg font-bold">Admin Panel</h2>
        <nav className="space-y-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-100">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="rounded-xl border border-zinc-200 bg-white p-6">{children}</section>
    </div>
  );
}
