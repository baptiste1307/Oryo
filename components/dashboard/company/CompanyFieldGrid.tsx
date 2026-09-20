import EditableCompanyField from "./EditableCompanyField";
import type { CompanyField, CompanyForm } from "./companyTypes";
import type { CompanyFieldConfig } from "./companyFieldGroups";

type CompanyFieldGridProps = {
  fields: CompanyFieldConfig[];
  form: CompanyForm;
  editingField: CompanyField | null;
  setEditingField: (field: CompanyField | null) => void;
  updateFormField: (field: keyof CompanyForm, value: string) => void;
  saveCompany: () => void;
};

export default function CompanyFieldGrid({
  fields,
  form,
  editingField,
  setEditingField,
  updateFormField,
  saveCompany,
}: CompanyFieldGridProps) {
  return (
    <div className="grid-2">
      {fields.map((field) => (
        <EditableCompanyField
          key={field.field}
          {...field}
          form={form}
          editingField={editingField}
          setEditingField={setEditingField}
          updateFormField={updateFormField}
          saveCompany={saveCompany}
        />
      ))}
    </div>
  );
}
