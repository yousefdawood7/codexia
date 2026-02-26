import FileExplorerFile from "@/features/editor/components/file-explorer/FileExplorerFile";
import FileExplorerFolder from "@/features/editor/components/file-explorer/FileExplorerFolder";
import { FolderStructure } from "@/features/editor/constants";

export function useRenderFileStructure() {
  const renderFileStructures = function (files: FolderStructure[]) {
    return files.map((file) => {
      // prettier-ignore
      if (file.type === "file")
      return <FileExplorerFile key={file.name} name={file.name} />;

      return (
        <FileExplorerFolder key={file.name} name={file.name}>
          {file.children?.length && renderFileStructures(file.children)}
        </FileExplorerFolder>
      );
    });
  };
  return renderFileStructures;
}
