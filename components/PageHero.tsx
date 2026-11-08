import { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subline?: string;
  align?: "left" | "center";
};

/**
 * Cinematic page opener for every inner page: clears the floating
 * header, settles beneath the global aurora, and announces the page
 * with a gold eyebrow, an oversized Instrument Serif title and a muted
 * subline.
 */
export function PageHero({ eyebrow, title, subline, align = "left" }: PageHeroProps) {
  const centered = align === "center";
  return (
    <section
      className={`px-6 pb-14 pt-36 sm:pt-44 ${centered ? "text-center" : ""}`}
    >
      <div className={`mx-auto max-w-3xl ${centered ? "flex flex-col items-center" : ""}`}>
        <Reveal when="load">
          {eyebrow && (
            <div
              className={`mb-4 flex items-center gap-3 font-data text-[11px] font-medium uppercase tracking-[0.3em] text-gold-bright ${
                centered ? "justify-center" : ""
              }`}
            >
              <span aria-hidden="true" className="hairline-gold h-px w-10" />
              {eyebrow}
              {centered && <span aria-hidden="true" className="hairline-gold h-px w-10" />}
            </div>
          )}
          <h1 className="text-5xl leading-[1.05] sm:text-6xl">{title}</h1>
          {subline && (
            <p className={`mt-5 max-w-xl text-lg leading-relaxed text-ink-muted ${centered ? "mx-auto" : ""}`}>
              {subline}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
