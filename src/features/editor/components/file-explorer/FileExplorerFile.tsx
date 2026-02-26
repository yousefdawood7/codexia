import { FileIcon } from "@react-symbols/icons/utils";

type FileExplorerFileProps = {
  name: string;
};

export default function FileExplorerFile({ name }: FileExplorerFileProps) {
  return (
    <div
      className="group/file flex items-center gap-1.5 select-none"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <FileIcon
        fileName={name}
        width={20}
        height={20}
        className="shrink-0"
        autoAssign
      />
      <span className="text-muted-foreground group-hover/file:text-foreground truncate">
        {name}
      </span>
    </div>
  );
}
