import { Calculation } from "@/context/CalculationContext";
import { formatAmount } from "../shared/calculationOptions";
import SectionHeader from "../shared/SectionHeader";

function getProfitColor(value: number) {
  if (value > 0) return "var(--success)";
  return "var(--danger)";
}

function getMarginColor(value: number) {
  if (value >= 30) return "var(--success)";
  if (value >= 15) return "orange";
  return "var(--danger)";
}

export default function ResultsSection({
  calculation,
  showHeader = true,
}: {
  calculation: Calculation;
  showHeader?: boolean;
}) {
  const results = [
    { title: "Coût total", value: calculation.totalCost, unit: "EUR", color: "var(--text)" },
    { title: "Prix TTC", value: calculation.priceTtc, unit: "EUR", color: "var(--text)" },
    { title: "Bénéfice", value: calculation.profit, unit: "EUR", color: getProfitColor(calculation.profit) },
    { title: "Marge", value: calculation.margin, unit: "%", color: getMarginColor(calculation.margin) },
  ];

  return (
    <>
      {showHeader && (
        <SectionHeader
          title="Résultat"
          description="Ces valeurs se recalculent automatiquement dès que vous modifiez un champ."
        />
      )}

      <div className="grid-2">
        {results.map((result) => (
          <div key={result.title} className="card">
            <p style={{ marginBottom: "8px" }}>{result.title}</p>
            <h3 style={{ color: result.color }}>
              {formatAmount(result.value)} {result.unit}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}
