"use client";

import { useRef } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowRight } from "lucide-react";
import RadialGlow from "@/components/RadialGlow";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function CTABannerSection() {
  const sectionRef = useRef<HTMLElement>(null!);
  const headingRef = useRef<HTMLHeadingElement>(null!);
  const subRef = useRef<HTMLParagraphElement>(null!);
  const ctaRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      if (!sectionRef.current || !headingRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(headingRef.current!, {
          type: "lines",
        });

        gsap.set(split.lines, {
          filter: "blur(12px)",
          yPercent: 20,
          autoAlpha: 0,
        });

        if (subRef.current) {
          gsap.set(subRef.current, { autoAlpha: 0, y: 12 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 12 });
        }

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        tl.to(split.lines, {
          filter: "blur(0px)",
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
        });

        if (subRef.current) {
          tl.to(subRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.4");
        }
        if (ctaRef.current) {
          tl.to(
            ctaRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.25",
          );
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-noise bg-foreground text-background relative overflow-hidden py-24 md:py-32"
    >
      {/* Atmospheric grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />
      <RadialGlow />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2
          ref={headingRef}
          className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          Ready to build at the{" "}
          <span className="font-extralight opacity-60">speed of thought?</span>
        </h2>

        <p
          ref={subRef}
          className="mx-auto mt-5 max-w-lg text-base leading-relaxed font-light opacity-60 sm:text-lg"
        >
          Join developers who ship faster with AI. Start for free — no credit
          card required.
        </p>

        <div
          ref={ctaRef}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <SignedOut>
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="group border-background/20 bg-background/10 text-background hover:bg-background/20 rounded-2xl border px-8 text-base backdrop-blur-sm transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button
              size="lg"
              className="group border-background/20 bg-background/10 text-background hover:bg-background/20 rounded-2xl border px-8 text-base backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </SignedIn>
        </div>
      </div>
    </section>
  );
}
