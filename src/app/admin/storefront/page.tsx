"use client";

import { useEffect, useState } from "react";

type Settings = {
  siteName: string;
  logoUrl: string;
  bannerText: string;
  contactEmail: string;
  contactPhone: string;
};

export default function StorefrontSettingsPage() {
  const [form, setForm] = useState<Settings>({ siteName: "", logoUrl: "", bannerText: "", contactEmail: "", contactPhone: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/admin/storefront").then((r) => r.json()).then((d) => setForm(d.settings));
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/storefront", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setStatus(data.message || "Saved");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black">Storefront</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="input" placeholder="Site Name" value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />
        <input className="input" placeholder="Logo URL" value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
        <input className="input sm:col-span-2" placeholder="Banner Text" value={form.bannerText} onChange={(e) => setForm({ ...form, bannerText: e.target.value })} />
        <input className="input" placeholder="Contact Email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
        <input className="input" placeholder="Contact Phone" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
      </div>
      <button onClick={save} className="btn-primary" type="button">Save Storefront</button>
      {status ? <p className="text-sm text-zinc-600">{status}</p> : null}
    </div>
  );
}
