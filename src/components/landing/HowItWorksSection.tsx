"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, FolderPlus, Rocket } from "lucide-react";
import SectionLabel from "@/components/landing/SectionLabel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    number: "01",
    icon: FolderPlus,
    title: "Create or Import",
    description:
      "Start from scratch or paste any URL. Codexia sets up your project in seconds — no config, no boilerplate.",
  },
  {
    number: "02",
    icon: Bot,
    title: "Build with AI",
    description:
      "Your AI partner understands context. Chat, edit, and iterate in real-time. It's like pair programming, but smarter.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Ship It",
    description:
      "From idea to production. Real-time sync keeps everything up to date. Focus on building — we handle the rest.",
  },
] as const;

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null!);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      /* ── Section header ── */
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

      /* ── Connecting line draw ── */
      const line = sectionRef.current.querySelector("[data-hw-line]");
      if (line) {
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(line, {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        });
      }

      /* ── Step cards stagger ── */
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

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="bg-noise relative overflow-hidden py-24 md:py-32"
    >
      {/* Subtle top-to-bottom gradient for visual rhythm */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, var(--muted) 0%, transparent 40%, transparent 60%, var(--muted) 100%)",
          opacity: 0.15,
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div data-hw-header className="mb-16 text-center">
          <SectionLabel>Workflow</SectionLabel>
          <h2 className="font-poppins text-3xl font-bold tracking-tight md:text-4xl">
            From idea to reality{" "}
            <span className="text-muted-foreground font-light">
              in three steps
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl md:text-lg">
            No complicated setup. No steep learning curve. Just start building.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Connecting line (desktop only) — animated */}
          <div
            className="pointer-events-none absolute top-14 right-[16.67%] left-[16.67%] hidden h-px md:block"
            aria-hidden="true"
          >
            <div
              data-hw-line
              className="from-border via-foreground/15 to-border h-full w-full bg-linear-to-r"
            />
          </div>

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                data-hw-step
                className="relative flex flex-col items-center text-center"
              >
                {/* Large watermark number */}
                <span className="font-plex-mono text-foreground/[0.06] pointer-events-none absolute -top-6 text-7xl font-bold blur-[1px] select-none md:text-8xl">
                  {step.number}
                </span>

                {/* Icon circle */}
                <div className="border-border bg-card relative z-10 mb-5 flex size-14 items-center justify-center rounded-full border shadow-[0_0_20px_oklch(0.5_0_0/0.04)]">
                  <Icon className="text-foreground size-6" />
                </div>

                <h3 className="font-poppins mb-2 text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
