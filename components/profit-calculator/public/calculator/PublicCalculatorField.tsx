type PublicCalculatorFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function PublicCalculatorField({
  label,
  value,
  onChange,
}: PublicCalculatorFieldProps) {
  return (
    <div className="stack">
      <label style={{ marginBottom: "0" }} className="label">
        {label}
      </label>
      <input
        className="input"
        type="number"
        step="any"
        value={value}
        onFocus={selectZeroOnFocus}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
import { selectZeroOnFocus } from "@/lib/numberInputs";
