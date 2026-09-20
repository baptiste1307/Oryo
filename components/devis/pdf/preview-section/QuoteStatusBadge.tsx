type QuoteStatusBadgeProps = {
  finished: boolean;
};

export default function QuoteStatusBadge({ finished }: QuoteStatusBadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        width: "fit-content",
        height: "fit-content",
        padding: "8px 12px",
        borderRadius: "999px",
        background: "var(--accent-soft)",
        color: "var(--primary)",
        fontWeight: 700,
        fontSize: "0.9rem",
      }}
    >
      {finished ? "Finalisé" : "Brouillon"}
    </span>
  );
}
