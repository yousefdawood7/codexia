import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type UseEditorAnimate = {
  sectionRef: React.RefObject<HTMLElement | null>;
  frameRef: React.RefObject<HTMLDivElement | null>;
};

export function useEditorAnimate({ sectionRef, frameRef }: UseEditorAnimate) {
  useGSAP(
    () => {
      if (!sectionRef.current || !frameRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.set(frameRef.current, {
        autoAlpha: 0,
        scale: 0.95,
        filter: "blur(10px)",
        y: 40,
      });

      gsap.to(frameRef.current, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const codeLines = frameRef.current.querySelectorAll("[data-code-line]");
      gsap.set(codeLines, { autoAlpha: 0, x: -8 });

      gsap.to(codeLines, {
        autoAlpha: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      const chatBubbles = frameRef.current.querySelectorAll("[data-chat-msg]");
      gsap.set(chatBubbles, { autoAlpha: 0, y: 12, scale: 0.97 });

      gsap.to(chatBubbles, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.3,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      const cursor = frameRef.current.querySelector("[data-cursor]");
      if (cursor) {
        gsap.to(cursor, {
          autoAlpha: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    },
    { scope: sectionRef },
  );
}
