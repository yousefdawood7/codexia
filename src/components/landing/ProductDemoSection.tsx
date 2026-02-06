"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/landing/SectionLabel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Simulated code lines ─── */
const CODE_LINES = [
  {
    indent: 0,
    text: 'import { api } from "@/convex/_generated/api";',
    color: "text-white/60",
  },
  {
    indent: 0,
    text: 'import { useQuery } from "convex/react";',
    color: "text-white/60",
  },
  { indent: 0, text: "", color: "" },
  {
    indent: 0,
    text: "export default function Dashboard() {",
    color: "text-white/90",
  },
  {
    indent: 1,
    text: "const projects = useQuery(api.projects.list);",
    color: "text-white/70",
  },
  { indent: 0, text: "", color: "" },
  { indent: 1, text: "return (", color: "text-white/90" },
  {
    indent: 2,
    text: '<div className="grid grid-cols-3 gap-4">',
    color: "text-white/70",
  },
  { indent: 3, text: "{projects?.map((p) => (", color: "text-white/60" },
  {
    indent: 4,
    text: "<ProjectCard key={p._id} project={p} />",
    color: "text-white/80",
  },
  { indent: 3, text: "))}", color: "text-white/60" },
  { indent: 2, text: "</div>", color: "text-white/70" },
  { indent: 1, text: ");", color: "text-white/90" },
  { indent: 0, text: "}", color: "text-white/90" },
] as const;

/* ─── Simulated AI chat messages ─── */
const CHAT_MESSAGES = [
  {
    role: "user" as const,
    text: "Add a search bar to filter projects by name",
  },
  {
    role: "ai" as const,
    text: "I'll add a search input with real-time filtering. Adding a useState for the query and filtering the projects array...",
  },
  {
    role: "ai" as const,
    text: "Done! Added a search bar with debounced filtering. The projects now filter as you type. Want me to add sorting options too?",
  },
] as const;

export default function ProductDemoSection() {
  const sectionRef = useRef<HTMLElement>(null!);
  const frameRef = useRef<HTMLDivElement>(null!);

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
              localhost:3000/dashboard
            </div>
            <div className="w-[46px]" />
          </div>

          {/* Split panes */}
          <div className="grid min-h-[360px] grid-cols-1 md:grid-cols-[1fr_320px]">
            {/* Code Editor Pane */}
            <div className="border-border/30 bg-[oklch(0.13_0_0)] p-5 md:border-r">
              {/* Tab bar */}
              <div className="mb-4 flex items-center gap-3">
                <div className="font-plex-mono rounded-md bg-white/10 px-3 py-1 text-[11px] text-white/70">
                  Dashboard.tsx
                </div>
                <div className="font-plex-mono px-3 py-1 text-[11px] text-white/30">
                  layout.tsx
                </div>
              </div>

              {/* Code content */}
              <div className="font-plex-mono space-y-0.5 text-[12px] leading-[1.7]">
                {CODE_LINES.map((line, i) => (
                  <div
                    key={i}
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
                    {i === CODE_LINES.length - 1 && (
                      <span
                        data-cursor
                        className="ml-0.5 inline-block h-[14px] w-[1.5px] translate-y-[2px] bg-white/70"
                      />
                    )}
                  </div>
                ))}
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
