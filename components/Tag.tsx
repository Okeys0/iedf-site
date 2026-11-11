import { ReactNode } from "react";

type TagProps = {
  variant: "active" | "planned";
  children: ReactNode;
};

/**
 * Status chips, redesigned for the dark glass system.
 * "Active": live mint/gold glow dot + gold text on glass.
 * "Planned": muted glass with a dim dot.
 */
export function Tag({ variant, children }: TagProps) {
  if (variant === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 font-data text-[10px] font-medium uppercase tracking-[0.18em] text-gold-bright backdrop-blur-sm">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-mint"
          style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
        />
        {children}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 font-data text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint backdrop-blur-sm">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink-faint/70" />
      {children}
    </span>
  );
}
