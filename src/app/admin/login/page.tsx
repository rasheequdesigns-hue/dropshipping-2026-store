"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    router.push("/admin");
  };

  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="text-3xl font-bold">Admin Login</h1>
      <form onSubmit={submit} className="space-y-3 rounded-xl border p-4">
        <input
          type="password"
          className="w-full rounded border p-2"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} className="rounded-md bg-zinc-900 px-4 py-2 text-white" type="submit">
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </section>
  );
}
