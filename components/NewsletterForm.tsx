"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

type NewsletterFormProps = {
  placeholder: string;
  buttonLabel: string;
};

export function NewsletterForm({ placeholder, buttonLabel }: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/newsletter", { method: "POST", body: formData });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass flex items-center justify-center gap-2.5 rounded-2xl px-5 py-4 text-sm text-mint">
        <CheckCircle2 size={17} />
        Thank you for subscribing — you&apos;re on the list.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-2.5 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder={placeholder}
        className="glass flex-1 rounded-full px-5 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/30"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="group/nlsh inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#f6e7b2,#e8c76a_30%,#c9982f_100%)] px-6 py-3 text-sm font-bold text-night glow-gold transition-all duration-300 hover:brightness-110 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : buttonLabel}
        {status !== "submitting" && (
          <Send size={14} className="transition-transform duration-300 group-hover/nlsh:translate-x-0.5 group-hover/nlsh:-translate-y-0.5" />
        )}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400 sm:basis-full">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
