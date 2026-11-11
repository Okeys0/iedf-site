"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const NUMERIC = /^\d+$/;

type CounterProps = {
  /** Raw numeric value, e.g. 2025. Non-numeric values render as-is. */
  value: string;
  /** Optional trailing character(s), e.g. "+". */
  suffix?: string;
  className?: string;
};

/**
 * Animated count-up digit — counts only when scrolled into view, once.
 * Numbers like "2025" or "29" gain a cinematic build-up; non-numeric
 * values (e.g. "Growing") simply render statically.
 */
export function Counter({ value, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const isNumeric = NUMERIC.test(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!isNumeric || reduced || !inView) {
      el.textContent = value + suffix;
      return;
    }

    const target = parseInt(value, 10);
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        el.textContent = String(Math.round(latest)) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, reduced, isNumeric]);

  return (
    <span ref={ref} className={className}>
      {isNumeric && !reduced ? "0" + suffix : value + suffix}
    </span>
  );
}
