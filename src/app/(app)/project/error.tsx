"use client";

import { LucideShieldAlert } from "lucide-react";
import Placeholder from "@/components/Placeholder";

export default function Error() {
  return (
    <main className="flex min-h-svh items-center justify-center">
      <Placeholder
        title="Unauthorized Access"
        description="You do not have the necessary permissions to access this page"
        icon={LucideShieldAlert}
        className="max-w-125"
      />
    </main>
  );
}
