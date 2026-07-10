import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Become a member or volunteer, register your interest in giving, or subscribe for updates.",
};

export default function JoinUsPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-14">
      <h1 className="mb-2 text-3xl">Join Us</h1>
      <p className="mb-10 text-[15px] text-[var(--color-soil)]">
        Learn how you can get involved — as a member, volunteer, or future supporter.
      </p>

      <section className="mb-14">
        <h2 className="mb-3 text-lg">Become a Member / Volunteer</h2>
        <p className="mb-4 text-sm text-[var(--color-soil)]">
          Content pending (≤150 words per Content Outline Section 5.1). Note open
          decision: whether to add a light qualifying question given the
          &ldquo;high-calibre diaspora and home membership&rdquo; goal from the Brief —
          confirm before finalizing this form.
        </p>
        <form action="/api/member-signup" method="post" className="space-y-3">
          <div>
            <label htmlFor="member-name" className="mb-1 block text-xs font-semibold">
              Full name
            </label>
            <input
              id="member-name"
              name="name"
              required
              className="w-full rounded-[6px] border border-[var(--color-soil)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="member-email" className="mb-1 block text-xs font-semibold">
              Email
            </label>
            <input
              id="member-email"
              name="email"
              type="email"
              required
              className="w-full rounded-[6px] border border-[var(--color-soil)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="member-interest" className="mb-1 block text-xs font-semibold">
              Area of interest
            </label>
            <select
              id="member-interest"
              name="interest"
              className="w-full rounded-[6px] border border-[var(--color-soil)] px-3 py-2 text-sm"
            >
              <option value="member">Become a member</option>
              <option value="volunteer">Volunteer</option>
              <option value="both">Both</option>
            </select>
          </div>
          <button
            type="submit"
            className="rounded-[7px] bg-[var(--color-forest)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Submit
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-3 text-lg">Support IEDF</h2>
        <p className="mb-4 text-sm text-[var(--color-soil)]">
          Giving is coming soon — IEDF&apos;s bank account and payment processor are
          being finalized. Register your interest below and we&apos;ll reach out the
          moment live giving is available.
        </p>
        <form action="/api/member-signup" method="post" className="space-y-3">
          <input type="hidden" name="interest" value="giving-intent" />
          <div>
            <label htmlFor="support-email" className="mb-1 block text-xs font-semibold">
              Email
            </label>
            <input
              id="support-email"
              name="email"
              type="email"
              required
              className="w-full rounded-[6px] border border-[var(--color-soil)] px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-[7px] border-[1.5px] border-[var(--color-soil)] px-5 py-2.5 text-sm font-semibold"
          >
            Register My Interest
          </button>
        </form>
      </section>
    </div>
  );
}
