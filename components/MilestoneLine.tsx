type MilestonePoint = {
  date: string;
  label: string;
  variant?: "past" | "future";
};

type MilestoneLineProps = {
  points: MilestonePoint[];
  /** Compact = Home teaser. Full = About page, with more detail per point. */
  size?: "compact" | "full";
};

/**
 * The site's one signature, recurring visual device (see Visual Design
 * System, Section 5). Appears on Home (compact), About: Our Story (full),
 * and Projects: Strategic Roadmap (extended forward).
 *
 * Past/present points use gold; the forward-looking roadmap point uses
 * forest green — directly echoing the logo's own gold-ring + green-growth
 * -arrow motif.
 */
export function MilestoneLine({ points, size = "compact" }: MilestoneLineProps) {
  return (
    <div
      className="flex items-start"
      role="list"
      aria-label="IEDF milestone timeline"
    >
      {points.map((point, i) => {
        const isLast = i === points.length - 1;
        const isFuture = point.variant === "future";

        return (
          <div
            key={point.date}
            role="listitem"
            className="relative flex flex-1 flex-col items-center px-1"
          >
            {!isLast && (
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[6px] h-[2px] w-full"
                style={{ background: "var(--color-gold)" }}
              />
            )}
            <div
              aria-hidden="true"
              className="relative z-10 mb-2 h-3.5 w-3.5 rounded-full border-[3px]"
              style={{
                background: isFuture ? "var(--color-forest)" : "var(--color-gold)",
                borderColor: "var(--color-parchment)",
                outline: `2px solid ${isFuture ? "var(--color-forest)" : "var(--color-gold)"}`,
              }}
            />
            <div className="font-mono text-[11px] font-medium text-[var(--color-forest)]">
              {point.date}
            </div>
            <div
              className={`text-center font-semibold ${
                size === "full" ? "max-w-[160px] text-sm" : "max-w-[110px] text-xs"
              }`}
            >
              {point.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
