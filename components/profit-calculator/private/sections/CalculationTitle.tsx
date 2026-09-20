import { Pencil, Star } from "lucide-react";
import { UpdateCalculationField } from "../shared/types";

export default function CalculationTitle({
  name,
  favorite,
  isEditingName,
  setIsEditingName,
  updateField,
}: {
  name: string;
  favorite: boolean;
  isEditingName: boolean;
  setIsEditingName: (value: boolean) => void;
  updateField: UpdateCalculationField;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {isEditingName ? (
        <input
          className="input"
          value={name}
          autoFocus
          placeholder="Nouveau produit"
          onBlur={() => setIsEditingName(false)}
          onChange={(e) => updateField("name", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsEditingName(false);
          }}
          style={{ maxWidth: "260px" }}
        />
      ) : (
        <button
          type="button"
          className="editable-display-value"
          onClick={() => setIsEditingName(true)}
        >
          {name.trim() || "Nouveau produit"}
        </button>
      )}

      <button
        type="button"
        className="edit-link"
        onClick={() => setIsEditingName(true)}
        aria-label="Modifier le nom du calcul"
      >
        <Pencil size={20} />
      </button>

      <button
        type="button"
        className="edit-link"
        onClick={() => updateField("favorite", !favorite)}
        aria-label="Marquer comme favori"
        style={{ color: favorite ? "var(--primary)" : undefined }}
      >
        <Star size={20} fill={favorite ? "currentColor" : "none"} />
      </button>
    </span>
  );
}
