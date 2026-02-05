"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(SplitText, useGSAP);

// Dynamic import — Three.js Canvas requires browser APIs, cannot SSR
const NeuralShaderBackground = dynamic(
  () => import("@/components/landing/HeroShaderBg"),
  { ssr: false },
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      // Respect reduced-motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(headerRef.current!, {
          type: "lines",
          wordsClass: "lines",
        });

        gsap.set(split.lines, {
          filter: "blur(16px)",
          yPercent: 30,
          autoAlpha: 0,
          scale: 1.06,
          transformOrigin: "50% 100%",
        });

        if (badgeRef.current) {
          gsap.set(badgeRef.current, { autoAlpha: 0, y: -8 });
        }
        if (paraRef.current) {
          gsap.set(paraRef.current, { autoAlpha: 0, y: 8 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
        }

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        if (badgeRef.current) {
          tl.to(badgeRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.0);
        }

        tl.to(
          split.lines,
          {
            filter: "blur(0px)",
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
          },
          0.1,
        );

        if (paraRef.current) {
          tl.to(
            paraRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.55",
          );
        }
        if (ctaRef.current) {
          tl.to(
            ctaRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.35",
          );
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-background relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* CPPN Shader Background */}
      <NeuralShaderBackground />

      {/* Content — centered */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center sm:gap-8">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
        >
          <span className="font-plex-mono text-[10px] font-light tracking-[0.08em] text-white/70 uppercase">
            AI-Powered
          </span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span className="text-xs font-light tracking-tight text-white/80">
            Workspace
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headerRef}
          className="font-poppins text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Build projects at the{" "}
          <span className="font-extralight text-white/60">
            speed of thought.
          </span>
        </h1>

        {/* Tagline */}
        <p
          ref={paraRef}
          className="max-w-xl text-base leading-relaxed font-light tracking-tight text-white/70 sm:text-lg"
        >
          Create, import, and shape your ideas with an AI assistant that
          understands your vision. From zero to shipped — faster than ever.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <SignedOut>
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="cursor-pointer rounded-2xl border border-white/10 bg-white/10 px-8 text-base text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
              >
                Start Building — Free
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button
              size="lg"
              className="cursor-pointer rounded-2xl border border-white/10 bg-white/10 px-8 text-base text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
              asChild
            >
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </SignedIn>
          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer rounded-2xl border border-white/10 bg-transparent text-base text-white/80 transition-colors duration-300 hover:bg-white/5 hover:text-white"
            asChild
          >
            <a href="#how-it-works">See How It Works</a>
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t to-transparent" />
    </section>
  );
}
