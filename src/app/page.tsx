import { FaGithub as GithubIcon } from "react-icons/fa";
import { LucideArrowRight, LucideGlobe, LucideSparkle } from "lucide-react";
import CommandButton from "@/components/ui/CommandButton";
import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectHeader from "@/features/projects/components/ProjectHeader";
import ProjectList from "@/features/projects/components/ProjectList";

export default function Page() {
  return (
    <main className="bg-muted font-poppins flex min-h-svh flex-col items-center justify-center">
      <section className="flex w-full max-w-[750px] flex-col gap-7 px-5">
        <ProjectHeader />
        <section className="flex w-full gap-2.5">
          <ProjectCard
            icon={<LucideSparkle className="size-7" />}
            operation={<CommandButton operationString="⌘J" />}
            content="New"
          />
          <ProjectCard
            icon={<GithubIcon className="size-7" />}
            operation={<CommandButton operationString="⌘I" />}
            content="Import"
          />
        </section>
        <section className="space-y-2">
          <p className="text-muted-foreground text-lg">Last updated</p>
          <ProjectCard
            title="Dummy Data"
            footer="Dummy Updated"
            icon={<LucideGlobe />}
            operation={<LucideArrowRight />}
          />
        </section>
        <section>
          <ProjectList />
        </section>
      </section>
    </main>
  );
}
