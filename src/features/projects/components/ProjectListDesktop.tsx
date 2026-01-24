import { Doc } from "@/../convex/_generated/dataModel";
import ProjectItem from "@/features/projects/components/ProjectItem";
import { IMPORT_STATUS } from "@/features/projects/constants";
import { getFormattedTime } from "@/lib/utils";

type ProjectListDesktopProps = {
  projects: Doc<"projects">[];
};

export default function ProjectListDesktop({
  projects,
}: ProjectListDesktopProps) {
  return (
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
  );
}
