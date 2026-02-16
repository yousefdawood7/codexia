import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type UseHowItWorksAnimate = {
  sectionRef: React.RefObject<HTMLElement | null>;
};

export function useHowItWorksAnimate({ sectionRef }: UseHowItWorksAnimate) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const header = sectionRef.current.querySelector("[data-hw-header]");
      if (header) {
        gsap.set(header, { autoAlpha: 0, y: 24, filter: "blur(10px)" });
        gsap.to(header, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        });
      }

      const steps = sectionRef.current.querySelectorAll("[data-hw-step]");
      gsap.set(steps, { autoAlpha: 0, y: 28, filter: "blur(8px)" });
      gsap.to(steps, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );
}
