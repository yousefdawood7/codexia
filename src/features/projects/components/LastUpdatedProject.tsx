import Link from "next/link";
import { LucideArrowRight } from "lucide-react";
import { type Doc } from "@/../convex/_generated/dataModel";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { IMPORT_STATUS } from "@/features/projects/constants";
import { getFormattedTimeFromNow } from "@/lib/utils";

type LastUpdatedProjectProps = Doc<"projects">;

export default function LastUpdatedProject({
  _id,
  name,
  updatedAt,
  importStatus,
}: LastUpdatedProjectProps) {
  const ProjectIcon = IMPORT_STATUS[importStatus];

  return (
    <section className="space-y-3" aria-labelledby="last-updated-heading">
      <h2
        id="last-updated-heading"
        className="text-muted-foreground text-xs font-medium tracking-wider uppercase"
      >
        Last updated
      </h2>
      <Link href={`/project/${_id}`}>
        <ProjectCard
          title={name}
          footer={getFormattedTimeFromNow(updatedAt)}
          icon={<ProjectIcon className="size-7" />}
          operationContent={
            <LucideArrowRight
              className="text-muted-foreground"
              aria-hidden="true"
            />
          }
        />
      </Link>
    </section>
  );
}
