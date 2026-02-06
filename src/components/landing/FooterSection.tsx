import Link from "next/link";
import { Github } from "lucide-react";
import CodexiaLogo from "@/components/CodexiaLogo";
import { Separator } from "@/components/ui/separator";

const PRODUCT_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
] as const;

const COMPANY_LINKS = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
] as const;

export default function FooterSection() {
  return (
    <footer className="bg-noise relative">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <CodexiaLogo width={24} height={24} />
              <span className="font-poppins text-foreground text-base font-semibold">
                Codexia
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Build projects at the speed of thought. An AI-powered workspace
              for makers who move fast.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-plex-mono text-muted-foreground mb-4 text-[10px] font-medium tracking-[0.2em] uppercase">
              Product
            </h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group/link text-muted-foreground hover:text-foreground relative text-sm transition-colors"
                  >
                    {link.label}
                    <span className="bg-foreground absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover/link:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-plex-mono text-muted-foreground mb-4 text-[10px] font-medium tracking-[0.2em] uppercase">
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group/link text-muted-foreground hover:text-foreground relative text-sm transition-colors"
                  >
                    {link.label}
                    <span className="bg-foreground absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover/link:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-plex-mono text-muted-foreground mb-4 text-[10px] font-medium tracking-[0.2em] uppercase">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group/link text-muted-foreground hover:text-foreground relative text-sm transition-colors"
                  >
                    {link.label}
                    <span className="bg-foreground absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover/link:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Codexia. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="font-plex-mono text-muted-foreground/50 text-[10px] tracking-wider">
              Built with Next.js &amp; Convex
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
