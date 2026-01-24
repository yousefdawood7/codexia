import { type Doc } from "@/../convex/_generated/dataModel";
import CommandButton from "@/components/ui/CommandButton";
import ProjectItem from "@/features/projects/components/ProjectItem";
import ViewAllProjects from "@/features/projects/components/ViewAllProjects";
import { IMPORT_STATUS } from "@/features/projects/constants";
import { getFormattedTime } from "@/lib/utils";

type RecentProjectsListProps = {
  projects: Doc<"projects">[];
  allProjects: Doc<"projects">[];
};

const MOBILE_PROJECT_LIMIT = 5;
const SCROLL_THRESHOLD = 5;

export default function RecentProjectsList({
  projects,
  allProjects,
}: RecentProjectsListProps) {
  const showFade = projects.length > SCROLL_THRESHOLD;

  return (
    <div className="flex h-full flex-col gap-5">
      <header className="flex items-center justify-between">
        <h2 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Recent projects
        </h2>
        <div className="flex items-center gap-2.5">
          <ViewAllProjects projects={allProjects} />
          <CommandButton operationString="⌘K" />
        </div>
      </header>

      <div className="relative flex-1">
        <ul className="space-y-2 lg:hidden" role="list">
          {projects.slice(0, MOBILE_PROJECT_LIMIT).map((project) => (
            <li key={project._id}>
              <ProjectItem
                icon={IMPORT_STATUS[project.importStatus]}
                title={project.name}
                content={getFormattedTime(project.updatedAt)}
              />
            </li>
          ))}
        </ul>

        {/* Desktop: Scrollable with optional fade */}
        <ul
          className="hidden max-h-[400px] space-y-2 overflow-y-auto pr-2 lg:block"
          role="list"
        >
          {projects.map((project) => (
            <li key={project._id}>
              <ProjectItem
                icon={IMPORT_STATUS[project.importStatus]}
                title={project.name}
                content={getFormattedTime(project.updatedAt)}
              />
            </li>
          ))}
        </ul>

        {/* Fade overlay - only on desktop and when there are enough projects */}
        {showFade && (
          <div
            className="from-background pointer-events-none absolute inset-x-0 bottom-0 hidden h-16 bg-gradient-to-t to-transparent lg:block"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
