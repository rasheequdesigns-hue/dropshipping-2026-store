import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "DropForge | Modern Dropshipping Store",
  description: "High-converting dropshipping storefront built with Next.js"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-900 antialiased">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
