import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { leaders } from "@/lib/content/leadership";

export const metadata: Metadata = {
  title: "Leadership & Governance",
  description:
    "Meet the executive committee of the Ikeduru Economic Development Forum (IEDF).",
};

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="mx-auto max-w-[1080px] px-6 py-14">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-forest)]">
        About IEDF
      </p>
      <h1 className="mb-2 text-3xl">Leadership &amp; Governance</h1>
      <p className="mb-10 text-[15px] text-[var(--color-soil)]">
        The executive committee driving IEDF&apos;s mission forward.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {leaders.map((leader, i) => (
          <div key={i} className="text-center">
            {leader.photo ? (
              <div className="relative mx-auto mb-3 h-[90px] w-[90px] overflow-hidden rounded-full">
                <Image
                  src={leader.photo}
                  alt={`${leader.name}, ${leader.role}`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="mx-auto mb-3 h-[90px] w-[90px] rounded-full bg-[var(--color-forest-tint)]"
                aria-hidden="true"
              />
            )}
            <div className="text-sm font-semibold">{leader.name}</div>
            <div className="text-xs text-[var(--color-soil)]">{leader.role}</div>
            {leader.bio && (
              <p className="mt-2 text-left text-xs text-[var(--color-soil)]">{leader.bio}</p>
            )}
            {leader.bioSecondParagraph && (
              <p className="mt-2 text-left text-xs text-[var(--color-soil)]">
                {leader.bioSecondParagraph}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-12 text-sm">
        <Link
          href={`/${locale}/about`}
          className="font-semibold text-[var(--color-forest)] hover:underline"
        >
          ← Back to Our Story
        </Link>
      </p>
    </div>
  );
}
