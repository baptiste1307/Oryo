import type { Product, Quote } from "@/context/quote/quoteTypes";

const CURRENCY_LABELS: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CHF: "CHF",
  BTC: "BTC",
  ETH: "ETH",
};

function clampDecimals(value: number) {
  return Math.min(8, Math.max(0, Number(value) || 0));
}

export function formatQuoteAmount(
  value: number,
  currency: string,
  decimalPlaces: number,
) {
  const decimals = clampDecimals(decimalPlaces);
  const label = CURRENCY_LABELS[currency] ?? currency;
  const formatted = Number(value || 0).toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${formatted} ${label}`;
}

export function calculateProductLine(product: Product) {
  const quantity = Number(product.quantity) || 0;
  const unitPrice = Number(product.unitPrice) || 0;
  const subtotalHT = unitPrice * quantity;
  const discountValue = Number(product.discountValue) || 0;

  const discount =
    product.discountType === "percent"
      ? subtotalHT * Math.min(discountValue, 100) / 100
      : product.discountType === "fixed"
        ? Math.min(discountValue, subtotalHT)
        : 0;

  const totalHT = Math.max(0, subtotalHT - discount);
  const tvaAmount = totalHT * (Number(product.tvaRate) || 0);
  const totalTTC = totalHT + tvaAmount;

  return {
    subtotalHT,
    discount,
    totalHT,
    tvaAmount,
    totalTTC,
  };
}

export function calculateQuoteTotals(quote: Quote) {
  return quote.products.reduce(
    (totals, product) => {
      const line = calculateProductLine(product);

      return {
        totalHT: totals.totalHT + line.totalHT,
        totalDiscount: totals.totalDiscount + line.discount,
        totalTva: totals.totalTva + line.tvaAmount,
        totalTTC: totals.totalTTC + line.totalTTC,
      };
    },
    {
      totalHT: 0,
      totalDiscount: 0,
      totalTva: 0,
      totalTTC: 0,
    },
  );
}
