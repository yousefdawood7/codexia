import { LucideOctagonAlert } from "lucide-react";
import Placeholder from "@/components/Placeholder";

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center">
      <Placeholder
        title="Project Not Found"
        description="The project you are looking for does not exist"
        icon={LucideOctagonAlert}
        className="max-w-125"
      />
    </main>
  );
}
