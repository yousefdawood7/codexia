import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    ownerID: v.string(),
    updatedAt: v.number(),
    importStatus: v.union(
      v.literal("IMPORTING"),
      v.literal("COMPLETED"),
      v.literal("FAILED"),
    ),
  }).index("by_owner", ["ownerID"]),
});
