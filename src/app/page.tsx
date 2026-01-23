import { FaGithub as GithubIcon } from "react-icons/fa";
import { SignInButton } from "@clerk/nextjs";
import { LucideSparkle } from "lucide-react";
import CommandButton from "@/components/ui/CommandButton";
import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectHeader from "@/features/projects/components/ProjectHeader";
import ProjectList from "@/features/projects/components/ProjectList";

export default function Page() {
  return (
    <main className="bg-muted font-poppins flex min-h-svh flex-col items-center justify-center">
      <SignInButton />
      <section className="flex w-full max-w-187.5 flex-col gap-7 px-5">
        <ProjectHeader />
        <section className="flex w-full gap-2.5">
          <ProjectCard
            type="project"
            icon={<LucideSparkle className="size-7" />}
            operationContent={<CommandButton operationString="⌘J" />}
            content="New"
          />
          <ProjectCard
            icon={<GithubIcon className="size-7" />}
            operationContent={<CommandButton operationString="⌘I" />}
            content="Import"
          />
        </section>

        <ProjectList />
      </section>
    </main>
  );
}
