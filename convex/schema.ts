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

  files: defineTable({
    projectID: v.string(),
    parentFolderID: v.optional(v.id("files")), // if it doesn't exist so it's in the root directory
    name: v.string(),
    type: v.union(v.literal("FILE"), v.literal("FOLDER")),
    content: v.optional(v.string()),
    updateAt: v.number(),
  })
    .index("by_project", ["projectID"])
    .index("by_parent_folder", ["parentFolderID"])
    .index("by_project_parent_folder", ["projectID", "parentFolderID"]),
});
