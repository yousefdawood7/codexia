"use client";

import { useRef } from "react";
import { Bot, FolderPlus, Rocket } from "lucide-react";
import SectionHeader from "@/components/landing/SectionHeader";
import { useHowItWorksAnimate } from "@/hooks/useHowItWorksAnimate";

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
  useHowItWorksAnimate({ sectionRef });

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

      <div className="relative mx-auto flex max-w-5xl flex-col gap-3.5 px-6">
        <SectionHeader
          subTitle="Workflow"
          title={{ text: "in three steps", highlight: "From idea to reality" }}
          description="No complicated setup. No steep learning curve. Just start building."
        />

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                data-hw-step
                className="relative flex flex-col items-center text-center"
              >
                {/* Large watermark number */}
                <span className="font-plex-mono text-foreground/6 pointer-events-none absolute -top-6 text-7xl font-bold blur-[3px] select-none md:text-8xl">
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
