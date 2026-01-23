"use client";

import { LucidePlus } from "lucide-react";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useOptimisticProject } from "@/features/projects/hooks/useOptimisticProject";
import { generateRandomNames } from "@/lib/utils";

export default function StickyProjectHeader() {
  const handleCreateProject = useOptimisticProject(api.functions.createProject);

  return (
    <header className="bg-background/80 sticky top-0 z-10 flex items-center justify-between border-b border-white/5 px-8 py-4 backdrop-blur-sm">
      <div>
        <h2 className="text-xl font-semibold">Projects</h2>
        <p className="text-muted-foreground text-sm">
          Manage and organize your projects
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() =>
          handleCreateProject({ projectName: generateRandomNames() })
        }
      >
        <LucidePlus className="size-4" />
        New Project
      </Button>
    </header>
  );
}
