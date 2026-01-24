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
    api.functions.createProject,
  );

  return (
    <Item
      variant={"outline"}
      className={cn(
        "bg-accent hover:bg-accent/60 flex w-full transition-colors",
        footer ? "" : "gap-10",
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
          {title && <p className="text-xl">{title}</p>}
        </aside>
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
