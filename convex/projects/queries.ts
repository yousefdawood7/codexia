import { ConvexError, v } from "convex/values";

import { query } from "../_generated/server";
import { userIdentity } from "../_shared/dal";

export const getProjects = query({
  args: { numberOfProjects: v.optional(v.number()) },
  handler: async (ctx, { numberOfProjects }) => {
    const currentUser = await userIdentity(ctx);

    // prettier-ignore
    if(!currentUser)
      throw new ConvexError({message: "Unauthorized Access", cause: "You must be logged in to access this project."});

    return ctx.db
      .query("projects")
      .withIndex("by_owner", (q) => q.eq("ownerID", currentUser.subject))
      .order("desc")
      [numberOfProjects ? "take" : "collect"](numberOfProjects ?? 0); // Argument will be ignored by collect()
  },
});

export const getProjectById = query({
  args: { projectID: v.id("projects") },
  handler: async (ctx, { projectID }) => {
    const currentUser = await userIdentity(ctx);
    const project = await ctx.db.get("projects", projectID);

    // prettier-ignore
    if (!currentUser)
      throw new ConvexError({message: "Unauthorized Access", cause: "You must be logged in to access this project."});

    // prettier-ignore
    if (project?.ownerID !== currentUser.subject)
      throw new ConvexError({message: "Unauthorized Access", cause: "You are not the owner of this project."});

    // prettier-ignore
    if (!project)
      throw new ConvexError({message: "Project Not Found", cause: "The project you are looking for does not exist." });

    return project;
  },
});
