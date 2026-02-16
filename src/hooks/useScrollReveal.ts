"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollRevealOptions = {
  targets: string;
  blur?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  delay?: number;
};

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
