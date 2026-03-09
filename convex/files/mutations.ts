import { ConvexError, v } from "convex/values";

import { mutation } from "../_generated/server";
import { userIdentity } from "../_shared/dal";
import { checkIsNewFileNameUnique } from "../_shared/utils";

export const addFile = mutation({
  args: {
    projectID: v.id("projects"),
    parentID: v.optional(v.id("files")), // it's optional cuz it might be in the root directory
    type: v.union(v.literal("FILE"), v.literal("FOLDER")),
    name: v.string(),
  },
  handler: async (ctx, { projectID, parentID, type, name }) => {
    const currentUser = await userIdentity(ctx);
    const project = await ctx.db.get("projects", projectID);

    const files = await ctx.db
      .query("files")
      .withIndex("by_project_parent_folder", (q) =>
        q.eq("projectID", projectID).eq("parentFolderID", parentID),
      )
      .collect();

    if (!currentUser)
      throw new ConvexError({
        message: "Unauthorized Access",
        cause: `You must be logged in to add a new ${type === "FILE" ? "file" : "folder"}`,
      });

    if (!project)
      throw new ConvexError({
        message: "Project Not Found",
        cause: `The project you are trying to add a new ${type === "FILE" ? "file" : "folder"} to does not exist`,
      });

    if (project?.ownerID !== currentUser.subject)
      throw new ConvexError({
        message: "Unauthorized Access",
        cause: "You are not the owner of this project",
      });

    const isNewFileNameUnique = checkIsNewFileNameUnique(name, files);

    if (!isNewFileNameUnique)
      throw new ConvexError({
        message: "Duplicate File Name",
        cause: `A ${type === "FILE" ? "file" : "folder"} with the same name already exists in this directory. Please choose a different name.`,
      });

    return ctx.db.insert("files", {
      name,
      projectID,
      parentFolderID: parentID,
      type,
      updatedAt: Date.now(),
    });
  },
});

// for files and directories (folders)
export const renameFile = mutation({
  args: {
    projectID: v.id("projects"),
    fileID: v.id("files"),
    parentID: v.optional(v.id("files")), // it's optional cuz it might be in the root directory
    newName: v.string(),
  },
  handler: async (ctx, { projectID, fileID, parentID, newName }) => {
    const currentUser = await userIdentity(ctx);
    const project = await ctx.db.get("projects", projectID);

    const files = await ctx.db
      .query("files")
      .withIndex("by_project_parent_folder", (q) =>
        q.eq("projectID", projectID).eq("parentFolderID", parentID),
      )
      .collect();
    const currentFile = await ctx.db.get("files", fileID);

    if (!currentUser)
      throw new ConvexError({
        message: "Unauthorized Access",
        cause: "You must be logged in to rename this file",
      });

    if (!project)
      throw new ConvexError({
        message: "Project Not Found",
        cause: "The project this file belongs to does not exist",
      });

    if (project?.ownerID !== currentUser.subject)
      throw new ConvexError({
        message: "Unauthorized Access",
        cause: "You are not the owner of this project",
      });

    if (!currentFile)
      throw new ConvexError({
        message: "File Not Found",
        cause: "The file you are trying to rename does not exist",
      });

    const isNewFileNameUnique = checkIsNewFileNameUnique(
      newName,
      files,
      currentFile,
    );

    if (!isNewFileNameUnique)
      throw new ConvexError({
        message: "Duplicate File Name",
        cause:
          "A file with the same name already exists in this directory. Please choose a different name.",
      });

    const now = Date.now();

    ctx.db.patch("projects", projectID, { updatedAt: now });
    return ctx.db.patch("files", fileID, {
      name: newName,
      updatedAt: now,
    });
  },
});
