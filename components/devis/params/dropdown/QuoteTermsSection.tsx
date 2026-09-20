export default function QuoteTermsSection({
  conditions,
  updateConditions,
}: {
  conditions: string;
  updateConditions: (value: string) => void;
}) {
  const counterColor =
    conditions.length === 500
      ? "var(--danger)"
      : conditions.length > 450
        ? "orange"
        : "var(--muted)";

  return (
    <div>
      <label className="label">Modalités et conditions de règlement</label>
      <textarea
        rows={1}
        maxLength={500}
        className="input"
        placeholder="Ex: Paiement à 30 jours par virement bancaire"
        value={conditions}
        onChange={(e) => {
          updateConditions(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        style={{ resize: "vertical", paddingBottom: "24px" }}
      />
      <p style={{ fontSize: "0.8rem", pointerEvents: "none", color: counterColor }}>
        {conditions.length}/500 caractères
      </p>
    </div>
  );
}
