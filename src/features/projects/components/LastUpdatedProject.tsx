import { LucideArrowRight } from "lucide-react";
import { type Doc } from "@/../convex/_generated/dataModel";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { IMPORT_STATUS } from "@/features/projects/constants";
import { getFormattedTime } from "@/lib/utils";

type LastUpdatedProjectProps = Doc<"projects">;

export default function LastUpdatedProject({
  name,
  updatedAt,
  importStatus,
}: LastUpdatedProjectProps) {
  const ProjectIcon = IMPORT_STATUS[importStatus];

  return (
    <section className="space-y-3" aria-labelledby="last-updated-heading">
      <h2
        id="last-updated-heading"
        className="text-muted-foreground text-xs font-medium uppercase tracking-wider"
      >
        Last updated
      </h2>
      <ProjectCard
        title={name}
        footer={getFormattedTime(updatedAt)}
        icon={<ProjectIcon className="size-7" />}
        operationContent={
          <LucideArrowRight className="text-muted-foreground" aria-hidden="true" />
        }
      />
    </section>
  );
}
