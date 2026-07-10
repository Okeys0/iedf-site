import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

/**
 * Primary: forest-green fill (matches logo's dominant color).
 * Secondary: outline, warm-gray/soil border.
 * Focus state uses a visible forest-green outline per WCAG 2.2 AA.
 */
export function Button({ href, children, variant = "primary" }: ButtonProps) {
  const base =
    "inline-block rounded-[7px] px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]";

  const styles =
    variant === "primary"
      ? "bg-[var(--color-forest)] text-white hover:bg-[#153d26]"
      : "border-[1.5px] border-[var(--color-soil)] text-[var(--color-loam)] hover:bg-[var(--color-forest-tint)]";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
