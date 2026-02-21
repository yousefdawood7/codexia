"use client";

import { Allotment } from "allotment";

type ResizablePaneProps = {
  paneRatio: [leftSize: number, rightSize: number];

  leftPane: React.ReactNode;
  leftMinSize: number;

  rightPane: React.ReactNode;
  rightMinSize: number;
  rightMaxSize: number;
  rightPreferredSize: number;
};

export default function ResizablePane({
  paneRatio,
  leftMinSize,
  rightMinSize,
  rightMaxSize,
  rightPreferredSize,
  leftPane,
  rightPane,
}: ResizablePaneProps) {
  return (
    <Allotment defaultSizes={paneRatio}>
      <Allotment.Pane minSize={leftMinSize}>{leftPane}</Allotment.Pane>
      <Allotment.Pane
        minSize={rightMinSize}
        maxSize={rightMaxSize}
        preferredSize={rightPreferredSize}
        snap
      >
        {rightPane}
      </Allotment.Pane>
    </Allotment>
  );
}
