import { Doc } from "@/../convex/_generated/dataModel";
import FileExplorerFile from "@/features/editor/components/file-explorer/FileExplorerFile";
import FileExplorerFolder from "@/features/editor/components/file-explorer/FileExplorerFolder";

export function useRenderFileStructure() {
  const renderFileStructures = function (files: Doc<"files">[]) {
    return files?.map((file) => {
      if (file.type === "FILE")
        return <FileExplorerFile key={file.name} name={file.name} />;

      const folderChildren = files.filter(
        (innerFile) => innerFile.parentFolderID === file._id,
      );

      return (
        <FileExplorerFolder key={file.name} name={file.name}>
          {folderChildren.length && renderFileStructures(folderChildren)}
        </FileExplorerFolder>
      );
    });
  };
  return renderFileStructures;
}
