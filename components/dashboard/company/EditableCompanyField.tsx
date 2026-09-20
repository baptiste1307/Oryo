import { Pencil } from "lucide-react";
import { CompanyField, CompanyForm } from "./companyTypes";

export default function EditableCompanyField({
  label,
  field,
  form,
  editingField,
  type = "text",
  setEditingField,
  updateFormField,
  saveCompany,
}: {
  label: string;
  field: CompanyField;
  form: CompanyForm;
  editingField: CompanyField | null;
  type?: string;
  setEditingField: (field: CompanyField | null) => void;
  updateFormField: (field: keyof CompanyForm, value: string) => void;
  saveCompany: () => void;
}) {
  const isEditing = editingField === field;

  return (
    <div className="stack">
      <label className="label">{label}</label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {isEditing ? (
          <input
            className="input"
            type={type}
            step={type === "number" ? "any" : undefined}
            autoFocus
            value={form[field]}
            onChange={(e) => updateFormField(field, e.target.value)}
            onBlur={() => {
              setEditingField(null);
              saveCompany();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditingField(null);
                saveCompany();
              }
            }}
          />
        ) : (
          <button
            type="button"
            className="editable-display-value"
            onClick={() => setEditingField(field)}
          >
            {form[field] || "Non renseigné"}
          </button>
        )}

        <button
          type="button"
          className="edit-link"
          onClick={() => setEditingField(field)}
          aria-label={`Modifier ${label}`}
        >
          <Pencil size={16} />
        </button>
      </div>
    </div>
  );
}
