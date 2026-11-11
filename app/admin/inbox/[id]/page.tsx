"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Payload = {
  name?: string;
  email?: string;
  organization?: string;
  inquiryType?: string;
  message?: string;
};

type Reply = {
  id: number;
  subject: string;
  body: string;
  sent_at: string;
};

type Thread = {
  message: { id: number; email: string; status: string; created_at: string; payload: Payload };
  replies: Reply[];
};

export default function MessagePage() {
  const params = useParams<{ id: string }>();
  const [thread, setThread] = useState<Thread | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/inbox/${params.id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not open this message.");
        setThread(data);
        const kind = data.message.payload?.inquiryType || "general";
        setSubject(`Re: Your ${kind} message to IEDF`);
      })
      .catch((err: Error) => setError(err.message));
  }, [params.id]);

  async function send(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setNotice(null);
    setError(null);
    try {
      const res = await fetch(`/api/admin/inbox/${params.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "The reply was not sent.");
      setThread((current) =>
        current ? { ...current, replies: [...current.replies, data.reply], message: { ...current.message, status: "replied" } } : current
      );
      setBody("");
      setNotice("Reply sent.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "The reply was not sent.");
    } finally {
      setSending(false);
    }
  }

  const message = thread?.message;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/inbox" className="mb-6 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-gold-pale">
        <ArrowLeft size={15} />
        All mail
      </Link>

      {error && <p className="mb-4 text-sm text-gold-pale">{error}</p>}

      {message && (
        <>
          <p className="font-data text-[10px] uppercase tracking-[0.22em] text-gold-bright">
            {message.payload?.inquiryType || "general"} · {message.status}
          </p>
          <h1 className="mt-2 font-display text-4xl italic">{message.payload?.name || message.email}</h1>
          <p className="mt-2 text-sm text-ink-muted">
            {message.email}
            {message.payload?.organization ? ` · ${message.payload.organization}` : ""} ·{" "}
            {new Date(message.created_at).toLocaleString()}
          </p>
          <article className="glass mt-6 rounded-3xl p-6 text-[15px] leading-relaxed text-ink">
            {message.payload?.message}
          </article>

          {thread.replies.length > 0 && (
            <div className="mt-8 space-y-4">
              <h2 className="font-display text-2xl italic">Replies sent</h2>
              {thread.replies.map((reply) => (
                <article key={reply.id} className="rounded-3xl border border-gold/20 bg-forest/25 p-5">
                  <p className="text-sm font-medium text-gold-pale">{reply.subject}</p>
                  <p className="mt-1 font-data text-[11px] text-ink-faint">
                    {new Date(reply.sent_at).toLocaleString()}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink">{reply.body}</p>
                </article>
              ))}
            </div>
          )}

          <form onSubmit={send} className="mt-8 space-y-3">
            <h2 className="font-display text-2xl italic">Reply</h2>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full rounded-xl border border-gold/20 bg-forest/30 px-4 py-3 text-sm outline-none focus:border-gold/50"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={8}
              placeholder="Write your reply. It will be emailed through Resend."
              className="w-full rounded-xl border border-gold/20 bg-forest/30 px-4 py-3 text-sm outline-none focus:border-gold/50"
            />
            {notice && <p className="text-sm text-mint">{notice}</p>}
            <button
              type="submit"
              disabled={sending}
              className="rounded-full bg-[linear-gradient(115deg,#f6e7b2,#ecc76a_30%,#d4a734_100%)] px-6 py-3 text-sm font-bold text-night disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send reply"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
