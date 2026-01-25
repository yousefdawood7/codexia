import { type Doc } from "@/../convex/_generated/dataModel";
import FadeOverlay from "@/components/FadeOverlay";
import CommandButton from "@/components/ui/CommandButton";
import ProjectListDesktop from "@/features/projects/components/ProjectListDesktop";
import ProjectListMobile from "@/features/projects/components/ProjectListMobile";
import ViewAllProjects from "@/features/projects/components/ViewAllProjects";
import { SCROLL_THRESHOLD } from "@/features/projects/constants";

type RecentProjectsListProps = {
  allProjects: Doc<"projects">[];
};

export default function RecentProjectsList({
  allProjects,
}: RecentProjectsListProps) {
  const slicedProjects = allProjects.slice(1);
  const showFade = slicedProjects.length > SCROLL_THRESHOLD;

  return (
    <div className="flex h-full flex-col gap-5">
      <header className="flex items-center justify-between">
        <h2 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Recent projects
        </h2>
        <nav className="flex items-center gap-2.5">
          <ViewAllProjects projects={allProjects} />
          <CommandButton operationString="⌘K" />
        </nav>
      </header>

      <div className="relative flex-1">
        <ProjectListMobile projects={slicedProjects} />
        <ProjectListDesktop projects={slicedProjects} />

        {showFade && <FadeOverlay />}
      </div>
    </div>
  );
}
