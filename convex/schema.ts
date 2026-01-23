import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    ownerID: v.string(),
    updatedAt: v.number(),
    importStatus: v.union(
      v.literal("importing"),
      v.literal("completed"),
      v.literal("failed"),
    ),
  }).index("by_owner", ["ownerID"]),
});
