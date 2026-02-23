"use client";

import { Import, MessageSquare, RefreshCw, Shield } from "lucide-react";
import SectionHeader from "@/components/landing/SectionHeader";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "AI Chat Editor",
    description:
      "Collaborate with an AI that understands context. Edit, iterate, and refine — all in one place.",
    span: "md:col-span-4",
    tall: true,
  },
  {
    icon: Import,
    title: "One-Click Import",
    description:
      "Paste a URL. We handle the rest. Your projects, your way — no manual setup required.",
    span: "md:col-span-2",
    tall: false,
  },
  {
    icon: RefreshCw,
    title: "Real-Time Sync",
    description:
      "Changes sync instantly across devices. Your work is always where you are.",
    span: "md:col-span-3",
    tall: false,
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Enterprise-grade authentication and encryption. Your data stays yours. Period.",
    span: "md:col-span-3",
    tall: false,
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
        <SectionHeader
          subTitle="Features"
          title={{ text: "to ship faster", highlight: "Everything you need" }}
          description="Powerful tools. Zero learning curve. Built for makers who move fast."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <SpotlightCard
                key={feature.title}
                className={`group border-border bg-card/80! hover:border-foreground/15 hover:shadow-foreground/2 relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${feature.span} px-0`}
              >
                {/* Top edge glow */}
                <div className="via-foreground/10 pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader
                  className={feature.tall ? "justify-end md:min-h-65" : ""}
                >
                  <div
                    className={`bg-foreground/4 ring-foreground/6 group-hover:ring-foreground/10 mb-3 w-fit rounded-lg ring-1 transition-all duration-300 ${feature.tall ? "p-4" : "p-3"}`}
                  >
                    <Icon
                      className={`text-foreground ${feature.tall ? "size-6" : "size-5"}`}
                    />
                  </div>
                  <CardTitle className={feature.tall ? "text-xl" : "text-lg"}>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>

                  {/* Decorative element for hero card */}
                  {feature.tall && (
                    <div className="mt-4 rounded-md bg-white/3 p-3 text-[11px] leading-relaxed text-white/30 ring-1 ring-white/6">
                      <span className="text-white/50">{">"}</span>{" "}
                      <span className="text-white/40">
                        Add a search bar to filter projects...
                      </span>
                      <div className="mt-1.5 text-white/20">
                        <span className="text-green-400/60">✓</span> AI
                        generated 12 lines across 2 files
                      </div>
                    </div>
                  )}
                </CardHeader>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
