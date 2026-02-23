import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

type UseHeroAnimate = {
  sectionRef: React.RefObject<HTMLElement | null>;
  headerRef: React.RefObject<HTMLHeadingElement | null>;
  paraRef: React.RefObject<HTMLParagraphElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
};

export function useHeroAnimate({
  sectionRef,
  headerRef,
  paraRef,
  ctaRef,
}: UseHeroAnimate) {
  useGSAP(
    () => {
      if (!headerRef.current) return;

      // Respect reduced-motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(headerRef.current!, {
          type: "lines",
          wordsClass: "lines",
        });

        gsap.set(split.lines, {
          filter: "blur(16px)",
          yPercent: 30,
          autoAlpha: 0,
          scale: 1.06,
          transformOrigin: "50% 100%",
        });

        if (paraRef.current) {
          gsap.set(paraRef.current, { autoAlpha: 0, y: 8 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
        }

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        tl.to(
          split.lines,
          {
            filter: "blur(0px)",
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
          },
          0.1,
        );

        if (paraRef.current) {
          tl.to(
            paraRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.55",
          );
        }
        if (ctaRef.current) {
          tl.to(
            ctaRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.35",
          );
        }
      });
    },
    { scope: sectionRef },
  );
}
