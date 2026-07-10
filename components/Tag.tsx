import { ReactNode } from "react";

type TagProps = {
  variant: "active" | "planned";
  children: ReactNode;
};

/**
 * "Active" uses a deliberately darkened gold text color (#8a6a1f) against
 * a light gold-tint background — the raw logo gold alone does not clear
 * the WCAG AA 4.5:1 text-contrast minimum, so this is an intentional
 * accessibility adjustment (see Technical Architecture, Section 7).
 */
export function Tag({ variant, children }: TagProps) {
  if (variant === "active") {
    return (
      <span className="inline-block rounded-full bg-[var(--color-gold-tint)] px-2.5 py-1 font-mono text-[11px] font-medium text-[var(--color-gold-text)]">
        {children}
      </span>
    );
  }

  return (
    <span className="inline-block rounded-full border border-white/40 px-2.5 py-1 font-mono text-[11px] font-medium text-white">
      {children}
    </span>
  );
}
