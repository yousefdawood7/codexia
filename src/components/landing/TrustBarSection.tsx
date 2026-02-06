import type { ComponentType, SVGProps } from "react";
import SectionLabel from "@/components/landing/SectionLabel";
import { Convex } from "@/components/ui/svgs/convex";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { ShadcnIcon } from "@/components/ui/svgs/shadcn";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";

type Logo = { Icon: ComponentType<SVGProps<SVGSVGElement>>; name: string };

const LOGOS: Logo[] = [
  { Icon: NextjsIconDark, name: "Next.js" },
  { Icon: ReactDark, name: "React" },
  { Icon: Tailwindcss, name: "Tailwind CSS" },
  { Icon: ShadcnIcon, name: "shadcn/ui" },
  { Icon: Convex, name: "Convex" },
];

export default function TrustBarSection() {
  return (
    <section className="bg-noise relative overflow-hidden py-12 md:py-16">
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-8 text-center">
          <SectionLabel>Powered By</SectionLabel>
        </div>

        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent md:w-24" />
          {/* Right fade */}
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent md:w-24" />

          <div className="flex items-center justify-center gap-6">
            {LOGOS.map(({ Icon, name }) => (
              <div
                key={name}
                className="border-border/30 bg-foreground/3 flex shrink-0 items-center gap-3 rounded-xl border px-5 py-3 backdrop-blur-sm"
              >
                <Icon className="h-6 w-auto opacity-50 grayscale" />
                <span className="font-plex-mono text-muted-foreground/60 text-[10px] tracking-wider">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
