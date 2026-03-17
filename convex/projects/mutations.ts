import { ConvexError, v } from "convex/values";

import { mutation } from "../_generated/server";
import { userIdentity } from "../_shared/dal";

export const createProject = mutation({
  args: { projectName: v.string() },
  handler: async (ctx, { projectName }) => {
    const currentUser = await userIdentity(ctx);

    // prettier-ignore
    if(!currentUser)
        throw new ConvexError({message: "Unauthorized Access", cause: "You must be logged in to create a project"});

    return ctx.db.insert("projects", {
      name: projectName,
      updatedAt: Date.now(),
      ownerID: currentUser.subject,
      importStatus: "IMPORTING",
    });
  },
});

export const renameProject = mutation({
  args: { projectID: v.id("projects"), newName: v.string() },
  handler: async (ctx, { projectID, newName }) => {
    const currentUser = await userIdentity(ctx);
    const project = await ctx.db.get("projects", projectID);

    // prettier-ignore
    if(!currentUser)
      throw new ConvexError({message: "Unauthorized Access", cause: "You must be logged in to rename this project"});

    // prettier-ignore
    if (!project)
      throw new ConvexError({message: "Project Not Found", cause: "The project you are trying to rename does not exist"});

    if (project?.ownerID !== currentUser.subject)
      throw new ConvexError({
        message: "Unauthorized Access",
        cause: "You are not the owner of this project.",
      });

    return ctx.db.patch("projects", projectID, {
      name: newName,
      updatedAt: Date.now(),
    });
  },
});
