import FileExplorerSwitcher from "@/features/editor/components/file-explorer/FileExplorerSwitcher";

export default function FileExplorerPane() {
  return (
    <div className="bg-sidebar group/explorer h-full">
      <FileExplorerSwitcher />
    </div>
  );
}
