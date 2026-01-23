import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { getCurrentDate } from "@/lib/utils";

export function useOptimisticProject(
  createProject: FunctionReference<"mutation">,
) {
  const optimisticCreateProject = useMutation(
    createProject,
  ).withOptimisticUpdate((localStore, args) => {
    const { projectName } = args;
    const queryArgs = { numberOfProjects: 5 };
    const currentProjects =
      localStore.getQuery(api.functions.getProjects, queryArgs) ?? [];

    const now = getCurrentDate();

    const optimisticProjectObject = {
      _id: crypto.randomUUID() as Id<"projects">,
      _creationTime: now,
      updatedAt: now,
      name: projectName,
      ownerID: "optimistic",
      importStatus: "completed" as const,
    };

    localStore.setQuery(
      api.functions.getProjects,
      queryArgs,
      [optimisticProjectObject, ...currentProjects].slice(0, 5),
    );
  });

  return optimisticCreateProject;
}
