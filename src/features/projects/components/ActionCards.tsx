import { FaGithub as GithubIcon } from "react-icons/fa";
import { LucideSparkle } from "lucide-react";
import CommandButton from "@/components/ui/CommandButton";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { getShortcut } from "@/lib/utils";

export default function ActionCards() {
  return (
    <nav className="flex gap-3" role="group" aria-label="Quick actions">
      <ProjectCard
        type="project"
        icon={<LucideSparkle className="size-7" />}
        operationContent={
          <CommandButton operationString={getShortcut("NEW_PROJECT")} />
        }
        content="New"
      />
      <ProjectCard
        icon={<GithubIcon className="size-7" />}
        operationContent={
          <CommandButton operationString={getShortcut("IMPORT")} />
        }
        content="Import"
      />
    </nav>
  );
}
