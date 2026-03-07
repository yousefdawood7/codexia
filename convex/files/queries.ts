import { v } from "convex/values";

import { query } from "../_generated/server";
import { userIdentity } from "../_shared/dal";

export const getFiles = query({
  args: { projectID: v.id("projects") },
  handler: async (ctx, { projectID }) => {
    const currentUser = await userIdentity(ctx);
    const project = await ctx.db.get("projects", projectID);

    // prettier-ignore
    if (!currentUser)
      throw new Error("Unauth Accessss");

    // prettier-ignore
    if (project?.ownerID !== currentUser.subject)
      throw new Error("Unauth Access");

    const files = await ctx.db
      .query("files")
      .withIndex("by_project", (q) => q.eq("projectID", projectID))
      .collect();

    const sortedFiles = files.sort((a, b) => {
      // prettier-ignore
      if (a.type === "FOLDER" && b.type === "FILE")
        return -1;

      // prettier-ignore
      if (a.type === "FILE" && b.type === "FOLDER")
        return 1;

      return a.name.localeCompare(b.name);
    });

    return sortedFiles;
  },
});
