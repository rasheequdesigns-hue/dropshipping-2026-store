import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/40 bg-white/60 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 text-sm text-zinc-600 md:grid-cols-2">
        <p>(c) {new Date().getFullYear()} DropForge. All rights reserved.</p>
        <div className="flex gap-4 md:justify-end">
          <Link href="/policies/privacy">Privacy</Link>
          <Link href="/policies/terms">Terms</Link>
          <Link href="/policies/shipping">Shipping</Link>
          <Link href="/policies/returns">Returns</Link>
        </div>
      </div>
    </footer>
  );
}
