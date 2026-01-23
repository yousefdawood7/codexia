import { LucideArrowRight } from "lucide-react";
import { type Doc } from "@/../convex/_generated/dataModel";
import ProjectCard from "@/features/projects/components/project/ProjectCard";
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
      <h3 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
        Continue Working
      </h3>
      <ProjectCard
        title={name}
        footer={getFormattedTime(updatedAt)}
        icon={<ProjectIcon />}
        operationContent={
          <LucideArrowRight className="text-muted-foreground" />
        }
      />
    </section>
  );
}
