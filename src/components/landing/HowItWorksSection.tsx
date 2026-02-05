import { Bot, FolderPlus, Rocket } from "lucide-react";

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
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="font-poppins text-3xl font-bold tracking-tight md:text-4xl">
            From idea to reality{" "}
            <span className="text-muted-foreground">in three steps</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl md:text-lg">
            No complicated setup. No steep learning curve. Just start building.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Connecting line (desktop only) */}
          <div
            className="pointer-events-none absolute top-14 right-[16.67%] left-[16.67%] hidden h-px md:block"
            aria-hidden="true"
          >
            <div className="border-border h-full w-full border-t border-dashed" />
          </div>

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Large watermark number */}
                <span className="font-plex-mono text-foreground/4 pointer-events-none absolute -top-6 text-7xl font-bold select-none md:text-8xl">
                  {step.number}
                </span>

                {/* Icon circle */}
                <div className="border-border bg-card relative z-10 mb-5 flex size-14 items-center justify-center rounded-full border">
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
