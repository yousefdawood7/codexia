import { LucideCopyMinus } from "lucide-react";

type FileExplorerFileProps = {
  name: string;
};

export default function FileExplorerFile({ name }: FileExplorerFileProps) {
  return (
    <div className="group/file flex items-center gap-2 select-none">
      <LucideCopyMinus className="size-4 shrink-0" />
      <span className="text-muted-foreground group-hover/file:text-foreground">
        {name}
      </span>
    </div>
  );
}
