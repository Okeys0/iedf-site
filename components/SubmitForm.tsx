"use client";

import { useState, FormEvent } from "react";

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
      <div className="rounded-[7px] border border-[var(--color-forest)] bg-[var(--color-forest-tint)] p-4 text-sm">
        {successMessage}
      </div>
    );
  }

  const buttonClass =
    variant === "primary"
      ? "rounded-[7px] bg-[var(--color-forest)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      : "rounded-[7px] border-[1.5px] border-[var(--color-soil)] px-5 py-2.5 text-sm font-semibold disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {children}
      <button type="submit" disabled={status === "submitting"} className={buttonClass}>
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong — please try again, or email us directly.
        </p>
      )}
    </form>
  );
}
