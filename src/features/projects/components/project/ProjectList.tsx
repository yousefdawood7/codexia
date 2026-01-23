"use client";

import { useQuery } from "convex/react";
import { LucideShieldAlert } from "lucide-react";
import { api } from "@/../convex/_generated/api";
import Placeholder from "@/components/Placeholder";
import CommandButton from "@/components/ui/CommandButton";
import { Spinner } from "@/components/ui/spinner";
import ProjectItem from "@/features/projects/components/project/ProjectItem";
import ProjectCommandPalette from "@/features/projects/components/ProjectCommandPalette";
import { IMPORT_STATUS } from "@/features/projects/constants";
import { getFormattedTime } from "@/lib/utils";

export default function ProjectList() {
  const projectItems = useQuery(api.functions.getProjects, {});

  if (projectItems === undefined)
    return (
      <section className="flex h-64 items-center justify-center">
        <Placeholder
          title="Loading projects"
          description="We're still loading your projects, please wait..."
          icon={Spinner}
        />
      </section>
    );

  if (!projectItems) return null;

  if (!projectItems.length)
    return (
      <section className="flex h-64 items-center justify-center">
        <Placeholder
          title="No projects yet"
          description="You haven't created any projects yet. Create your first project to get started"
          icon={LucideShieldAlert}
        />
      </section>
    );

  const [lastUpdatedProject, ...restProjects] = projectItems.slice(0, 7);

  return (
    <section className="space-y-8">
      {/* Featured Project - Continue Working */}
      <section
        aria-labelledby="featured-project-heading"
        className="flex flex-col gap-2.5"
      >
        <header>
          <h3
            id="featured-project-heading"
            className="text-muted-foreground text-sm font-medium tracking-wider uppercase"
          >
            Continue Working
          </h3>
        </header>
        <ProjectItem
          icon={IMPORT_STATUS[lastUpdatedProject.importStatus]}
          title={lastUpdatedProject.name}
          description={`Last edited ${getFormattedTime(lastUpdatedProject.updatedAt)}`}
          featured
        />
      </section>

      {/* Recent Projects Grid */}
      {restProjects.length >= 1 && (
        <section
          aria-labelledby="recent-projects-heading"
          className="flex flex-col gap-1.5"
        >
          <header className="flex items-center justify-between">
            <h3
              id="recent-projects-heading"
              className="text-muted-foreground text-sm font-medium tracking-wider uppercase"
            >
              Recent Projects
            </h3>
            <nav
              className="flex items-center gap-2"
              aria-label="Project actions"
            >
              <ProjectCommandPalette projects={projectItems} />
              <CommandButton operationString="⌘K" />
            </nav>
          </header>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {restProjects.map((project) => (
              <li key={project._id}>
                <ProjectItem
                  icon={IMPORT_STATUS[project.importStatus]}
                  title={project.name}
                  description={getFormattedTime(project.updatedAt)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
