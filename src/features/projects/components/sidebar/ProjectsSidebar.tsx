import { FaGithub as GithubIcon } from "react-icons/fa";
import { SignInButton } from "@clerk/nextjs";
import { LucidePlus, LucideSearch } from "lucide-react";
import CodexiaLogo from "@/components/CodexiaLogo";
import { Button } from "@/components/ui/button";
import CommandButton from "@/components/ui/CommandButton";
import ProjectAction from "@/features/projects/components/sidebar/ProjectAction";

export default function ProjectsSidebar() {
  return (
    <aside className="bg-sidebar fixed top-0 left-0 flex h-svh w-64 flex-col border-r border-white/5">
      <header className="flex items-center gap-2.5 px-5 py-5">
        <CodexiaLogo />
        <h1 className="text-2xl font-semibold tracking-tight">Codexia</h1>
      </header>

      <aside className="px-3 pb-2">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground h-9 w-full justify-start gap-2.5 px-3 text-sm"
        >
          <LucideSearch className="size-4" />
          <span>Search</span>
          <CommandButton operationString="⌘K" />
        </Button>
      </aside>

      <nav className="flex flex-col gap-0.5 px-3 py-2">
        <p className="text-muted-foreground/70 mb-2 px-3 text-xs font-medium tracking-wider uppercase">
          Create
        </p>
        <ProjectAction
          type="project"
          icon={<LucidePlus className="size-4" />}
          label="New Project"
          shortcut="⌘J"
        />
        <ProjectAction
          icon={<GithubIcon className="size-4" />}
          label="Import from GitHub"
          shortcut="⌘I"
        />
      </nav>

      {/* DUMMY */}
      <div className="flex flex-col gap-0.5 border-t border-white/5 px-3 py-3">
        <div className="mt-2 px-3">
          <SignInButton />
        </div>
      </div>
    </aside>
  );
}
