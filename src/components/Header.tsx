import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">DropForge</Link>
        <nav className="flex gap-4 text-sm font-medium text-zinc-700">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
}
