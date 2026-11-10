"use client";

import { useEffect, useState } from "react";

type RecordRow = {
  id: number;
  email?: string;
  status?: string;
  created_at?: string;
  paid_at?: string;
  amount?: string | number;
  currency?: string;
  reference?: string;
  payload?: Record<string, unknown>;
};

export function RecordList({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: "member_signup" | "newsletter" | "donations";
}) {
  const [rows, setRows] = useState<RecordRow[] | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/records?type=${type}`)
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || "Could not load records.");
        setRows(body.records);
        setNotice(body.notice || null);
      })
      .catch((err: Error) => setError(err.message));
  }, [type]);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-4xl italic">{title}</h1>
      <p className="mt-2 text-sm text-ink-muted">{description}</p>
      {error && <p className="mt-6 text-sm text-gold-pale">{error}</p>}
      {notice && <p className="mt-6 text-sm text-ink-muted">{notice}</p>}
      <div className="mt-8 space-y-3">
        {rows?.length === 0 && !notice && <p className="text-sm text-ink-muted">Nothing here yet.</p>}
        {rows?.map((row) => (
          <article key={row.id} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm text-ink">{row.email || "—"}</p>
              <time className="font-data text-[11px] text-ink-faint">
                {new Date(row.paid_at || row.created_at || Date.now()).toLocaleString()}
              </time>
            </div>
            {row.amount != null && (
              <p className="mt-2 text-sm text-gold-pale">
                {row.currency || "NGN"} {Number(row.amount).toLocaleString()} · {row.status} · {row.reference}
              </p>
            )}
            {row.payload && (
              <p className="mt-2 text-sm text-ink-muted">
                {Object.entries(row.payload)
                  .filter(([key]) => key !== "email")
                  .map(([key, value]) => `${key}: ${String(value)}`)
                  .join(" · ")}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
