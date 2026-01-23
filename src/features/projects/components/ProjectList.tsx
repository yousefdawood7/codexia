"use client";

import { useQuery } from "convex/react";
import { LucideShieldAlert } from "lucide-react";
import { api } from "@/../convex/_generated/api";
import Placeholder from "@/components/Placeholder";
import CommandButton from "@/components/ui/CommandButton";
import { Spinner } from "@/components/ui/spinner";
import LastUpdatedProject from "@/features/projects/components/LastUpdatedProject";
import ProjectItem from "@/features/projects/components/ProjectItem";
import ViewAllProjects from "@/features/projects/components/ViewAllProjects";
import { getCurrentDate, getFormattedTime } from "@/lib/utils";

export default function ProjectList() {
  const projectItems = useQuery(api.functions.getProjects, {});

  if (projectItems === undefined)
    return (
      <Placeholder
        title="Loading projects"
        description="We're still loading your projects, please wait..."
        icon={Spinner}
      />
    );

  // prettier-ignore
  if (!projectItems)
    return;

  if (!projectItems.length)
    return (
      <Placeholder
        title="No projects yet"
        description="You haven't created any projects yet. Create your first project to get started"
        icon={LucideShieldAlert}
      />
    );

  const [lastUpdatedProject] = projectItems.slice(0, 1);
  const restProjects = projectItems.slice(1, 5);

  return (
    <>
      <LastUpdatedProject {...lastUpdatedProject} />

      {!!restProjects.length && (
        <section className="space-y-5">
          <aside className="flex items-center justify-between">
            <p className="text-muted-foreground text-lg">Recent projects</p>
            <section className="flex items-center gap-2.5">
              <ViewAllProjects projects={projectItems} />
              <CommandButton operationString="⌘K" />
            </section>
          </aside>

          {restProjects.map((project) => (
            <ProjectItem
              key={project._id}
              icon={Spinner}
              title={project.name}
              content={getFormattedTime(project.updatedAt, getCurrentDate())}
            />
          ))}
        </section>
      )}
    </>
  );
}
