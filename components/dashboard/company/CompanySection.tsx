import { ChevronDown, ChevronUp } from "lucide-react";

type CompanySectionProps = {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export default function CompanySection({
  title,
  open,
  onToggle,
  children,
}: CompanySectionProps) {
  return (
    <>
      <div className="openable-calculation-section">
        <strong style={{ color: open ? "var(--primary)" : "var(--text)" }}>
          {title}
        </strong>
        <button
          type="button"
          className="nav-link"
          onClick={onToggle}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {open ? <ChevronUp size={23} /> : <ChevronDown size={23} />}
        </button>
      </div>

      {open && children}
    </>
  );
}
