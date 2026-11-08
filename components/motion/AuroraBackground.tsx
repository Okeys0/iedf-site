/**
 * Ambient page atmosphere — fixed behind everything:
 * three slowly drifting aurora orbs (emerald + gold), a film-grain
 * overlay for texture, and a vignette that keeps edges deep.
 * Pure CSS animation — compositor-driven, zero JS on the thread.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #0a1712 0%, var(--color-night) 55%), var(--color-night)",
        }}
      />
      {/* Aurora orbs */}
      <div
        className="absolute -top-[20%] left-[8%] h-[46rem] w-[46rem] rounded-full opacity-50 blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(47,158,99,0.34) 0%, transparent 65%)",
          animation: "aurora-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[30%] right-[4%] h-[40rem] w-[40rem] rounded-full opacity-40 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(201,152,47,0.22) 0%, transparent 65%)",
          animation: "aurora-b 32s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[30%] h-[44rem] w-[40rem] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(26,74,46,0.55) 0%, transparent 70%)",
          animation: "aurora-c 38s ease-in-out infinite",
        }}
      />
      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 40%, transparent 55%, rgba(2,5,4,0.55) 100%)",
        }}
      />
    </div>
  );
}
