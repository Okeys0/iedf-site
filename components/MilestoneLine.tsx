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
 * The site's signature timeline — redesigned as a glowing gold beam with
 * luminous nodes. Past points: gold. The forward-looking point: emerald,
 * echoing the logo's growth-arrow motif. Subtle scale/opacity shift on
 * the trailing node signals momentum into the future.
 */
export function MilestoneLine({ points, size = "compact" }: MilestoneLineProps) {
  return (
    <div className="flex items-start" role="list" aria-label="IEDF milestone timeline">
      {points.map((point, i) => {
        const isLast = i === points.length - 1;
        const isFuture = point.variant === "future";
        const nodeColor = isFuture ? "var(--color-emerald)" : "var(--color-gold)";
        const glow = isFuture
          ? "0 0 14px 2px rgba(47,158,99,0.55)"
          : "0 0 14px 2px rgba(201,152,47,0.55)";

        return (
          <div
            key={point.date}
            role="listitem"
            className="relative flex flex-1 flex-col items-center px-1"
          >
            {/* Beam segment to the next node */}
            {!isLast && (
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[7px] h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-gold) 0%, var(--color-gold) 45%, rgba(201,152,47,0.25) 100%)",
                }}
              />
            )}
            {/* Node */}
            <div
              aria-hidden="true"
              className="relative z-10 mb-3 h-[7px] w-[7px] rounded-full"
              style={{ background: nodeColor, boxShadow: glow }}
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[3.5px] z-[5] mb-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border opacity-40"
              style={{ borderColor: nodeColor }}
            />
            <div className={`font-data ${size === "full" ? "text-[13px]" : "text-[11px]"} font-medium text-gold-bright`}>
              {point.date}
            </div>
            <div
              className={`mt-1 text-center font-medium leading-snug text-ink-muted ${
                size === "full" ? "max-w-[170px] text-sm" : "max-w-[120px] text-xs"
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
