import { FunctionReturnType } from "convex/server";

import { api } from "./_generated/api";

export type CreateProjectType = FunctionReturnType<
  typeof api.projects.mutations.createProject
>;
