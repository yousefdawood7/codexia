"use client";

import { FaGithub as GithubIcon } from "react-icons/fa";
import { SignInButton } from "@clerk/nextjs";
import { LucidePlus, LucideSearch } from "lucide-react";
import { api } from "@/../convex/_generated/api";
import { useCommandPalette } from "@/contexts/CommandPaletteProvider";
import ProjectHeader from "@/features/projects/components/project/ProjectHeader";
import ProjectAction from "@/features/projects/components/sidebar/ProjectAction";
import { useOptimisticProject } from "@/features/projects/hooks/useOptimisticProject";
import { generateRandomNames } from "@/lib/utils";

export default function ProjectsSidebar() {
  const { setOpen } = useCommandPalette();
  const handleCreateProject = useOptimisticProject(api.functions.createProject);

  return (
    <aside className="bg-sidebar fixed top-0 left-0 flex min-h-svh w-64 flex-col border-r border-white/5">
      <ProjectHeader />

      <aside className="px-3 pb-2">
        <ProjectAction
          icon={<LucideSearch className="size-4" />}
          label="Search"
          shortcut="⌘K"
          handleClick={() => setOpen(true)}
        />
      </aside>

      <nav className="flex flex-col gap-0.5 px-3 py-2">
        <p className="text-muted-foreground/70 mb-2 px-3 text-xs font-medium tracking-wider uppercase">
          Create
        </p>
        <ProjectAction
          icon={<LucidePlus className="size-4" />}
          label="New Project"
          shortcut="⌘J"
          handleClick={() => handleCreateProject(generateRandomNames())}
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
