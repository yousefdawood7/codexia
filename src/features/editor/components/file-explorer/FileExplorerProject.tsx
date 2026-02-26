import FileExplorerFile from "@/features/editor/components/file-explorer/FileExplorerFile";
import FileExplorerFolder from "@/features/editor/components/file-explorer/FileExplorerFolder";
import { FolderStructure } from "@/features/editor/constants";

const files: FolderStructure[] = [
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
  {
    name: "src",
    type: "folder",
    children: [
      { name: "index.ts", type: "file" },
      { name: "App.tsx", type: "file" },
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Button.tsx", type: "file" },
          { name: "Modal.tsx", type: "file" },
          {
            name: "common",
            type: "folder",
            children: [
              { name: "Header.tsx", type: "file" },
              { name: "Footer.tsx", type: "file" },
            ],
          },
        ],
      },
      {
        name: "hooks",
        type: "folder",
        children: [
          { name: "useAuth.ts", type: "file" },
          { name: "useApi.ts", type: "file" },
        ],
      },
      {
        name: "utils",
        type: "folder",
        children: [
          { name: "helpers.ts", type: "file" },
          { name: "constants.ts", type: "file" },
        ],
      },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "index.html", type: "file" },
      { name: "favicon.ico", type: "file" },
    ],
  },
];

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

export default function FileExplorerProject() {
  return (
    <div className="flex h-full flex-col gap-0.5 pl-3.5">
      {renderFileStructures(files)}
      {/* <FileExplorerFolder files={files} /> */}
      {/* <FileExplorerFile /> */}
      {/* <FileExplorerFile /> */}
      {/* <FileExplorerFile /> */}
    </div>
  );
}
