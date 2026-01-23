import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { userIdentity } from "./dal";

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
      ownerID: currentUser.tokenIdentifier,
      importStatus: "importing",
    });
  },
});

export const getProjects = query({
  args: { numberOfProjects: v.optional(v.number()) },
  handler: async (ctx, { numberOfProjects }) => {
    const currentUser = await userIdentity(ctx);

    // prettier-ignore
    if(!currentUser)
        return null;

    return ctx.db
      .query("projects")
      .withIndex("by_owner", (q) =>
        q.eq("ownerID", currentUser.tokenIdentifier),
      )
      .order("desc")
      [numberOfProjects ? "take" : "collect"](numberOfProjects ?? 0); // Argument will be ignored by collect()
  },
});
