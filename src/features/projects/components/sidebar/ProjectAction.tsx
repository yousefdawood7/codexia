"use client";

import { Button } from "@/components/ui/button";
import CommandButton from "@/components/ui/CommandButton";
import { useOptimisticProject } from "@/features/projects/hooks/useOptimisticProject";
import { generateRandomNames } from "@/lib/utils";

import { api } from "../../../../../convex/_generated/api";

type ProjectActionProps = {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  type?: "project";
};

export default function ProjectAction({
  type,
  icon,
  label,
  shortcut,
}: ProjectActionProps) {
  const createOptimisticProject = useOptimisticProject(
    api.functions.createProject,
  );

  return (
    <Button
      variant="ghost"
      className={`text-muted-foreground hover:text-foreground h-9 w-full justify-start gap-2.5 px-3 text-sm`}
      onClick={
        type === "project"
          ? () =>
              createOptimisticProject({ projectName: generateRandomNames() })
          : undefined
      }
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {shortcut && <CommandButton operationString={shortcut} />}
    </Button>
  );
}
