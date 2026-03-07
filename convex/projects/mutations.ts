import { notFound } from "next/navigation";
import { v } from "convex/values";

import { mutation } from "../_generated/server";
import { userIdentity } from "../_shared/dal";

export const createProject = mutation({
  args: { projectName: v.string() },
  handler: async (ctx, { projectName }) => {
    const currentUser = await userIdentity(ctx);

    // prettier-ignore
    if(!currentUser)
        return null;

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
        return null;

    // prettier-ignore
    if (!project)
      notFound();

    if (project?.ownerID !== currentUser.subject)
      throw new Error("`Unauthorized` Access");

    return ctx.db.patch("projects", projectID, {
      name: newName,
      updatedAt: Date.now(),
    });
  },
});
