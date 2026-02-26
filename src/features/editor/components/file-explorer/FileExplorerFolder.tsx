import { Activity, useState } from "react";
import { FolderIcon } from "@react-symbols/icons/utils";
import { LucideChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FileExplorerFolderProps = {
  name: string;
  children?: React.ReactNode;
};

export default function FileExplorerFolder({
  name,
  children,
}: FileExplorerFolderProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <div
      className="relative flex flex-col select-none"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpened((prev) => !prev);
      }}
    >
      <div className="flex items-center gap-1.5">
        <div className="items flex gap-0.5">
          <LucideChevronRight
            className={cn(
              "size-4 shrink-0 transition-transform",
              isOpened ? "rotate-90" : "rotate-0",
            )}
          />
          <FolderIcon
            folderName={name}
            width={20}
            height={20}
            className="shrink-0"
          />
        </div>
        <span
          className={cn(
            "text-muted-foreground hover:text-foreground truncate",
            isOpened && "text-foreground",
          )}
        >
          {name}
        </span>
      </div>

      {children && (
        <Activity mode={isOpened ? "visible" : "hidden"}>
          <div className="before:border-muted-foreground pl-5 before:absolute before:inset-y-2 before:top-5 before:left-1.75 before:block before:w-0.5 before:border-l before:content-['']">
            {children}
          </div>
        </Activity>
      )}
    </div>
  );
}
