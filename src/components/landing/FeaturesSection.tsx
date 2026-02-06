"use client";

import { Import, MessageSquare, RefreshCw, Shield } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SectionLabel from "@/components/landing/SectionLabel";
import { useScrollReveal } from "@/lib/useScrollReveal";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "AI Chat Editor",
    description:
      "Collaborate with an AI that understands context. Edit, iterate, and refine — all in one place.",
  },
  {
    icon: Import,
    title: "One-Click Import",
    description:
      "Paste a URL. We handle the rest. Your projects, your way — no manual setup required.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Sync",
    description:
      "Changes sync instantly across devices. Your work is always where you are.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Enterprise-grade authentication and encryption. Your data stays yours. Period.",
  },
] as const;

export default function FeaturesSection() {
  const sectionRef = useScrollReveal<HTMLElement>({
    targets: "[data-reveal]",
    blur: 10,
    y: 28,
    stagger: 0.1,
    start: "top 82%",
  });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="bg-dot-grid relative overflow-hidden py-24 md:py-32"
    >
      {/* Subtle radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--background) 80%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div data-reveal className="mb-14 text-center md:mb-16">
          <SectionLabel>Features</SectionLabel>
          <h2 className="font-poppins text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need{" "}
            <span className="text-muted-foreground font-light">
              to ship faster
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl md:text-lg">
            Powerful tools. Zero learning curve. Built for makers who move fast.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                data-reveal
                className="group border-border bg-card/80 hover:border-foreground/15 hover:shadow-foreground/[0.02] relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* Top edge glow */}
                <div className="via-foreground/10 pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader>
                  <div className="bg-foreground/[0.04] ring-foreground/[0.06] group-hover:ring-foreground/10 mb-3 w-fit rounded-lg p-3 ring-1 transition-all duration-300">
                    <Icon className="text-foreground size-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
