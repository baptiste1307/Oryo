import type { Quote } from "@/context/quote/quoteTypes";

type Props = {
  quote: Quote;
  isPremium: boolean;
  onRadiusChange: (field: "tableRadius" | "signatureRadius", value: number) => void;
};

export default function RadiusCustomizerSection({
  quote,
  isPremium,
  onRadiusChange,
}: Props) {
  return (
    <section className="quote-customizer-section">
      <div className="locked-section-header">
        <strong>Arrondis</strong>
      </div>
      <label className="label">Tableaux: {quote.tableRadius}%</label>
      <input
        type="range"
        min={0}
        max={40}
        value={quote.tableRadius}
        disabled={!isPremium}
        onChange={(event) => onRadiusChange("tableRadius", Number(event.target.value))}
      />
      <label className="label">Signature: {quote.signatureRadius}%</label>
      <input
        type="range"
        min={0}
        max={40}
        value={quote.signatureRadius}
        disabled={!isPremium}
        onChange={(event) => onRadiusChange("signatureRadius", Number(event.target.value))}
      />
    </section>
  );
}
