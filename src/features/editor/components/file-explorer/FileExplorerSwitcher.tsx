"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import {
  LucideChevronRight,
  LucideCopyPlus,
  LucideFilePlusCorner,
  LucideFolderPlus,
} from "lucide-react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import FileExplorerButton from "@/features/editor/components/file-explorer/FileExplorerButton";
import { cn } from "@/lib/utils";

export default function FileExplorerSwitcher() {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const { projectId } = useParams<{ projectId: Id<"projects"> }>();
  const project = useQuery(api.projects.queries.getProjectById, {
    projectId,
  });

  // prettier-ignore
  if (project === undefined)
    return "Loading";

  return (
    <div
      className="bg-background flex justify-between p-0.5 select-none"
      onClick={() => setIsOpened((prev) => !prev)}
    >
      <div className="flex max-w-52 items-center gap-1 truncate">
        <LucideChevronRight
          className={`size-4 transition-transform ${isOpened ? "rotate-90" : "rotate-0"} shrink-0`}
        />
        <span className="inline-block truncate">{project.name}</span>
      </div>

      <div className="flex">
        <FileExplorerButton
          icon={<LucideFilePlusCorner className="size-4" />}
          isOpened={isOpened}
        />
        <FileExplorerButton
          icon={<LucideFolderPlus className="size-4" />}
          isOpened={isOpened}
        />
        <FileExplorerButton
          icon={<LucideCopyPlus className="size-4" />}
          isOpened={isOpened}
        />
      </div>
    </div>
  );
}
