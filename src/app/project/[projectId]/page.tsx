"use client";
import { Allotment } from "allotment";
import {
  CHAT_PANE,
  EDITOR_PANE,
  LAYOUT_RATIOS,
} from "@/features/editor/constants";
import "allotment/dist/style.css";

export default function Page({ params }: PageProps<"/project/[projectId]">) {
  // const { projectId } = await params;

  return (
    <Allotment defaultSizes={[LAYOUT_RATIOS.CHAT, LAYOUT_RATIOS.EDITOR]}>
      <Allotment.Pane
        minSize={CHAT_PANE.MIN_SIZE}
        maxSize={CHAT_PANE.MAX_SIZE}
        preferredSize={CHAT_PANE.PREFERRED_SIZE}
        snap
      >
        <div>CHAT PAGE</div>
      </Allotment.Pane>

      <Allotment.Pane minSize={EDITOR_PANE.MIN_SIZE}>
        <div>EDITOR PAGE</div>
      </Allotment.Pane>
    </Allotment>
  );
}
