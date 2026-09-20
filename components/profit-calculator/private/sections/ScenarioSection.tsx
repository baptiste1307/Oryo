import { Calculation } from "@/context/CalculationContext";
import { formatAmount } from "../shared/calculationOptions";
import FieldLabel from "../shared/FieldLabel";
import SectionHeader from "../shared/SectionHeader";
import { EditableCalculationField, UpdateCalculationField } from "../shared/types";
import { selectZeroOnFocus } from "@/lib/numberInputs";

const scenarioFields = [
  ["Prix bas", "lowPrice"],
  ["Prix recommandé", "recommendedPrice"],
  ["Prix premium", "premiumPrice"],
] as const;

export default function ScenarioSection({
  calculation,
  updateField,
  showHeader = true,
}: {
  calculation: Calculation;
  updateField: UpdateCalculationField;
  showHeader?: boolean;
}) {
  return (
    <>
      {showHeader && (
        <SectionHeader
          title="Scénarios de prix"
          description="Testez plusieurs positionnements sans modifier votre prix principal."
        />
      )}

      <div className="grid-2">
        {scenarioFields.map(([label, field]) => {
          const price = Number(calculation[field]);
          const scenarioProfit = price - calculation.totalCost;
          const scenarioMargin = price > 0 ? (scenarioProfit * 100) / price : 0;

          return (
            <div key={field} className="card">
              <FieldLabel help="Comparez rapidement bénéfice et marge pour ce scénario.">
                {label}
              </FieldLabel>
              <input
                className="input"
                type="number"
                step="any"
                value={price}
                onFocus={selectZeroOnFocus}
                onChange={(e) =>
                  updateField(field as EditableCalculationField, Number(e.target.value))
                }
              />
              <p style={{ marginTop: "8px" }}>
                {formatAmount(scenarioProfit)} EUR · {formatAmount(scenarioMargin)} %
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
