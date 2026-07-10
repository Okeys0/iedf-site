import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-14">
      <h1 className="mb-6 text-3xl">Privacy Policy</h1>
      <div className="rounded-[7px] border border-dashed border-black/20 bg-black/[0.02] p-6 text-sm text-[var(--color-soil)]">
        Privacy policy content pending legal review — required given form data
        collection across Member Signup, Newsletter, and Contact (see Content
        Outline, Global/Utility Content; Development Roadmap, Milestone 5).
      </div>
    </div>
  );
}
