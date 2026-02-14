import Link from "next/link";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-indigo-700">DropForge</Link>
        <nav className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 hover:bg-indigo-50 hover:text-indigo-700">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
