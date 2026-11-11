"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  /** Seconds to wait before animating (use for stagger effects). */
  delay?: number;
  /** Vertical offset in px that the element rises from. */
  y?: number;
  className?: string;
  /** "load" plays immediately on mount; "scroll" waits until in view. */
  when?: "load" | "scroll";
};

/**
 * Signature scroll/load reveal: fade + rise + de-blur.
 * Automatically collapses to a plain render for users with
 * prefers-reduced-motion enabled.
 */
export function Reveal({ children, delay = 0, y = 28, className, when = "scroll" }: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const variants: Variants = {
    hidden: { opacity: 0, y, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      {...(when === "scroll"
        ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
        : { animate: "show" })}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its <Reveal>-style motion children in sequence. */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  when = "scroll",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  when?: "load" | "scroll";
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      {...(when === "scroll"
        ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
        : { animate: "show" })}
    >
      {children}
    </motion.div>
  );
}

/** Child item of <RevealGroup> — must be a motion element supplier. */
export function RevealItem({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const item: Variants = {
    hidden: { opacity: 0, y, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
