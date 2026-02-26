import ResizablePane from "@/components/ResizablePane";
import CodeEditorPane from "@/features/editor/components/panes/CodeEditorPane";
import FileExplorerPane from "@/features/editor/components/panes/FileExplorerPane";
import {
  CODE_EDITOR_PANE,
  CODE_RATIOS,
  FILE_EXPLORER_PANE,
} from "@/features/editor/constants";

export default function CodePane() {
  return (
    <ResizablePane
      leftPane={<FileExplorerPane />}
      rightPane={<CodeEditorPane />}
      leftMinSize={FILE_EXPLORER_PANE.MIN_SIZE}
      leftMaxSize={FILE_EXPLORER_PANE.MAX_SIZE}
      rightPreferredSize={CODE_EDITOR_PANE.PREFERRED_SIZE}
      rightMinSize={CODE_EDITOR_PANE.MIN_SIZE}
      paneRatio={[CODE_RATIOS.FILE_EXPLORER, CODE_RATIOS.CODE_EDITOR]}
      leftSnap
    />
  );
}
