import { FaGithub as GithubIcon } from "react-icons/fa";
import { LucideSparkle } from "lucide-react";
import ProjectCreate from "@/features/projects/components/ProjectCreate";
import ProjectHeader from "@/features/projects/components/ProjectHeader";

export default function Page() {
  return (
    <main className="min-h-svh bg-muted flex flex-col justify-center items-center font-poppins">
      <section className="max-w-[750px] w-full flex flex-col gap-7">
        <ProjectHeader />

        <section className="flex gap-2.5 w-full ">
          <ProjectCreate
            icon={<LucideSparkle className="size-7" />}
            command="⌘J"
            content="New"
          />
          <ProjectCreate
            icon={<GithubIcon className="size-7" />}
            command="⌘I"
            content="Import"
          />
        </section>
      </section>
    </main>
  );
}
