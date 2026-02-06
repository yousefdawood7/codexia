"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollRevealOptions {
  /** Elements to animate — CSS selector scoped to the container */
  targets: string;
  /** Blur intensity in px (default: 8) */
  blur?: number;
  /** Y offset in px (default: 24) */
  y?: number;
  /** Animation duration in seconds (default: 0.8) */
  duration?: number;
  /** Stagger between elements in seconds (default: 0.1) */
  stagger?: number;
  /** ScrollTrigger start position (default: "top 85%") */
  start?: string;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
}

/**
 * Reusable GSAP ScrollTrigger hook extending the hero's blur-to-focus animation language.
 * Returns a ref to attach to the container element.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions,
) {
  const containerRef = useRef<T>(null!);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const {
        targets,
        blur = 8,
        y = 24,
        duration = 0.8,
        stagger = 0.1,
        start = "top 85%",
        delay = 0,
      } = options;

      const elements = containerRef.current.querySelectorAll(targets);
      if (elements.length === 0) return;

      gsap.set(elements, {
        autoAlpha: 0,
        y,
        filter: `blur(${blur}px)`,
      });

      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  return containerRef;
}
