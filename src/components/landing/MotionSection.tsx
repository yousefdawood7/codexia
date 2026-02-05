"use client";

import { useRef } from "react";
import type { Variants } from "motion/react";
import { motion, useInView, type UseInViewOptions } from "motion/react";
import { staggerContainer } from "@/lib/animations";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variants?: Variants;
  /** Control the viewport margin for triggering animation */
  margin?: UseInViewOptions["margin"];
}

export default function MotionSection({
  children,
  className,
  id,
  variants = staggerContainer,
  margin = "-100px" as UseInViewOptions["margin"],
}: MotionSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
}
