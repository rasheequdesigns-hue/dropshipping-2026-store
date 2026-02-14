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
      slug:
        form.slug ||
        form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
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
  };

  const onDelete = async (slug: string) => {
    await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    await load();
  };

  const tagsText = useMemo(() => (form.tags || []).join(", "), [form.tags]);
  const imagesText = useMemo(() => (form.images || []).join("\n"), [form.images]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Catalog</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-lg border border-zinc-200 p-4">
          <h2 className="text-lg font-semibold">Add / Edit Product</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="rounded border p-2" placeholder="Title" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="rounded border p-2" placeholder="Slug (optional)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <input className="rounded border p-2" placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <input className="rounded border p-2" placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            <input type="number" className="rounded border p-2" placeholder="Base Price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            <input type="number" className="rounded border p-2" placeholder="Sale Price" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: Number(e.target.value) })} />
            <input type="number" className="rounded border p-2" placeholder="Tax Rate %" value={form.taxRate} onChange={(e) => setForm({ ...form, taxRate: Number(e.target.value) })} />
            <input type="number" className="rounded border p-2" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
            <input type="number" className="rounded border p-2" placeholder="Low Stock Threshold" value={form.lowStockThreshold} onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) })} />
            <input className="rounded border p-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <select className="rounded border p-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <textarea className="w-full rounded border p-2" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <div className="grid gap-3 sm:grid-cols-2">
            <textarea
              className="rounded border p-2"
              rows={4}
              placeholder="Product image URLs (one per line)"
              value={imagesText}
              onChange={(e) => setForm({ ...form, images: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            />
            <div className="space-y-2">
              <input className="w-full rounded border p-2" placeholder="Thumbnail URL" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
              <input
                className="w-full rounded border p-2"
                placeholder="Tags (comma separated)"
                value={tagsText}
                onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              />
              <div className="rounded-md border border-dashed border-zinc-300 p-3 text-xs text-zinc-600">
                Drag-and-drop zone (UI placeholder): paste image URLs above or integrate object storage next.
              </div>
            </div>
          </div>

          <button onClick={onSave} className="rounded bg-zinc-900 px-4 py-2 text-white" type="button">Save Product</button>
          {status ? <p className="text-sm text-zinc-600">{status}</p> : null}
        </div>

        <div className="space-y-3 rounded-lg border border-zinc-200 p-4">
          <h2 className="text-lg font-semibold">Products</h2>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Title</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Stock</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug} className="border-b">
                    <td className="py-2">{p.name}</td>
                    <td className="py-2">?{p.price}</td>
                    <td className="py-2">{p.stock ?? 0}</td>
                    <td className="py-2">{p.status ?? "draft"}</td>
                    <td className="py-2">
                      <button className="mr-2 text-blue-600" onClick={() => setForm(p)} type="button">Edit</button>
                      <button className="text-red-600" onClick={() => onDelete(p.slug)} type="button">Delete</button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 ? (
                  <tr><td colSpan={5} className="py-4 text-zinc-500">No products yet.</td></tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
