import FieldLabel from "../shared/FieldLabel";
import { UpdateCalculationField } from "../shared/types";

export default function NotesSection({
  notes,
  updateField,
}: {
  notes: string;
  updateField: UpdateCalculationField;
}) {
  return (
    <div className="stack">
      <FieldLabel help="Ajoutez vos hypothèses, fournisseur, client visé ou contexte de décision.">
        Notes
      </FieldLabel>
      <textarea
        className="input"
        value={notes}
        placeholder="Hypothèses, fournisseur, client visé, contexte..."
        onChange={(e) => updateField("notes", e.target.value)}
        rows={5}
      />
    </div>
  );
}
