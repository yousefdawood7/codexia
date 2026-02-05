import type { Metadata } from "next";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FooterSection from "@/components/landing/FooterSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Navbar from "@/components/landing/Navbar";
import PricingSection from "@/components/landing/PricingSection";
import { GradientDivider } from "@/components/ui/gradient-divider";

export const metadata: Metadata = {
  title: "Codexia — Build projects at the speed of thought",
  description:
    "An AI-powered project workspace. Create, import, and shape your ideas with an AI assistant that understands your vision. From zero to shipped — faster than ever.",
  openGraph: {
    title: "Codexia — Build projects at the speed of thought",
    description:
      "An AI-powered project workspace. Create, import, and shape your ideas with an AI assistant that understands your vision.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="font-poppins bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GradientDivider />
      <HowItWorksSection />
      <GradientDivider />
      <PricingSection />
      <GradientDivider />
      <FooterSection />
    </div>
  );
}
