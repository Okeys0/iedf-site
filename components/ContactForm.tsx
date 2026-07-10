"use client";

import { useState } from "react";
import { inquiryTypes } from "@/lib/validations/forms";

const labels: Record<(typeof inquiryTypes)[number], string> = {
  investor: "Investor",
  partner: "Partner",
  press: "Press",
  volunteer: "Volunteer",
  general: "General",
};

// Organization field shown only for higher-context inquiry types, per
// Wireframes/Content Outline — keeps the form fast for casual visitors
// while capturing what's needed for high-value ones.
const showOrganizationFor = new Set(["investor", "partner", "press"]);

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<(typeof inquiryTypes)[number]>(
    "investor"
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[7px] border border-[var(--color-forest)] bg-[var(--color-forest-tint)] p-5 text-sm">
        Thank you — your message has been sent. We&apos;ll be in touch shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-soil)]">
          Inquiry Type
        </legend>
        <div className="flex flex-wrap gap-2">
          {inquiryTypes.map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="inquiryType"
                value={type}
                checked={inquiryType === type}
                onChange={() => setInquiryType(type)}
                className="peer sr-only"
              />
              <span
                className={`inline-block cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  inquiryType === type
                    ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                    : "border-[var(--color-soil)] text-[var(--color-loam)]"
                }`}
              >
                {labels[type]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="name" className="mb-1 block text-xs font-semibold">
          Full name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-[6px] border border-[var(--color-soil)] px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-forest)]"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-[6px] border border-[var(--color-soil)] px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-forest)]"
        />
      </div>

      {showOrganizationFor.has(inquiryType) && (
        <div>
          <label htmlFor="organization" className="mb-1 block text-xs font-semibold">
            Organization
          </label>
          <input
            id="organization"
            name="organization"
            className="w-full rounded-[6px] border border-[var(--color-soil)] px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-forest)]"
          />
        </div>
      )}

      <div>
        <label htmlFor="message" className="mb-1 block text-xs font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-[6px] border border-[var(--color-soil)] px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-forest)]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-[7px] bg-[var(--color-forest)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong — please try again, or email us directly.
        </p>
      )}
    </form>
  );
}
