import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import CodexiaLogo from "@/components/CodexiaLogo";
import FooterLinks, { type Link as LinkType } from "@/components/FooterLinks";
import { Separator } from "@/components/ui/separator";

const PRODUCT_LINKS: LinkType[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const COMPANY_LINKS: LinkType[] = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
];

const LEGAL_LINKS: LinkType[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function FooterSection() {
  return (
    <footer className="bg-noise relative">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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

          {FooterLinks({ title: "Product", links: PRODUCT_LINKS })}
          {FooterLinks({ title: "Resources", links: COMPANY_LINKS })}
          {FooterLinks({ title: "Legal", links: LEGAL_LINKS })}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground/50 text-sm tracking-wider">
              Built by Yousef Dawood
            </span>
            <a
              href="https://x.com/YousefDawood16"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="size-4" />
            </a>
          </div>
          <p className="text-muted-foreground/40 text-sm">
            &copy; {new Date().getFullYear()} Codexia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
