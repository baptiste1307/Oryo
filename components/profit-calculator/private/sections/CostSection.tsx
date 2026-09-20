import { Calculation } from "@/context/CalculationContext";
import FieldLabel from "../shared/FieldLabel";
import SectionHeader from "../shared/SectionHeader";
import { EditableCalculationField, UpdateCalculationField } from "../shared/types";
import { selectZeroOnFocus } from "@/lib/numberInputs";

const costFields = [
  ["Coût d'achat", "cost", "Montant que vous payez pour produire, acheter ou réaliser ce que vous vendez."],
  ["Livraison", "shippingCost", "Frais de transport, expédition, déplacement ou logistique liés à cette vente."],
  ["Frais plateforme", "platformFees", "Commissions prélevées par une marketplace, plateforme ou intermédiaire."],
  ["Frais paiement", "paymentFees", "Frais Stripe, PayPal, banque ou terminal de paiement."],
  ["Temps estimé (h)", "timeHours", "Nombre d'heures nécessaires pour produire ou livrer cette prestation."],
  ["Taux horaire", "hourlyRate", "Valeur d'une heure de travail. Le temps estimé multiplié par ce taux est ajouté au coût."],
] as const;

export default function CostSection({
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
          title="Coûts"
          description="Ajoutez tous les coûts nécessaires pour connaître votre vrai coût total."
        />
      )}

      <div className="grid-2">
        {costFields.map(([label, field, help]) => (
          <div key={field} className="stack">
            <FieldLabel help={help}>{label}</FieldLabel>
            <input
              className="input"
              type="number"
              step="any"
              value={Number(calculation[field])}
              onFocus={selectZeroOnFocus}
              onChange={(e) =>
                updateField(field as EditableCalculationField, Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
