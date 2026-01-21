import { FaGithub as GithubIcon } from "react-icons/fa";
import { LucideArrowRight, LucideGlobe, LucideSparkle } from "lucide-react";
import CommandButton from "@/components/ui/CommandButton";
import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectHeader from "@/features/projects/components/ProjectHeader";

export default function Page() {
  return (
    <main className="min-h-svh bg-muted flex flex-col justify-center items-center font-poppins">
      <section className="max-w-[750px] w-full flex flex-col gap-7">
        <ProjectHeader />

        <section className="flex gap-2.5 w-full ">
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
      </section>
    </main>
  );
}
