import { Doc } from "@/../convex/_generated/dataModel";
import ProjectItem from "@/features/projects/components/ProjectItem";
import {
  IMPORT_STATUS,
  MOBILE_PROJECT_LIMIT,
} from "@/features/projects/constants";
import { getFormattedTime } from "@/lib/utils";

type ProjectListMobileProps = {
  projects: Doc<"projects">[];
};

export default function ProjectListMobile({
  projects,
}: ProjectListMobileProps) {
  return (
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
  );
}
