import ResizablePane from "@/components/ResizablePane";
import ChatPane from "@/features/editor/components/ChatPane";
import EditorPane from "@/features/editor/components/EditorPane";
import {
  CHAT_PANE,
  EDITOR_PANE,
  LAYOUT_RATIOS,
} from "@/features/editor/constants";
import "allotment/dist/style.css";

export default async function Page() {
  return (
    <ResizablePane
      leftPane={<EditorPane />}
      rightPane={<ChatPane />}
      leftMinSize={EDITOR_PANE.MIN_SIZE}
      rightMinSize={CHAT_PANE.MIN_SIZE}
      rightMaxSize={CHAT_PANE.MAX_SIZE}
      rightPreferredSize={CHAT_PANE.PREFERRED_SIZE}
      paneRatio={[LAYOUT_RATIOS.EDITOR, LAYOUT_RATIOS.CHAT]}
    />
  );
}
