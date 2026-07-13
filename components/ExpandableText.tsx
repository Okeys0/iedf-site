"use client";

import { useState } from "react";

type ExpandableTextProps = {
  paragraphs: string[];
  /** How many paragraphs show before the "Read more" toggle. Default 2. */
  initiallyShown?: number;
};

export function ExpandableText({ paragraphs, initiallyShown = 2 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? paragraphs : paragraphs.slice(0, initiallyShown);
  const hasMore = paragraphs.length > initiallyShown;

  return (
    <div className="space-y-4 text-[15px] text-[var(--color-soil)]">
      {visible.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="text-sm font-semibold text-[var(--color-forest)] underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
