import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Announcements, events, and press mentions from IEDF.",
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-[880px] px-6 py-14">
      <h1 className="mb-2 text-3xl">News &amp; Updates</h1>
      <p className="mb-10 text-[15px] text-[var(--color-soil)]">
        Announcements, events, and press mentions. Content cadence: 1–2 posts/month
        (see Content Outline Section 6) — post template to be finalized with the
        Sanity `NewsPost` schema (see sanity/schemaTypes/newsPost.ts).
      </p>
      <div className="rounded-[7px] border border-dashed border-black/20 bg-black/[0.02] p-6 text-sm text-[var(--color-soil)]">
        No posts yet — this listing will populate automatically from Sanity once
        the content team publishes the first entries.
      </div>
    </div>
  );
}
