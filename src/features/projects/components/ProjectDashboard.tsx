"use client";

import { useQuery } from "convex/react";
import { LucideShieldAlert } from "lucide-react";
import { api } from "@/../convex/_generated/api";
import Placeholder from "@/components/Placeholder";
import { Spinner } from "@/components/ui/spinner";
import ActionCards from "@/features/projects/components/ActionCards";
import LastUpdatedProject from "@/features/projects/components/LastUpdatedProject";
import ProjectHeader from "@/features/projects/components/ProjectHeader";
import RecentProjectsList from "@/features/projects/components/RecentProjectsList";
import { cn } from "@/lib/utils";

export default function ProjectDashboard() {
  const projectItems = useQuery(api.projects.queries.getProjects, {});

  if (projectItems === undefined) {
    return (
      <section className="flex w-full max-w-187.5 flex-col gap-10">
        <ProjectHeader />
        <Placeholder
          title="Loading projects"
          description="We're still loading your projects, please wait..."
          icon={Spinner}
        />
      </section>
    );
  }

  // prettier-ignore
  if (!projectItems) 
    return null;

  if (!projectItems.length) {
    return (
      <section className="flex w-full max-w-187.5 flex-col gap-10">
        <ProjectHeader />
        <ActionCards />
        <Placeholder
          title="No projects yet"
          description="You haven't created any projects yet. Create your first project to get started"
          icon={LucideShieldAlert}
        />
      </section>
    );
  }

  const [lastUpdatedProject, ...restProjects] = projectItems;
  const hasRecentProjects = restProjects.length >= 1;

  return (
    <>
      <section
        className={cn(
          "mx-auto grid w-full max-w-187.5 items-start gap-10",
          "transition-all duration-300 ease-out",
          "lg:gap-12",
          hasRecentProjects
            ? "lg:max-w-5xl lg:grid-cols-[2fr_2.5fr]"
            : "lg:grid-cols-1",
        )}
      >
        <section
          className="flex flex-col gap-8 transition-all duration-300 ease-out"
          aria-label="Projects overview"
        >
          <ProjectHeader isLeft={hasRecentProjects} />
          <ActionCards />
          <LastUpdatedProject {...lastUpdatedProject} />
        </section>

        <section
          className={cn(
            "flex flex-col items-stretch overflow-hidden",
            "transition-all duration-300 ease-out",
            hasRecentProjects
              ? "translate-x-0 opacity-100"
              : "pointer-events-none hidden translate-x-8 opacity-0 lg:block",
          )}
          aria-label="Recent projects"
          aria-hidden={!hasRecentProjects}
        >
          {hasRecentProjects && (
            <RecentProjectsList allProjects={projectItems} />
          )}
        </section>
      </section>
    </>
  );
}
