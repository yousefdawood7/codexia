import { FileIcon } from "@react-symbols/icons/utils";

type FileExplorerFileProps = {
  name: string;
};

export default function FileExplorerFile({ name }: FileExplorerFileProps) {
  return (
    <div className="group/file flex items-center gap-2 select-none">
      <FileIcon fileName={name} width={20} height={20} autoAssign={true} />
      <span className="text-muted-foreground group-hover/file:text-foreground">
        {name}
      </span>
    </div>
  );
}
