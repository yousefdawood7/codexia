import { v } from "convex/values";

import { query } from "../_generated/server";
import { userIdentity } from "../_shared/dal";

export const getProjects = query({
  args: { numberOfProjects: v.optional(v.number()) },
  handler: async (ctx, { numberOfProjects }) => {
    const currentUser = await userIdentity(ctx);

    // prettier-ignore
    if(!currentUser)
        return null;

    return ctx.db
      .query("projects")
      .withIndex("by_owner", (q) => q.eq("ownerID", currentUser.subject))
      .order("desc")
      [numberOfProjects ? "take" : "collect"](numberOfProjects ?? 0); // Argument will be ignored by collect()
  },
});
