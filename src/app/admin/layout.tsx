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
    <div className="grid min-h-[72vh] gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="card p-4">
        <h2 className="mb-1 text-xl font-black text-indigo-700">DropForge Admin</h2>
        <p className="mb-4 text-xs text-zinc-500">Workspace & controls</p>

        <Link href="/admin/catalog" className="btn-primary mb-4 block text-center text-sm">+ Add Product</Link>

        <nav className="space-y-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-indigo-50 hover:text-indigo-700">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <section className="card p-5 md:p-6">{children}</section>
    </div>
  );
}
