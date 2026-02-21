"use client";

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
        title={error.message || "Unauthorized Access"}
        description={
          (error.cause as string) ||
          "You do not have permission to access this project."
        }
        icon={LucideShieldAlert}
        className="max-w-125"
      />
    </main>
  );
}
