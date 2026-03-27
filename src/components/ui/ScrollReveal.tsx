"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance to translate up from (px). Default 28. */
  distance?: number;
}

/**
 * Wraps children in a motion.div that fades + slides up when it enters the viewport.
 * Triggers once per page load (once: true).
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 28,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
