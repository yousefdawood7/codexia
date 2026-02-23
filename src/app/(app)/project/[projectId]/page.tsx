import ResizablePane from "@/components/ResizablePane";
import ChatPane from "@/features/editor/components/panes/ChatPane";
import EditorPanes from "@/features/editor/components/panes/EditorPanes";
import {
  CHAT_PANE,
  EDITOR_PANE,
  LAYOUT_RATIOS,
} from "@/features/editor/constants";
import "allotment/dist/style.css";

export default async function Page() {
  return (
    <ResizablePane
      leftPane={<EditorPanes />}
      rightPane={<ChatPane />}
      leftMinSize={EDITOR_PANE.MIN_SIZE}
      rightMinSize={CHAT_PANE.MIN_SIZE}
      rightMaxSize={CHAT_PANE.MAX_SIZE}
      rightPreferredSize={CHAT_PANE.PREFERRED_SIZE}
      paneRatio={[LAYOUT_RATIOS.EDITOR, LAYOUT_RATIOS.CHAT]}
      rightSnap
    />
  );
}
