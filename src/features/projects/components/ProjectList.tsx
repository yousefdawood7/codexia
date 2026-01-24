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
import { IMPORT_STATUS } from "@/features/projects/constants";
import { getFormattedTime } from "@/lib/utils";

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

  const [lastUpdatedProject, ...restProjects] = projectItems.slice(0, 10);
  console.log(restProjects);

  return (
    <>
      <LastUpdatedProject {...lastUpdatedProject} />

      {restProjects.length >= 1 && (
        <section
          className="space-y-5"
          aria-labelledby="recent-projects-heading"
        >
          <header className="flex items-center justify-between">
            <h2
              id="recent-projects-heading"
              className="text-muted-foreground text-xs font-medium tracking-wider uppercase"
            >
              Recent projects
            </h2>
            <div className="flex items-center gap-2.5">
              <ViewAllProjects projects={projectItems} />
              <CommandButton operationString="⌘K" />
            </div>
          </header>
          <ul className="space-y-2" role="list">
            {restProjects.map((project) => (
              <li key={project._id}>
                <ProjectItem
                  icon={IMPORT_STATUS[project.importStatus]}
                  title={project.name}
                  content={getFormattedTime(project.updatedAt)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
