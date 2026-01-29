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
            <Link href={"/"} className="flex items-center gap-2">
              <CodexiaLogo
                width={50}
                height={50}
                title={{ text: "Codexia", className: "text-2xl font-semibold" }}
              />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="[&>svg]:size-7" />
        <BreadcrumbPage className="max-w-sm truncate text-xl">
          {projectName?.name || "Loading..."}
        </BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
