import { Calculation } from "@/context/CalculationContext";
import { categoryOptions, statusOptions } from "../shared/calculationOptions";
import FieldLabel from "../shared/FieldLabel";
import SectionHeader from "../shared/SectionHeader";
import { UpdateCalculationField } from "../shared/types";

export default function IdentificationSection({
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
          title="Identification"
          description="Classez votre calcul pour le retrouver facilement plus tard."
        />
      )}

      <div className="grid-2">
        <div className="stack">
          <FieldLabel help="Type de calcul : produit, service, mission ou autre. Sert surtout aux filtres.">
            Catégorie
          </FieldLabel>
          <select
            className="input"
            value={calculation.category}
            onChange={(e) => updateField("category", e.target.value)}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="stack">
          <FieldLabel help="Brouillon pour une idée en cours, validé pour une décision retenue, archivé pour ne plus le voir en priorité.">
            Statut
          </FieldLabel>
          <select
            className="input"
            value={calculation.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as "draft" | "validated" | "archived",
              )
            }
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
