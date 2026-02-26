import { Activity, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FileExplorerProject from "@/features/editor/components/file-explorer/FileExplorerProject";
import FileExplorerSwitcher from "@/features/editor/components/file-explorer/FileExplorerSwitcher";

export default function FileExplorerPane() {
  const [isOpened, setIsOpened] = useState<boolean>(true);

  return (
    <div className="bg-sidebar group/explorer flex h-full flex-col gap-1.5">
      <FileExplorerSwitcher
        isOpened={isOpened}
        setIsOpened={() => setIsOpened((prev) => !prev)}
      />

      <Activity mode={isOpened ? "visible" : "hidden"}>
        <ScrollArea className="h-full">
          <FileExplorerProject />
        </ScrollArea>
      </Activity>
    </div>
  );
}
