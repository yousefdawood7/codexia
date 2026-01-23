import { FaGithub as GithubIcon } from "react-icons/fa";
import { SignInButton } from "@clerk/nextjs";
import { LucidePlus, LucideSearch } from "lucide-react";
import CodexiaLogo from "@/components/CodexiaLogo";
import { Button } from "@/components/ui/button";
import CommandButton from "@/components/ui/CommandButton";
import ProjectList from "@/features/projects/components/project/ProjectList";
import StickyProjectHeader from "@/features/projects/components/ProjectsPageHeader";
import ProjectAction from "@/features/projects/components/sidebar/ProjectAction";
import ProjectsSidebar from "@/features/projects/components/sidebar/ProjectsSidebar";

export default function Page() {
  return (
    <main className="bg-background font-poppins flex min-h-svh">
      <ProjectsSidebar />
      <section className="ml-64 flex flex-1 flex-col">
        <StickyProjectHeader />
        <section className="flex-1 px-8 py-6">
          <ProjectList />
        </section>
      </section>
    </main>
  );
}
