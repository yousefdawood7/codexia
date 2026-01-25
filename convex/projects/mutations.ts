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
