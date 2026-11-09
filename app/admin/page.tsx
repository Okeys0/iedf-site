"use client";

import { FormEvent, useState } from "react";

type Submission = {
  id: number;
  form_type: string;
  payload: Record<string, unknown>;
  email: string;
  created_at: string;
};

/**
 * Lightweight internal console for form submissions.
 * Not linked from the public site — open /admin directly.
 * Requires ADMIN_SECRET (same value as the API Bearer token).
 */
export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [rows, setRows] = useState<Submission[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(e?: FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${secret}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setRows(null);
        setError(data.error || "Request failed");
        return;
      }
      setRows(data.submissions as Submission[]);
    } catch {
      setError("Could not reach the admin API.");
      setRows(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-night px-6 py-16 text-ink">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 font-data text-[10px] uppercase tracking-[0.28em] text-gold-bright">
          Internal
        </p>
        <h1 className="mb-2 font-display text-4xl italic">Form submissions</h1>
        <p className="mb-10 max-w-2xl text-sm text-ink-muted">
          Enter the <code className="text-gold-bright">ADMIN_SECRET</code> from
          the server environment. This page is not linked in the public navigation.
        </p>

        <form onSubmit={load} className="mb-10 flex flex-wrap items-end gap-3">
          <label className="flex min-w-[16rem] flex-1 flex-col gap-1.5 text-sm">
            <span className="font-data text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              Admin secret
            </span>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 outline-none focus:border-gold/40"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[linear-gradient(115deg,#e8c76a,#c9982f)] px-5 py-2.5 text-sm font-bold text-night disabled:opacity-60"
          >
            {loading ? "Loading…" : "Load submissions"}
          </button>
        </form>

        {error && (
          <p className="mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        {rows && (
          <div className="space-y-3">
            <p className="font-data text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              {rows.length} recent row{rows.length === 1 ? "" : "s"}
            </p>
            {rows.length === 0 ? (
              <p className="text-sm text-ink-muted">No submissions yet.</p>
            ) : (
              rows.map((row) => (
                <article
                  key={row.id}
                  className="glass rounded-2xl border border-white/10 p-5"
                >
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-data text-[11px] uppercase tracking-[0.18em] text-gold-bright">
                      {row.form_type}
                    </span>
                    <time className="font-data text-[11px] text-ink-faint">
                      {new Date(row.created_at).toLocaleString()}
                    </time>
                  </div>
                  <p className="mb-2 text-sm">
                    <span className="text-ink-faint">Email · </span>
                    {row.email}
                  </p>
                  <pre className="overflow-x-auto rounded-xl bg-black/30 p-3 font-data text-[11px] leading-relaxed text-ink-muted">
                    {JSON.stringify(row.payload, null, 2)}
                  </pre>
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
