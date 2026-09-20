type SelectOption = {
  value: any;
  label: string;
};

type Field = {
  field_type: string;
  select_options?: SelectOption[];
  label?: string;
  placeholder?: string;
  value?: string | number;
  value_type?: string;
  onChange: (v: string) => void;
  invalid?: boolean;
};

type Props = {
  fields: Field[];
};

export default function InputList({ fields }: Props) {
  return fields.map((field, index) => (
    <div
      key={index}
      className="stack"
      style={{ gap: "4px", marginBottom: "4px" }}
    >
      <label className="label">{field.label}</label>

      {field.field_type == "input" && (
        <input
          className="input"
          type={field.value_type || "text"}
          step={field.value_type === "number" ? "any" : undefined}
          placeholder={field.placeholder}
          value={field.value}
          aria-invalid={field.invalid}
          onFocus={field.value_type === "number" ? selectZeroOnFocus : undefined}
          onChange={(e) => field.onChange(e.target.value)}
        />
      )}

      {field.field_type == "select" && (
        <select
          className="input"
          value={field.value}
          aria-invalid={field.invalid}
          onChange={(e) => field.onChange(e.target.value)}
        >
          {field.select_options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  ));
}
import { selectZeroOnFocus } from "@/lib/numberInputs";
