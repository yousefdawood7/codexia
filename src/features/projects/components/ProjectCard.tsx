"use client";

import { api } from "@/../convex/_generated/api";
import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
} from "@/components/ui/item";
import { useOptimisticProject } from "@/features/projects/hooks/useOptimisticProject";
import { cn, generateRandomNames } from "@/lib/utils";

type ProjectCardProps = {
  icon: React.ReactElement;
  type?: string;
  title?: string;
  footer?: string;
  content?: string;
  operationContent: React.ReactElement;
};

export default function ProjectCard({
  icon,
  type,
  title,
  content,
  footer,
  operationContent,
}: ProjectCardProps) {
  const createOptimisticProject = useOptimisticProject(
    api.projects.mutations.createProject,
  );

  const handleCreateProject = () => {
    createOptimisticProject({ projectName: generateRandomNames() });
  };

  return (
    <Item
      variant="outline"
      onClick={type === "project" ? handleCreateProject : undefined}
      role={type === "project" ? "button" : undefined}
      className={cn(
        "bg-card hover:bg-accent flex w-full transition-colors duration-200 hover:border-white/20",
        !footer && "gap-10",
      )}
      aria-label={
        type === "project" ? "Create new project" : "Import from GitHub"
      }
    >
      <ItemHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          {icon}
          {title && <span className="text-xl">{title}</span>}
        </div>
        {operationContent}
      </ItemHeader>

      {footer ? (
        <ItemFooter className="text-muted-foreground text-lg">
          {footer}
        </ItemFooter>
      ) : (
        <ItemContent className="text-xl font-semibold">{content}</ItemContent>
      )}
    </Item>
  );
}
