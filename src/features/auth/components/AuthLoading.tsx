"use client";

import { AuthLoading as AuthLoadingClerk } from "convex/react";
import { Spinner } from "@/components/ui/spinner";

export default function AuthLoading() {
  return (
    <AuthLoadingClerk>
      <section className="flex min-h-svh items-center justify-center px-1.5">
        <Spinner className="size-12" />
      </section>
    </AuthLoadingClerk>
  );
}
