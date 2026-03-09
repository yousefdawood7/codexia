import { Doc } from "../_generated/dataModel";

export const checkIsNewFileNameUnique = (
  newName: string,
  files: Doc<"files">[],
  currentFile?: Doc<"files">,
) =>
  files.every((file) => {
    // prettier-ignore
    // !currentFile is for the case when we are creating a new file and we want to make sure that the new file name is unique among all the files in the same directory
    if (currentFile && file._id === currentFile._id)
        return true; // skipping the comparing the current file name with itself

    return file.name !== newName;
  });
