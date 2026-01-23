"use client";

import { SignInButton } from "@clerk/nextjs";
import { Unauthenticated as UnauthenticatedClerk } from "convex/react";
import { LucideShieldAlert } from "lucide-react";
import Placeholder from "@/components/Placeholder";

export default function Unauthenticated() {
  return (
    <UnauthenticatedClerk>
      <section className="flex min-h-svh items-center justify-center px-1.5">
        <Placeholder
          title="Unauthorized Access"
          description="You do not have the necessary permissions to access this page"
          icon={LucideShieldAlert}
          button={<SignInButton>Sign In</SignInButton>}
        />
      </section>
    </UnauthenticatedClerk>
  );
}
