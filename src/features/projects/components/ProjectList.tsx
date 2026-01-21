import { LucideAArrowDown } from "lucide-react";
import CommandButton from "@/components/ui/CommandButton";
import ProjectItem from "@/features/projects/components/ProjectItem";

export default function ProjectList() {
  return (
    <section className="space-y-5">
      <aside className="flex items-center justify-between">
        <p className="text-muted-foreground text-lg">Recent projects</p>
        <section className="flex items-center gap-2.5">
          <p className="text-muted-foreground text-lg">View all</p>
          <CommandButton operationString="⌘K" />
        </section>
      </aside>
      <ProjectItem icon={LucideAArrowDown} title="Hello" content="Test" />
      <ProjectItem icon={LucideAArrowDown} title="Hello" content="Test" />
      <ProjectItem icon={LucideAArrowDown} title="Hello" content="Test" />
      <ProjectItem icon={LucideAArrowDown} title="Hello" content="Test" />
    </section>
  );
}
