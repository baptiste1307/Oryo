"use client";

type Props = {
  open: boolean;
  onToggle: () => void;
};

export default function MobileMenuButton({ open, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "4px",
            width: "20px",
            height: "2px",
            background: "var(--text)",
            transition:
              "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease",
            transform: open ? "rotate(45deg) translate(4px, 4px)" : "none",
          }}
        />

        <span
          style={{
            position: "absolute",
            left: 0,
            top: "9px",
            width: "20px",
            height: "2px",
            background: "var(--text)",
            transition:
              "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease",
            opacity: open ? 0 : 1,
          }}
        />

        <span
          style={{
            position: "absolute",
            left: 0,
            top: "14px",
            width: "20px",
            height: "2px",
            background: "var(--text)",
            transition:
              "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease",
            transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none",
          }}
        />
      </div>
    </button>
  );
}
