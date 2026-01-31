"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import CodexiaLogo from "@/components/CodexiaLogo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

type EditorBreadcrumbProps = {
  projectId: Id<"projects">;
};

export default function EditorBreadcrumb({ projectId }: EditorBreadcrumbProps) {
  const projectName = useQuery(api.projects.queries.getProjectById, {
    projectId,
  });

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
        <BreadcrumbPage className="max-w-sm truncate text-xl font-semibold">
          {projectName?.name || "Loading..."}
        </BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
