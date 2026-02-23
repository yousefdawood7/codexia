"use client";

import { Allotment } from "allotment";

type ResizablePaneProps = {
  paneRatio: [leftSize: number, rightSize: number];

  leftPane: React.ReactNode;
  leftMinSize?: number;
  leftMaxSize?: number;
  leftSnap?: boolean;
  leftPreferredSize?: number;

  rightPane: React.ReactNode;
  rightMinSize?: number;
  rightMaxSize?: number;
  rightSnap?: boolean;
  rightPreferredSize?: number;
};

export default function ResizablePane({
  paneRatio,
  leftMinSize,
  rightMinSize,
  rightMaxSize,
  rightPreferredSize,
  leftPreferredSize,
  leftPane,
  rightPane,
  leftSnap,
  rightSnap,
  leftMaxSize,
}: ResizablePaneProps) {
  return (
    <Allotment defaultSizes={paneRatio}>
      <Allotment.Pane
        minSize={leftMinSize}
        snap={leftSnap}
        maxSize={leftMaxSize}
        preferredSize={leftPreferredSize}
      >
        {leftPane}
      </Allotment.Pane>
      <Allotment.Pane
        minSize={rightMinSize}
        maxSize={rightMaxSize}
        preferredSize={rightPreferredSize}
        snap={rightSnap}
      >
        {rightPane}
      </Allotment.Pane>
    </Allotment>
  );
}
