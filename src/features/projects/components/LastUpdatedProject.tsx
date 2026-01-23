import { LucideArrowRight, LucideGlobe } from "lucide-react";
import { type Doc } from "@/../convex/_generated/dataModel";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { getCurrentDate, getFormatedTime } from "@/lib/utils";

type LastUpdatedProjectProps = Doc<"projects">;

export default function LastUpdatedProject({
  name,
  updatedAt,
}: LastUpdatedProjectProps) {
  return (
    <section className="space-y-2">
      <p className="text-muted-foreground text-lg">Last updated</p>
      <ProjectCard
        title={name}
        footer={getFormatedTime(updatedAt, getCurrentDate())}
        icon={<LucideGlobe />}
        operationContent={<LucideArrowRight />}
      />
    </section>
  );
}
