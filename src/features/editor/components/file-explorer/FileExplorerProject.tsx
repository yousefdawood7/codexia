import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { Spinner } from "@/components/ui/spinner";
import { useRenderFileStructure } from "@/features/editor/hooks/useRenderFileStructure";

export default function FileExplorerProject() {
  const renderFileStructure = useRenderFileStructure();
  const { projectId: projectID } = useParams<{ projectId: Id<"projects"> }>();

  const allFiles = useQuery(api.files.queries.getFiles, {
    projectID,
  });

  console.log(allFiles);

  return (
    <div className="flex h-full flex-col gap-0.5 pb-30 pl-3.5">
      {allFiles === undefined && <Spinner />}
      {allFiles && renderFileStructure(allFiles)}
    </div>
  );
}
