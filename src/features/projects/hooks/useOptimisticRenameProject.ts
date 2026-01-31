import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { getCurrentDate } from "@/lib/utils";

export function useOptimisticRenameProject(
  renameProject: FunctionReference<"mutation">,
) {
  const optimisticCreateProject = useMutation(
    renameProject,
  ).withOptimisticUpdate((localStore, args) => {
    const { projectId, newName } = args as {
      projectId: Id<"projects">;
      newName: string;
    };
    const currentProject = localStore.getQuery(
      api.projects.queries.getProjectById,
      { projectId },
    );

    // prettier-ignore
    if (!currentProject)
        throw new Error("Project not found in local store");

    const now = getCurrentDate();

    localStore.setQuery(
      api.projects.queries.getProjectById,
      { projectId },
      {
        ...currentProject,
        name: newName,
        updatedAt: now,
      },
    );
  });

  return optimisticCreateProject;
}
