"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import CodexiaLogo from "@/components/CodexiaLogo";
import { Button } from "@/components/ui/button";
import { useNavScroll } from "@/hooks/useNavScroll";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
] as const;

export default function Navbar() {
  const scrolled = useNavScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    // prettier-ignore
    if (mobileOpen) 
      document.body.style.overflow = "hidden";
    else 
      document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 border-border border-b backdrop-blur-md"
            : "border-none bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <CodexiaLogo width={28} height={28} />
            <span className="font-poppins text-foreground text-lg font-semibold">
              Codexia
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Button key={link.href} variant="ghost" size="sm" asChild>
                <a
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              </Button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden min-w-27.5 items-center justify-end gap-3 md:flex">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-background/95 fixed inset-0 z-40 pt-20 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-poppins text-foreground hover:text-muted-foreground text-xl font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-4 w-full max-w-xs">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button className="w-full" size="lg">
                      Get Started
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
