/**
 * Decorative marquee band — brand tagline motifs gliding past behind a
 * frosted glass strip. Pure CSS (marquee keyframes), duplicated track
 * for a seamless loop. Hidden from assistive tech (decorative).
 */
const ITEM = ["Collaborate", "Innovate", "Invest", "Prosper"];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {[...ITEM, ...ITEM, ...ITEM].map((word, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-2xl italic text-white/25 sm:text-3xl">{word}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold/50" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-5 backdrop-blur-sm"
    >
      <div className="flex w-max" style={{ animation: "marquee 38s linear infinite" }}>
        <Track />
        <Track />
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-night to-transparent" />
    </div>
  );
}
