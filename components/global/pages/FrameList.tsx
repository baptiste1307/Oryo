"use client";

import BasicFrames from "./frame-list/BasicFrames";
import CalculationFrames from "./frame-list/CalculationFrames";
import { Frame } from "./frame-list/frameTypes";
import QuoteFrames from "./frame-list/QuoteFrames";

type FrameListProps = {
  frames: Frame[];
  template: "basic" | "quotes_frames" | "recent_calculations" | string;
};

export default function FrameList({ frames, template }: FrameListProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      {template === "basic" && <BasicFrames frames={frames} />}
      {template === "quotes_frames" && <QuoteFrames frames={frames} />}
      {template === "recent_calculations" && (
        <CalculationFrames frames={frames} />
      )}
    </div>
  );
}
