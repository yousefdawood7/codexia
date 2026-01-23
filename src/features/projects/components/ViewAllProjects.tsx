import { Doc } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { IMPORT_STATUS } from "@/features/projects/constants";
import { useCommandPalette } from "@/hooks/useCommandPalette";

type ViewAllProjectsProps = { projects: Doc<"projects">[] };

export default function ViewAllProjects({ projects }: ViewAllProjectsProps) {
  const [open, setOpen] = useCommandPalette();

  return (
    <>
      <Button
        variant={"command"}
        onClick={() => setOpen(true)}
        className="text-muted-foreground bg-transparent text-lg"
      >
        View all
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Projects">
              {projects.map((project) => {
                const ProjectIcon = IMPORT_STATUS[project.importStatus];
                return (
                  <CommandItem key={project._id}>
                    <ProjectIcon className="size-12" />
                    {project.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
