import TableRows from "@/components/devis/pdf/table/TableRows";
import QuoteTotalsTable from "@/components/devis/pdf/table/QuoteTotalsTable";
import { useQuote } from "@/context/QuoteContext";
import {
  calculateQuoteTotals,
  formatQuoteAmount,
} from "@/lib/quoteCalculations";
import type { Product } from "@/context/quote/quoteTypes";
import type { GetQuoteDragProps } from "../pdfPreviewUtils";

type Props = {
  border_radius: string;
  font_size: string;
  padding: string;
  products: Product[];
  showTotals: boolean;
  getDragProps?: GetQuoteDragProps;
};

export default function QuoteTable({
  border_radius,
  font_size,
  padding,
  products,
  showTotals,
  getDragProps,
}: Props) {
  const { quote } = useQuote();
  const tableDragProps = getDragProps?.("table") ?? {};
  const totalsAlignment = quote.blockAlignments.totals;
  const totalsDragProps = getDragProps?.("totals") ?? {};
  const totals = calculateQuoteTotals(quote);
  const amount = (value: number) =>
    formatQuoteAmount(value, quote.currency, quote.decimalPlaces);

  const results = [
    {
      label: "Total HT",
      value: amount(totals.totalHT),
      bg_color: "transparent",
      text_color: "var(--primary)",
    },
    ...(totals.totalDiscount > 0
      ? [
          {
            label: "Remises",
            value: amount(totals.totalDiscount),
            bg_color: "var(--tab_gray_bg)",
          },
        ]
      : []),
    {
      label: "TVA",
      value: amount(totals.totalTva),
      bg_color: "var(--tab_gray_bg)",
    },
    {
      label: "Total TTC",
      value: amount(totals.totalTTC),
      bg_color: "var(--accent-soft)",
    },
  ];

  return (
    <>
      <div
        {...tableDragProps}
        className={["quote-table-block", tableDragProps.className]
          .filter(Boolean)
          .join(" ")}
        style={{ width: "100%", ...tableDragProps.style }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            borderRadius: border_radius,
            border: "0.2cqw solid var(--border)",
            overflow: "hidden",
            fontSize: font_size,
          }}
        >
          <thead style={{ padding, background: "var(--accent-soft)" }}>
            <tr>
              <th style={{ textAlign: "left", padding }}>Description</th>
              <th>Date</th>
              <th>Prix unitaire HT</th>
              <th>Quantité</th>
              <th>Unité</th>
              <th>Remise</th>
              <th>TVA</th>
              <th>Montant HT</th>
            </tr>
          </thead>

          <tbody>
            <TableRows padding={padding} products={products} />
          </tbody>
        </table>
      </div>

      {showTotals && (
        <QuoteTotalsTable
          alignment={totalsAlignment}
          borderRadius={border_radius}
          dragProps={totalsDragProps}
          fontSize={font_size}
          padding={padding}
          results={results}
        />
      )}
    </>
  );
}
