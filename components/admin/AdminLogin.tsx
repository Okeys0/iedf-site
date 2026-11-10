"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not sign in.");
        return;
      }
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-night px-6 text-ink">
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-3xl p-8">
        <p className="mb-2 font-data text-[10px] uppercase tracking-[0.28em] text-gold-bright">
          IEDF
        </p>
        <h1 className="mb-2 font-display text-4xl italic">Admin</h1>
        <p className="mb-8 text-sm leading-relaxed text-ink-muted">
          Sign in with the admin secret to manage mail, members, and gifts. This area is not linked from the public site.
        </p>
        <label className="mb-4 flex flex-col gap-1.5 text-sm">
          <span className="font-data text-[10px] uppercase tracking-[0.2em] text-ink-faint">Admin secret</span>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required
            autoFocus
            className="rounded-xl border border-gold/20 bg-forest/30 px-4 py-3 outline-none focus:border-gold/50"
          />
        </label>
        {error && <p className="mb-4 text-sm text-gold-pale">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[linear-gradient(115deg,#f6e7b2,#ecc76a_30%,#d4a734_100%)] py-3 text-sm font-bold text-night disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Enter the console"}
        </button>
      </form>
    </main>
  );
}
