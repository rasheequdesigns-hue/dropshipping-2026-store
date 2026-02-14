"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  slug: string;
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  taxRate?: number;
  sku?: string;
  brand?: string;
  images?: string[];
  thumbnail?: string;
  category?: string;
  tags?: string[];
  stock?: number;
  lowStockThreshold?: number;
  status?: "draft" | "published";
  inStock: boolean;
};

const emptyForm: Product = {
  slug: "",
  name: "",
  description: "",
  price: 0,
  salePrice: 0,
  taxRate: 0,
  sku: "",
  brand: "",
  images: [],
  thumbnail: "",
  category: "",
  tags: [],
  stock: 0,
  lowStockThreshold: 5,
  status: "draft",
  inStock: true
};

export default function AdminCatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(emptyForm);
  const [status, setStatus] = useState("");
  const [tab, setTab] = useState<"add" | "manage">("add");

  const load = async () => {
    const res = await fetch("/api/admin/products", { cache: "no-store" });
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    fetch("/api/admin/products", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  const onSave = async () => {
    const payload = {
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      tags: form.tags || [],
      images: form.images || []
    };

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    setStatus(data.message || (res.ok ? "Saved" : "Failed"));
    await load();
    setForm(emptyForm);
    setTab("manage");
  };

  const onDelete = async (slug: string) => {
    await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    await load();
  };

  const tagsText = useMemo(() => (form.tags || []).join(", "), [form.tags]);
  const imagesText = useMemo(() => (form.images || []).join("\n"), [form.images]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-black">Catalog</h1>
        <div className="flex gap-2">
          <button className={`rounded-xl px-3 py-2 text-sm font-semibold ${tab === "add" ? "bg-indigo-600 text-white" : "bg-zinc-100"}`} onClick={() => setTab("add")} type="button">Add Product</button>
          <button className={`rounded-xl px-3 py-2 text-sm font-semibold ${tab === "manage" ? "bg-indigo-600 text-white" : "bg-zinc-100"}`} onClick={() => setTab("manage")} type="button">Manage Products</button>
        </div>
      </div>

      {tab === "add" ? (
        <div className="space-y-3">
          <div className="rounded-xl border border-dashed border-indigo-300 bg-indigo-50 p-3 text-sm text-indigo-700">
            Product Media: Drag-and-drop area (v3 UI). Paste image URLs below for now.
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input className="input" placeholder="Title" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Slug (optional)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <input className="input" placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <input className="input" placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            <input type="number" className="input" placeholder="Base Price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            <input type="number" className="input" placeholder="Sale Price" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: Number(e.target.value) })} />
            <input type="number" className="input" placeholder="Tax Rate %" value={form.taxRate} onChange={(e) => setForm({ ...form, taxRate: Number(e.target.value) })} />
            <input type="number" className="input" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
            <input type="number" className="input" placeholder="Low Stock Threshold" value={form.lowStockThreshold} onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) })} />
            <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <textarea className="input min-h-[90px]" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <div className="grid gap-3 sm:grid-cols-2">
            <textarea className="input min-h-[130px]" placeholder="Image URLs (one per line)" value={imagesText} onChange={(e) => setForm({ ...form, images: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })} />
            <div className="space-y-2">
              <input className="input" placeholder="Thumbnail URL" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
              <input className="input" placeholder="Tags (comma separated)" value={tagsText} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
            </div>
          </div>

          <button onClick={onSave} className="btn-primary" type="button">Save Product</button>
          {status ? <p className="text-sm text-zinc-600">{status}</p> : null}
        </div>
      ) : (
        <div className="overflow-auto rounded-xl border border-zinc-200">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50 text-left">
              <tr>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Stock</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-t">
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">?{p.price}</td>
                  <td className="px-3 py-2">{p.stock ?? 0}</td>
                  <td className="px-3 py-2">{p.status ?? "draft"}</td>
                  <td className="px-3 py-2">
                    <button className="mr-2 font-semibold text-indigo-700" onClick={() => { setForm(p); setTab("add"); }} type="button">Edit</button>
                    <button className="font-semibold text-rose-600" onClick={() => onDelete(p.slug)} type="button">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 ? <tr><td colSpan={5} className="px-3 py-6 text-zinc-500">No products yet.</td></tr> : null}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
