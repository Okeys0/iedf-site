import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with IEDF — routed by inquiry type to the right team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[560px] px-6 py-14">
      <h1 className="mb-2 text-3xl">Contact IEDF</h1>
      <p className="mb-8 text-[15px] text-[var(--color-soil)]">
        Tell us why you&apos;re reaching out and we&apos;ll route it to the right team.
      </p>
      <ContactForm />
    </div>
  );
}
