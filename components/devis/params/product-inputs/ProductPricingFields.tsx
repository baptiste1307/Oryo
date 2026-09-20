import type { Product } from "@/context/quote/quoteTypes";
import { selectZeroOnFocus } from "@/lib/numberInputs";

type Props = {
  product: Product;
  onUpdate: <K extends keyof Product>(field: K, value: Product[K]) => void;
};

export default function ProductPricingFields({ product, onUpdate }: Props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      <div style={{ flex: 1, minWidth: "120px" }}>
        <label className="label">Prix unitaire HT</label>
        <PositiveNumberInput
          value={product.unitPrice}
          min={0}
          placeholder="1200"
          onChange={(value) => onUpdate("unitPrice", Math.max(0, value))}
        />
      </div>
      <div style={{ flex: 1, minWidth: "120px" }}>
        <label className="label">Quantité</label>
        <PositiveNumberInput
          value={product.quantity}
          min={1}
          placeholder="1"
          onChange={(value) => onUpdate("quantity", Math.max(1, value))}
        />
      </div>
      <div style={{ flex: 1, minWidth: "120px" }}>
        <label className="label">Unité</label>
        <select
          className="input"
          value={product.unit}
          onChange={(e) => onUpdate("unit", e.target.value)}
        >
          <option value="">Choisir une unité</option>
          <option value="unité">Unité</option>
          <option value="heure">Heure</option>
          <option value="jour">Jour</option>
          <option value="forfait">Forfait</option>
          <option value="mois">Mois</option>
        </select>
      </div>
    </div>
  );
}

export function PositiveNumberInput({
  value,
  min,
  placeholder,
  disabled,
  onChange,
}: {
  value: number;
  min: number;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <input
      className="input"
      placeholder={placeholder}
      value={value}
      type="number"
      min={min}
      step="any"
      disabled={disabled}
      onFocus={selectZeroOnFocus}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      onKeyDown={(e) => {
        if (e.key === "-" || e.key === "e") e.preventDefault();
      }}
    />
  );
}
