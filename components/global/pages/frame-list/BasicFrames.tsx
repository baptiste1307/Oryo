import { Frame } from "./frameTypes";

export default function BasicFrames({ frames }: { frames: Frame[] }) {
  return (
    <>
      {frames.map((frame, index) => (
        <div className="frame_div" key={index}>
          <strong>{frame.title}</strong>
          <p>{frame.subtitle}</p>
        </div>
      ))}
    </>
  );
}
