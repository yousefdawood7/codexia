"use client";

import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { useQuery } from "convex/react";
import { LucideCloudCheck, LucideLoader } from "lucide-react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import CodexiaLogo from "@/components/CodexiaLogo";
import Tooltip from "@/components/Tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useOptimisticRenameProject } from "@/features/projects/hooks/useOptimisticRenameProject";
import { cn, getFormattedTimeFromNow } from "@/lib/utils";

type EditorBreadcrumbProps = {
  projectId: Id<"projects">;
};

export default function EditorBreadcrumb({ projectId }: EditorBreadcrumbProps) {
  const [isRenameActive, setIsRenameActive] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const renameProject = useOptimisticRenameProject(
    api.projects.mutations.renameProject,
  );

  const project = useQuery(api.projects.queries.getProjectById, {
    projectId,
  });

  function handleIsActive() {
    flushSync(() => {
      setIsRenameActive(true);
    });

    ref.current?.focus();
    ref.current?.select();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // prettier-ignore
    if (e.key !== "Enter" && e.key !== "Escape")
      return;

    if (e.key === "Enter")
      renameProject({ projectId, newName: e.currentTarget.value });

    setIsRenameActive(false);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setIsRenameActive(false);
    renameProject({ projectId, newName: e.target.value });
  }

  const ProjectNameRename = (
    <input
      type="text"
      className="block text-xl font-semibold"
      defaultValue={project?.name}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      ref={ref}
    />
  );

  const projectNameButton = (
    <div className="flex items-center gap-2.5">
      <Button
        variant={"ghost"}
        className="p-0 text-xl font-semibold hover:bg-transparent!"
        onClick={handleIsActive}
      >
        {project?.name}
      </Button>

      {project?.importStatus === "IMPORTING" && (
        <Tooltip
          icon={<LucideLoader className="size-5 animate-spin" />}
          content="Importing"
        />
      )}

      {project?.importStatus === "COMPLETED" && (
        <Tooltip
          icon={<LucideCloudCheck className="size-5" />}
          content={getFormattedTimeFromNow(project.updatedAt)}
        />
      )}
    </div>
  );

  const projectOperation = isRenameActive
    ? ProjectNameRename
    : projectNameButton;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href={"/"}
              className="hover:bg-accent/50 flex items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors"
            >
              <CodexiaLogo
                width={45}
                height={45}
                title={{
                  text: "Codexia",
                  className: "text-2xl font-semibold text-foreground",
                }}
              />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="[&>svg]:size-7" />
        <BreadcrumbPage
          // the last check to prevent the truncate from hiding form's ring
          className={cn("max-w-sm", !isRenameActive && "truncate")}
        >
          {project?.name ? (
            projectOperation
          ) : (
            <span className="text-xl font-semibold">Loading...</span>
          )}
        </BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
