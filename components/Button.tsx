import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

/**
 * Primary: gold gradient with a soft glow — the site's signature CTA.
 * Secondary: frosted glass with gold hover rim.
 * Ghost: quiet, for low-emphasis actions in bands.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  const sizeCls = size === "lg" ? "px-7 py-3.5 text-[15px]" : "px-5 py-2.5 text-sm";
  const base = `group/btn inline-flex items-center justify-center gap-2 rounded-full ${sizeCls} font-semibold transition-all duration-300`;

  const styles =
    variant === "primary"
      ? "text-night font-bold bg-[linear-gradient(115deg,#f6e7b2,#e8c76a_30%,#c9982f_100%)] glow-gold hover:brightness-110 active:scale-[0.98]"
      : variant === "secondary"
        ? "glass text-ink hover:text-gold-pale hover:border-gold/40"
        : "text-ink-muted hover:text-gold-pale border border-transparent hover:border-white/10";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`.trim()}>
      {children}
    </Link>
  );
}
