"use client";

import { FaGithub as GithubIcon } from "react-icons/fa";
import { useQuery } from "convex/react";
import { LucideShieldAlert, LucideSparkle } from "lucide-react";
import { api } from "@/../convex/_generated/api";
import Placeholder from "@/components/Placeholder";
import CommandButton from "@/components/ui/CommandButton";
import { Spinner } from "@/components/ui/spinner";
import LastUpdatedProject from "@/features/projects/components/LastUpdatedProject";
import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectHeader from "@/features/projects/components/ProjectHeader";
import RecentProjectsList from "@/features/projects/components/RecentProjectsList";
import { cn } from "@/lib/utils";

export default function Page() {
  const projectItems = useQuery(api.functions.getProjects, {});

  if (projectItems === undefined) {
    return (
      <main className="bg-background font-poppins flex min-h-svh flex-col items-center justify-center gap-10 p-5">
        <header>
          <ProjectHeader />
        </header>
        <Placeholder
          title="Loading projects"
          description="We're still loading your projects, please wait..."
          icon={Spinner}
        />
      </main>
    );
  }

  if (!projectItems) {
    return null;
  }

  if (!projectItems.length) {
    return (
      <main className="bg-background font-poppins flex min-h-svh flex-col items-center justify-center p-5">
        <div className="w-full max-w-[750px]">
          <div className="mb-10">
            <ProjectHeader />
          </div>
          <div
            className="mb-10 flex gap-3"
            role="group"
            aria-label="Quick actions"
          >
            <ProjectCard
              type="project"
              icon={<LucideSparkle className="size-7" />}
              operationContent={<CommandButton operationString="⌘J" />}
              content="New"
            />
            <ProjectCard
              icon={<GithubIcon className="size-7" />}
              operationContent={<CommandButton operationString="⌘I" />}
              content="Import"
            />
          </div>
          <Placeholder
            title="No projects yet"
            description="You haven't created any projects yet. Create your first project to get started"
            icon={LucideShieldAlert}
          />
        </div>
      </main>
    );
  }

  const [lastUpdatedProject, ...restProjects] = projectItems;
  const hasRecentProjects = restProjects.length >= 1;

  return (
    <main className="bg-background font-poppins flex min-h-svh items-center justify-center p-5">
      <div
        className={cn(
          "mx-auto grid w-full max-w-[750px] items-start gap-10",
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
          <ProjectHeader isCenter={projectItems.length === 1} />

          <nav className="flex gap-3" role="group" aria-label="Quick actions">
            <ProjectCard
              type="project"
              icon={<LucideSparkle className="size-7" />}
              operationContent={<CommandButton operationString="⌘J" />}
              content="New"
            />
            <ProjectCard
              icon={<GithubIcon className="size-7" />}
              operationContent={<CommandButton operationString="⌘I" />}
              content="Import"
            />
          </nav>
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
            <RecentProjectsList
              projects={restProjects}
              allProjects={projectItems}
            />
          )}
        </section>
      </div>
    </main>
  );
}
