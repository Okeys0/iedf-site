import { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subline?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Reusable editorial section header: a gold mono eyebrow, an Instrument
 * Serif display title (wrap accent words in <em> for the italic-gold
 * treatment), and a muted subline.
 */
export function SectionHeading({
  eyebrow,
  title,
  subline,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`${alignCls} max-w-2xl ${className}`}>
      <div className={`mb-4 ${align === "center" ? "flex flex-col items-center" : ""}`}>
        {eyebrow && (
          <div
            className={`mb-3 flex items-center gap-3 font-data text-[11px] font-medium uppercase tracking-[0.28em] text-gold-bright ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            <span aria-hidden="true" className="hairline-gold h-px w-8" />
            {eyebrow}
            <span aria-hidden="true" className="hairline-gold h-px w-8" />
          </div>
        )}
        <h2 className="text-4xl leading-[1.08] sm:text-5xl">{title}</h2>
      </div>
      {subline && <p className="text-base leading-relaxed text-ink-muted">{subline}</p>}
    </Reveal>
  );
}
