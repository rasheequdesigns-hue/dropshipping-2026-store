"use client";

import { useState } from "react";
import Papa from "papaparse";

export default function AdminProductsPage() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");

  const submit = async () => {
    try {
      let products: unknown[] = [];

      if (input.trim().startsWith("[")) {
        products = JSON.parse(input);
      } else {
        const parsed = Papa.parse(input, { header: true });
        products = parsed.data as unknown[];
      }

      const res = await fetch("/api/products/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products })
      });

      const data = await res.json();
      setStatus(data.message || "Imported");
    } catch (e) {
      setStatus(`Import failed: ${String(e)}`);
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Admin: Import Products</h1>
      <p className="text-zinc-600">Paste JSON array or CSV (title, body, amount, image_url, sku, category, available).</p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-64 w-full rounded-md border p-3 font-mono text-sm"
        placeholder='[{"title":"Portable Blender","amount":2499}]'
      />
      <button onClick={submit} className="rounded-md bg-zinc-900 px-5 py-2 text-white" type="button">Import</button>
      {status ? <p className="text-sm text-zinc-700">{status}</p> : null}
    </section>
  );
}
