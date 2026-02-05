import Link from "next/link";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  highlighted?: boolean;
}

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/ month",
    description: "Perfect for getting started with your first projects.",
    features: [
      { text: "Up to 3 projects", included: true },
      { text: "Basic AI chat", included: true },
      { text: "100 imports / month", included: true },
      { text: "Community support", included: true },
      { text: "Advanced AI models", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month",
    description: "For makers who need unlimited power and speed.",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced AI models", included: true },
      { text: "Unlimited imports", included: true },
      { text: "Priority support", included: true },
      { text: "URL import & scraping", included: true },
      { text: "Custom domains", included: true },
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/ month",
    description: "For teams that build together at scale.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Up to 10 team members", included: true },
      { text: "Admin dashboard", included: true },
      { text: "SSO & SAML", included: true },
      { text: "Audit logs", included: true },
      { text: "Dedicated support", included: true },
    ],
    cta: "Contact Sales",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-14 text-center md:mb-16">
          <h2 className="font-poppins text-3xl font-bold tracking-tight md:text-4xl">
            Simple, transparent{" "}
            <span className="text-muted-foreground">pricing</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl md:text-lg">
            No hidden fees. No surprises. Start free, upgrade when you&apos;re
            ready.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={tier.highlighted ? "md:scale-[1.03]" : ""}
            >
              <Card
                className={`relative flex h-full flex-col transition-all duration-300 ${
                  tier.highlighted
                    ? "border-foreground/20 shadow-lg"
                    : "border-border"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="font-plex-mono text-xs tracking-wide">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-2">
                  <CardDescription className="text-foreground/70 text-sm font-medium">
                    {tier.name}
                  </CardDescription>
                  <CardTitle className="flex items-baseline gap-1.5">
                    <span className="font-poppins text-4xl font-bold">
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {tier.period}
                    </span>
                  </CardTitle>
                  <p className="text-muted-foreground pt-1 text-sm">
                    {tier.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature.text}
                        className="flex items-center gap-3"
                      >
                        {feature.included ? (
                          <Check className="text-foreground size-4 shrink-0" />
                        ) : (
                          <X className="text-muted-foreground/40 size-4 shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground/50"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <Button
                        variant={tier.highlighted ? "default" : "outline"}
                        className="w-full"
                        size="lg"
                      >
                        {tier.cta}
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <Button
                      variant={tier.highlighted ? "default" : "outline"}
                      className="w-full"
                      size="lg"
                      asChild
                    >
                      <Link href="/dashboard">{tier.cta}</Link>
                    </Button>
                  </SignedIn>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
