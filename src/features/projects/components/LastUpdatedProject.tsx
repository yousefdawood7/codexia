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
    <section className="space-y-2">
      <p className="text-muted-foreground text-lg">Last updated</p>
      <ProjectCard
        title={name}
        footer={getFormattedTime(updatedAt)}
        icon={<ProjectIcon className="size-7" />}
        operationContent={
          <LucideArrowRight className="text-muted-foreground" />
        }
      />
    </section>
  );
}
