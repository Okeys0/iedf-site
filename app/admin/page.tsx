"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Overview = {
  mail: { total: number; unread: number };
  members: number;
  newsletter: number;
  donations: number;
  resendConfigured: boolean;
  fromEmail: string | null;
};

export default function AdminHome() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/overview")
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || "Could not load the console.");
        setData(body);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  const cards = data
    ? [
        { href: "/admin/inbox", label: "Mail", value: data.mail.unread, note: `${data.mail.total} conversations` },
        { href: "/admin/members", label: "Members", value: data.members, note: "Sign-ups and volunteers" },
        { href: "/admin/newsletter", label: "Newsletter", value: data.newsletter, note: "Addresses collected" },
        { href: "/admin/donations", label: "Donations", value: data.donations, note: "Paystack gifts" },
      ]
    : [];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-4xl italic">Overview</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Messages from the contact form arrive in Mail. Open one to read it and send a reply through Resend.
      </p>

      {error && <p className="mt-6 text-sm text-gold-pale">{error}</p>}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="glass rounded-3xl p-6 transition hover:border-gold/40">
            <p className="font-data text-[10px] uppercase tracking-[0.22em] text-gold-bright">{card.label}</p>
            <p className="mt-3 font-display text-5xl">{card.value}</p>
            <p className="mt-2 text-sm text-ink-muted">{card.note}</p>
          </Link>
        ))}
      </div>

      {data && (
        <div className="mt-8 rounded-3xl border border-gold/15 bg-forest/20 p-6 text-sm text-ink-muted">
          <p className="font-data text-[10px] uppercase tracking-[0.22em] text-gold-bright">Resend</p>
          {data.resendConfigured ? (
            <p className="mt-2">
              Replies will send from <span className="text-ink">{data.fromEmail}</span>.
            </p>
          ) : (
            <p className="mt-2">
              Add <span className="text-ink">RESEND_API_KEY</span> and a verified{" "}
              <span className="text-ink">RESEND_FROM_EMAIL</span> before replies can leave the console.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
