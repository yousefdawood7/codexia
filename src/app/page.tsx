import { CommandPaletteProvider } from "@/contexts/CommandPaletteProvider";
import ProjectList from "@/features/projects/components/project/ProjectList";
import StickyProjectHeader from "@/features/projects/components/ProjectsPageHeader";
import ProjectsSidebar from "@/features/projects/components/sidebar/ProjectsSidebar";

export default function Page() {
  return (
    <CommandPaletteProvider>
      <main className="bg-background font-poppins flex min-h-svh">
        <ProjectsSidebar />
        <section className="ml-64 flex flex-1 flex-col">
          <StickyProjectHeader />
          <section className="flex-1 px-8 py-6">
            <ProjectList />
          </section>
        </section>
      </main>
    </CommandPaletteProvider>
  );
}
