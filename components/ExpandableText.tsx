"use client";

import { useState } from "react";

type ExpandableTextProps = {
  paragraphs: string[];
  /** How many paragraphs show before the "Read more" toggle. Default 2. */
  initiallyShown?: number;
  /** Toggle labels (translated by the caller; English defaults). */
  readMoreLabel?: string;
  showLessLabel?: string;
};

export function ExpandableText({
  paragraphs,
  initiallyShown = 2,
  readMoreLabel = "Read more",
  showLessLabel = "Show less",
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? paragraphs : paragraphs.slice(0, initiallyShown);
  const hasMore = paragraphs.length > initiallyShown;

  return (
    <div className="space-y-5 text-[15.5px] leading-[1.85] text-ink-muted">
      {visible.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="group inline-flex items-center gap-2 font-data text-xs font-semibold uppercase tracking-[0.2em] text-gold-bright transition-colors hover:text-gold-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
        >
          <span className="hairline-gold h-px w-6 transition-all duration-300 group-hover:w-9" />
          {expanded ? showLessLabel : readMoreLabel}
        </button>
      )}
    </div>
  );
}
