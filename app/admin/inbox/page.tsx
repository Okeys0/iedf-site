"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Message = {
  id: number;
  email: string;
  status: string;
  created_at: string;
  payload: { name?: string; inquiryType?: string; message?: string };
};

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/inbox")
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || "Could not load mail.");
        setMessages(body.messages);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-4xl italic">Mail</h1>
      <p className="mt-2 text-sm text-ink-muted">Contact form messages. Open one to read it and reply.</p>
      {error && <p className="mt-6 text-sm text-gold-pale">{error}</p>}
      <div className="mt-8 space-y-3">
        {messages?.length === 0 && <p className="text-sm text-ink-muted">No messages yet.</p>}
        {messages?.map((message) => (
          <Link
            key={message.id}
            href={`/admin/inbox/${message.id}`}
            className="glass block rounded-2xl p-5 transition hover:border-gold/40"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium text-ink">{message.payload?.name || message.email}</p>
              <time className="font-data text-[11px] text-ink-faint">
                {new Date(message.created_at).toLocaleString()}
              </time>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {message.payload?.inquiryType || "general"} · {message.email}
            </p>
            <p className="mt-2 line-clamp-2 text-sm text-ink-faint">{message.payload?.message}</p>
            <p className="mt-3 font-data text-[10px] uppercase tracking-[0.18em] text-gold-bright">
              {message.status}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
