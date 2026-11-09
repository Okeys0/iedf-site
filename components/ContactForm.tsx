"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { inquiryTypes } from "@/lib/validations/forms";
import { CheckCircle2 } from "lucide-react";

/**
 * Inquiry-type radio labels, keyed by the inbound InquiryType union found
 * in lib/validations/forms.ts (order preserved there) → message keys in
 * contact.form (typeInvestor … typeGeneral) so labels localize.
 */
const typeLabels: Record<(typeof inquiryTypes)[number], string> = {
  investor: "typeInvestor",
  partner: "typePartner",
  press: "typePress",
  volunteer: "typeVolunteer",
  general: "typeGeneral",
};

// Organization field shown only for higher-context inquiry types, per
// Wireframes/Content Outline — keeps the form fast for casual visitors
// while capturing what's needed for high-value ones.
const showOrganizationFor = new Set(["investor", "partner", "press"]);

type FieldErrors = Record<string, string[] | undefined>;

/** Shared glass styling for premium inputs */
export const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-all duration-300 focus:border-gold/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-gold/25";
const labelCls = "mb-1.5 block font-data text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [inquiryType, setInquiryType] = useState<(typeof inquiryTypes)[number]>(
    "investor"
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  // Which fields (if any) the server flagged — presence only: the shown
  // error text is translated here so it matches the UI locale, not the
  // server's English Zod strings.
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [genericError, setGenericError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setFieldErrors({});
    setGenericError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      const body = await res.json().catch(() => null);

      if (res.ok) {
        setStatus("success");
        return;
      }

      setStatus("error");
      const errors: FieldErrors = body?.errors ?? {};
      if (errors._form) {
        setGenericError(t("errServer"));
      } else if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
      } else {
        setGenericError(t("errServer"));
      }
    } catch {
      setStatus("error");
      setGenericError(t("errGeneric"));
    }
  }

  if (status === "success") {
    return (
      <div className="glass flex items-start gap-3 rounded-2xl border-mint/25 p-6 text-sm leading-relaxed text-mint">
        <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
        <div>
          <p className="mb-1 font-semibold text-ink">{t("successTitle")}</p>
          {t("successText")}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <fieldset>
        <legend className={`${labelCls} mb-3`}>{t("legend")}</legend>
        <div className="flex flex-wrap gap-2">
          {inquiryTypes.map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="inquiryType"
                value={type}
                checked={inquiryType === type}
                onChange={() => setInquiryType(type)}
                className="sr-only"
              />
              <span
                className={`inline-block cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  inquiryType === type
                    ? "border-gold/60 bg-gold/15 text-gold-pale shadow-[0_0_20px_-6px_rgba(201,152,47,0.5)]"
                    : "border-white/10 bg-white/[0.03] text-ink-muted hover:border-white/25 hover:text-ink"
                }`}
              >
                {t(typeLabels[type])}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="name" className={labelCls}>
          {t("nameLabel")}
        </label>
        <input id="name" name="name" required className={inputCls} />
        {fieldErrors.name && (
          <p className="mt-1.5 text-xs text-red-400">{t("errName")}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          {t("emailLabel")}
        </label>
        <input id="email" name="email" type="email" required className={inputCls} />
        {fieldErrors.email && (
          <p className="mt-1.5 text-xs text-red-400">{t("errEmail")}</p>
        )}
      </div>

      {showOrganizationFor.has(inquiryType) && (
        <div>
          <label htmlFor="organization" className={labelCls}>
            {t("orgLabel")}
          </label>
          <input id="organization" name="organization" className={inputCls} />
        </div>
      )}

      <div>
        <label htmlFor="message" className={labelCls}>
          {t("messageLabel")}
        </label>
        <textarea id="message" name="message" required rows={5} className={`${inputCls} resize-y`} />
        {fieldErrors.message && (
          <p className="mt-1.5 text-xs text-red-400">{t("errMessage")}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-[linear-gradient(115deg,#f6e7b2,#e8c76a_30%,#c9982f_100%)] px-7 py-3 text-sm font-bold text-night glow-gold transition-all duration-300 hover:brightness-110 disabled:opacity-60"
      >
        {status === "submitting" ? t("sendSending") : t("send")}
      </button>

      {genericError && <p className="text-sm text-red-400">{genericError}</p>}
    </form>
  );
}
