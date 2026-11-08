"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

type SubmitFormProps = {
  action: string;
  children: React.ReactNode;
  submitLabel: string;
  successMessage: string;
  variant?: "primary" | "secondary";
};

/**
 * Wraps a form to submit via fetch instead of a plain HTML POST — shows
 * an inline success/error message instead of navigating to a raw JSON
 * response. Used by the Join Us page's two forms (member signup, giving
 * intent), matching the pattern already used in ContactForm.tsx.
 */
export function SubmitForm({
  action,
  children,
  submitLabel,
  successMessage,
  variant = "primary",
}: SubmitFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(action, { method: "POST", body: formData });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass flex items-start gap-2.5 rounded-2xl border-mint/25 p-5 text-sm leading-relaxed text-mint">
        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
        {successMessage}
      </div>
    );
  }

  const buttonClass =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-full bg-[linear-gradient(115deg,#f6e7b2,#e8c76a_30%,#c9982f_100%)] px-6 py-3 text-sm font-bold text-night glow-gold transition-all duration-300 hover:brightness-110 disabled:opacity-60"
      : "inline-flex items-center justify-center rounded-full border border-gold/30 bg-gold/[0.06] px-6 py-3 text-sm font-semibold text-gold-pale transition-all duration-300 hover:bg-gold/[0.12] disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {children}
      <button type="submit" disabled={status === "submitting"} className={buttonClass}>
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong — please try again, or email us directly.
        </p>
      )}
    </form>
  );
}
