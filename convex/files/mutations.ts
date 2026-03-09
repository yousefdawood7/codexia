import { ConvexError, v } from "convex/values";

import { mutation } from "../_generated/server";
import { userIdentity } from "../_shared/dal";

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

    const isNewFileNameUnique = files.every((file) => {
      // prettier-ignore
      if (file._id === currentFile?._id)
        return true; // skipping the comparing the current file name with itself

      // prettier-ignore
      if (file.type !== currentFile.type)
        return true;

      return file.name !== newName;
    });

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
