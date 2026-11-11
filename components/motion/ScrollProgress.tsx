"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Thin gold scroll-progress beam fixed to the top of the viewport,
 * plus the scrolled state shared visual signal (exported via hook for
 * the header to consume).
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[90] h-[2.5px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #2f9e63, #e8c76a, #f4e3ae, #c9982f)",
      }}
    />
  );
}

/** True once the page has scrolled past `threshold` px. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
