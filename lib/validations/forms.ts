import { z } from "zod";

/**
 * Shared across all form Route Handlers (see Technical Architecture,
 * Section 5). Validated server-side — client-side validation is a UX
 * nicety, never the source of truth.
 */

export const inquiryTypes = [
  "investor",
  "partner",
  "press",
  "volunteer",
  "general",
] as const;

export const contactFormSchema = z.object({
  inquiryType: z.enum(inquiryTypes),
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().optional(),
  message: z.string().min(10, "Please provide a bit more detail"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const memberSignupSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email("Please enter a valid email address"),
  interest: z.enum(["member", "volunteer", "both", "giving-intent"]),
});

export type MemberSignupData = z.infer<typeof memberSignupSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

/** Which internal recipient each Contact inquiry type routes to. */
export const inquiryRoutingMap: Record<(typeof inquiryTypes)[number], string> = {
  investor: "investors@iedf.org",
  partner: "partnerships@iedf.org",
  press: "press@iedf.org",
  volunteer: "volunteers@iedf.org",
  general: "info@iedf.org",
};
