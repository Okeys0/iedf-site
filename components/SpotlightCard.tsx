"use client";

import { useRef } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
  /** Disable the pointer-tracked glow (e.g. static listings). */
  glow?: boolean;
};

/**
 * Glass card with a soft spotlight that follows the visitor's cursor.
 * The radial highlight in .spotlight-card::before reads --spot-x/--spot-y.
 */
export function SpotlightCard({
  children,
  className = "",
  as = "div",
  glow = true,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const Tag = as as "div";

  function handleMove(e: React.MouseEvent) {
    if (!glow || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    ref.current.style.setProperty("--spot-x", `${x * 100}%`);
    ref.current.style.setProperty("--spot-y", `${y * 100}%`);
  }

  return (
    <Tag ref={ref} onMouseMove={handleMove} className={`spotlight-card ${glow ? "glass" : "glass"} ${className}`}>
      {children}
    </Tag>
  );
}
