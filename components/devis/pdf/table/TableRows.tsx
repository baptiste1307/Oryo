import { useQuote } from "@/context/QuoteContext";
import type { Product } from "@/context/quote/quoteTypes";
import {
  calculateProductLine,
  formatQuoteAmount,
} from "@/lib/quoteCalculations";

export default function TableRows({
  padding,
  products,
}: {
  padding: string;
  products: Product[];
}) {
  // si index pair, couleur de fond de la ligne = gris clair
  const { quote } = useQuote();

  return (
    <>
      {products.map((product, index) => {
        const line = calculateProductLine(product);
        const amount = (value: number) =>
          formatQuoteAmount(value, quote.currency, quote.decimalPlaces);
        const discountLabel =
          product.discountType === "percent"
            ? `${product.discountValue}%`
            : product.discountType === "fixed"
              ? amount(product.discountValue)
              : "-";

        return (
          <tr
            key={index}
            style={{
              padding: padding,
              background:
                index % 2 === 0 ? "transparent" : "var(--tab_gray_bg)",
            }}
          >
            <td style={{ padding: padding }}>
              {product.name || "Nouveau produit"}
            </td>

            <td className="table_numeric_value">{product.serviceDate || "-"}</td>
            <td className="table_numeric_value">{amount(product.unitPrice)}</td>
            <td className="table_numeric_value">{Number(product.quantity)}</td>
            <td className="table_numeric_value">{product.unit || "-"}</td>
            <td className="table_numeric_value">{discountLabel}</td>
            <td className="table_numeric_value">
              {Math.round(product.tvaRate * 1000) / 10}%
            </td>

            <th className="table_numeric_value">{amount(line.totalHT)}</th>
          </tr>
        );
      })}
    </>
  );
}
