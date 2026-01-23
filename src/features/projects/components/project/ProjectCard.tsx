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
  compact?: boolean;
};

export default function ProjectCard({
  icon,
  type,
  title,
  content,
  footer,
  operationContent,
  compact = false,
}: ProjectCardProps) {
  const createOptimisticProject = useOptimisticProject(
    api.functions.createProject,
  );

  return (
    <Item
      variant={"outline"}
      className={cn(
        "bg-accent hover:bg-accent/60 flex w-full transition-colors",
        footer ? "" : compact ? "gap-2" : "gap-10",
      )}
      onClick={
        type === "project"
          ? () =>
              createOptimisticProject({ projectName: generateRandomNames() })
          : undefined
      }
    >
      <ItemHeader className="flex justify-between">
        <aside className="flex items-center gap-2">
          {icon}
          {title && (
            <p className={cn(compact ? "text-lg" : "text-xl")}>{title}</p>
          )}
        </aside>
        {operationContent}
      </ItemHeader>

      {footer ? (
        <ItemFooter
          className={cn(
            "text-muted-foreground",
            compact ? "text-base" : "text-lg",
          )}
        >
          {footer}
        </ItemFooter>
      ) : (
        <ItemContent
          className={cn("font-semibold", compact ? "text-lg" : "text-xl")}
        >
          asdasdasdasdasdasdasdasdasd
          {content}
        </ItemContent>
      )}
    </Item>
  );
}
