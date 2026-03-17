"use client";

import { ConvexError } from "convex/values";
import { LucideShieldAlert } from "lucide-react";
import Placeholder from "@/components/Placeholder";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <main className="flex min-h-svh items-center justify-center">
      <Placeholder
        title={
          error instanceof ConvexError
            ? error.data.message
            : error.message || "Unauthorized Access"
        }
        description={
          error instanceof ConvexError
            ? error.data.cause || ""
            : typeof error.cause === "string"
              ? error.cause
              : "You do not have permission to access this project."
        }
        icon={LucideShieldAlert}
        className="max-w-125"
      />
    </main>
  );
}
