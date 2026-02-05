import { Import, MessageSquare, RefreshCw, Shield } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mb-14 text-center md:mb-16">
          <h2 className="font-poppins text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need{" "}
            <span className="text-muted-foreground">to ship faster</span>
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
                className="group border-border bg-card hover:border-foreground/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <CardHeader>
                  <div className="bg-secondary mb-3 w-fit rounded-lg p-3">
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
