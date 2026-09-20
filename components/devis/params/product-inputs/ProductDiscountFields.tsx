import type { Product } from "@/context/quote/quoteTypes";
import { PositiveNumberInput } from "./ProductPricingFields";

type Props = {
  product: Product;
  onUpdate: <K extends keyof Product>(field: K, value: Product[K]) => void;
};

export default function ProductDiscountFields({ product, onUpdate }: Props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      <div style={{ flex: 1, minWidth: "120px" }}>
        <label className="label">Type de remise</label>
        <select
          className="input"
          value={product.discountType}
          onChange={(e) => onUpdate("discountType", e.target.value as Product["discountType"])}
        >
          <option value="none">Aucune remise</option>
          <option value="percent">Pourcentage</option>
          <option value="fixed">Montant fixe</option>
        </select>
      </div>

      <div style={{ flex: 1, minWidth: "120px" }}>
        <label className="label">Valeur remise</label>
        <PositiveNumberInput
          value={product.discountValue}
          min={0}
          disabled={product.discountType === "none"}
          onChange={(value) => onUpdate("discountValue", Math.max(0, value))}
        />
      </div>

      <div style={{ flex: 1, minWidth: "120px" }}>
        <label className="label">Date de prestation</label>
        <input
          className="input"
          type="date"
          value={product.serviceDate}
          onChange={(e) => onUpdate("serviceDate", e.target.value)}
        />
      </div>
    </div>
  );
}
