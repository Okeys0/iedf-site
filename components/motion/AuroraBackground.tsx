/**
 * Ambient page atmosphere — fixed behind everything:
 * three slowly drifting aurora orbs (emerald + gold), a film-grain
 * overlay for texture, and a soft forest vignette.
 * Pure CSS animation — compositor-driven, zero JS on the thread.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash — rich forest green, never flat black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% -5%, #1f5a38 0%, #163825 32%, var(--color-night) 68%), var(--color-night)",
        }}
      />
      {/* Aurora orbs */}
      <div
        className="absolute -top-[18%] left-[4%] h-[48rem] w-[48rem] rounded-full opacity-70 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(47,158,99,0.55) 0%, transparent 65%)",
          animation: "aurora-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[22%] right-[-2%] h-[42rem] w-[42rem] rounded-full opacity-55 blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(212,167,52,0.38) 0%, transparent 65%)",
          animation: "aurora-b 32s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-22%] left-[28%] h-[46rem] w-[42rem] rounded-full opacity-50 blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(31,90,56,0.7) 0%, transparent 70%)",
          animation: "aurora-c 38s ease-in-out infinite",
        }}
      />
      {/* Soft gold bloom near center-top */}
      <div
        className="absolute top-[8%] left-1/2 h-[28rem] w-[36rem] -translate-x-1/2 rounded-full opacity-35 blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgba(236,199,106,0.28) 0%, transparent 70%)",
          animation: "aurora-a 40s ease-in-out infinite reverse",
        }}
      />
      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />
      {/* Forest vignette — deep green edges, not black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(95% 75% at 50% 40%, transparent 50%, rgba(8, 28, 18, 0.45) 100%)",
        }}
      />
    </div>
  );
}
