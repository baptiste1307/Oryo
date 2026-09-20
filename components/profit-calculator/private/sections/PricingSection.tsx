import { Calculation } from "@/context/CalculationContext";
import FieldLabel from "../shared/FieldLabel";
import { formatAmount } from "../shared/calculationOptions";
import SectionHeader from "../shared/SectionHeader";
import { UpdateCalculationField } from "../shared/types";
import { selectZeroOnFocus } from "@/lib/numberInputs";

export default function PricingSection({
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
          title="Prix et objectifs"
          description="Comparez votre prix actuel avec le prix recommandé pour atteindre votre marge cible."
        />
      )}

      <div className="grid-2">
        <div className="stack">
          <FieldLabel help="Prix de vente hors taxes que vous pensez facturer. C'est la base du calcul de bénéfice et de marge.">
            Prix de vente HT
          </FieldLabel>
          <input
            className="input"
            type="number"
            step="any"
            value={calculation.price}
            onFocus={selectZeroOnFocus}
            onChange={(e) => updateField("price", Number(e.target.value))}
          />
        </div>

        <div className="stack">
          <FieldLabel help="Taux utilisé pour afficher le prix TTC. La TVA ne change pas la marge HT.">
            TVA (%)
          </FieldLabel>
          <input
            className="input"
            type="number"
            step="any"
            value={calculation.tvaRate}
            onFocus={selectZeroOnFocus}
            onChange={(e) => updateField("tvaRate", Number(e.target.value))}
          />
        </div>

        <div className="stack">
          <FieldLabel help="Marge que vous voulez atteindre. L'app calcule automatiquement le prix conseillé correspondant.">
            Marge cible (%)
          </FieldLabel>
          <input
            className="input"
            type="number"
            step="any"
            value={calculation.targetMargin}
            onFocus={selectZeroOnFocus}
            onChange={(e) => updateField("targetMargin", Number(e.target.value))}
          />
        </div>

        <div className="stack">
          <FieldLabel help="Prix HT minimum conseillé pour atteindre la marge cible à partir du coût total.">
            Prix conseillé
          </FieldLabel>
          <input
            className="input"
            type="number"
            step="any"
            value={formatAmount(calculation.suggestedPrice)}
            onFocus={selectZeroOnFocus}
            readOnly
          />
        </div>
      </div>
    </>
  );
}
