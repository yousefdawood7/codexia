"use client";

import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CHAT_MESSAGES,
  DASHBOARD_CODE,
  LAYOUT_CODE,
  TABS,
} from "@/components/landing/editor/constants";
import SectionLabel from "@/components/landing/SectionLabel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProductDemoSection() {
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
      if (tabId === activeTab) return;
      setActiveTab(tabId);
      // Animate after React re-renders with new lines
      requestAnimationFrame(() => {
        animateCodeLines();
      });
    },
    [activeTab, animateCodeLines],
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !frameRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      /* ── Frame entrance ── */
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

      /* ── Code lines typing ── */
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

      /* ── Chat messages ── */
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

      /* ── Cursor blink ── */
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

  return (
    <section
      ref={sectionRef}
      className="bg-dot-grid relative overflow-hidden py-20 md:py-28"
    >
      
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <div className="bg-foreground/[0.02] h-[600px] w-[800px] rounded-full blur-3xl" />
      </div>

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

        {/* Browser Frame */}
        <div
          ref={frameRef}
          className="border-border/60 bg-card/50 mx-auto overflow-hidden rounded-xl border shadow-2xl shadow-black/10 backdrop-blur-sm dark:shadow-black/40"
        >
          {/* Chrome bar */}
          <div className="border-border/40 flex items-center gap-3 border-b bg-black/5 px-4 py-3 dark:bg-white/5">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-white/10 dark:bg-white/15" />
              <div className="size-2.5 rounded-full bg-white/10 dark:bg-white/15" />
              <div className="size-2.5 rounded-full bg-white/10 dark:bg-white/15" />
            </div>
            {/* URL bar */}
            <div className="font-plex-mono bg-background/60 text-foreground/40 flex-1 rounded-md px-3 py-1 text-center text-[11px]">
              codexia.yousefdawood.me/dashboard
            </div>
            <div className="w-[46px]" />
          </div>

          {/* Split panes */}
          <div className="grid min-h-[360px] grid-cols-1 md:grid-cols-[1fr_320px]">
            {/* Code Editor Pane */}
            <div className="border-border/30 bg-[oklch(0.13_0_0)] p-5 md:border-r">
              {/* Tab bar */}
              <div className="mb-4 flex items-center gap-1">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabSwitch(tab.id)}
                    className={`font-plex-mono rounded-md px-3 py-1 text-[11px] transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-white/10 text-white/70"
                        : "text-white/30 hover:text-white/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Code content */}
              <div
                ref={codeContainerRef}
                className="font-plex-mono min-h-[340px] space-y-0.5 text-[12px] leading-[1.7]"
              >
                {(activeTab === "dashboard" ? DASHBOARD_CODE : LAYOUT_CODE).map(
                  (line, i, arr) => (
                    <div
                      key={`${activeTab}-${i}`}
                      data-code-line
                      className="flex"
                      style={{ paddingLeft: `${line.indent * 16}px` }}
                    >
                      {/* Line number */}
                      <span className="mr-4 inline-block w-5 text-right text-white/15 select-none">
                        {i + 1}
                      </span>
                      <span className={line.color}>{line.text}</span>
                      {/* Blinking cursor on last code line */}
                      {i === arr.length - 1 && (
                        <span
                          data-cursor
                          className="ml-0.5 inline-block h-[14px] w-[1.5px] translate-y-[2px] bg-white/70"
                        />
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* AI Chat Pane */}
            <div className="bg-[oklch(0.16_0_0)] p-4">
              {/* Chat header */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-white/10">
                  <span className="text-[10px] text-white/60">AI</span>
                </div>
                <span className="font-plex-mono text-[11px] font-medium text-white/50">
                  Codexia Assistant
                </span>
              </div>

              {/* Chat messages */}
              <div className="space-y-3">
                {CHAT_MESSAGES.map((msg, i) => (
                  <div
                    key={i}
                    data-chat-msg
                    className={`max-w-[95%] rounded-lg px-3 py-2.5 text-[12px] leading-relaxed ${
                      msg.role === "user"
                        ? "ml-auto bg-white/10 text-white/80"
                        : "bg-white/[0.04] text-white/60"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Input bar */}
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2.5">
                <span className="font-plex-mono text-[11px] text-white/25">
                  Ask Codexia anything...
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-muted-foreground/60 font-plex-mono mt-6 text-center text-[11px] tracking-wide">
          Code + AI chat — your ideas, realized instantly.
        </p>
      </div>
    </section>
  );
}
