"use client";

import { useState, FormEvent } from "react";

type NewsletterFormProps = {
  placeholder: string;
  buttonLabel: string;
};

export function NewsletterForm({ placeholder, buttonLabel }: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

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
      <div className="rounded-[7px] border border-[var(--color-forest)] bg-white p-3 text-sm">
        Thank you for subscribing — you&apos;re on the list.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder={placeholder}
        className="flex-1 rounded-[7px] border border-[var(--color-soil)] bg-white px-3 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-forest)]"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-[7px] bg-[var(--color-forest)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#153d26] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : buttonLabel}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700 sm:basis-full">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
