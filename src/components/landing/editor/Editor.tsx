"use client";

import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrowserFrame from "@/components/landing/editor/BrowserFrame";
import SectionLabel from "@/components/landing/SectionLabel";
import RadialGlow from "@/components/RadialGlow";
import { useEditorAnimate } from "@/hooks/useEditorAnimate";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Editor() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "layout">(
    "dashboard",
  );

  const animateCodeLines = useCallback(() => {
    if (!codeContainerRef.current) return;
    const lines = codeContainerRef.current.querySelectorAll("[data-code-line]");
    gsap.fromTo(
      lines,
      { autoAlpha: 0, x: -8, filter: "blur(2px)" },
      {
        autoAlpha: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.25,
        stagger: 0.04,
        ease: "power2.out",
      },
    );
  }, []);

  const handleTabSwitch = useCallback(
    (tabId: "dashboard" | "layout") => {
      // prettier-ignore
      if (tabId === activeTab)
        return;

      setActiveTab(tabId);
      // Animate after React re-renders with new lines
      requestAnimationFrame(() => {
        animateCodeLines();
      });
    },
    [activeTab, animateCodeLines],
  );

  useEditorAnimate({ sectionRef, frameRef });

  return (
    <section
      ref={sectionRef}
      className="bg-dot-grid relative overflow-hidden py-20 md:py-28"
    >
      <RadialGlow />
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section label */}
        <div className="mb-10 text-center md:mb-14">
          <SectionLabel>Preview</SectionLabel>
          <h2 className="font-poppins text-3xl font-bold tracking-tight md:text-4xl">
            Your AI-powered{" "}
            <span className="text-muted-foreground font-light">workspace</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl md:text-lg">
            Code, chat, and ship — all in one place. Watch ideas come to life in
            real time.
          </p>
        </div>

        <BrowserFrame
          activeTab={activeTab}
          handleTabSwitch={handleTabSwitch}
          frameRef={frameRef}
        />

        {/* Caption */}
        <p className="text-muted-foreground/60 mt-6 text-center text-[11px] tracking-wide">
          Code + AI chat — your ideas, realized instantly.
        </p>
      </div>
    </section>
  );
}
