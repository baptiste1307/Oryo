import { Calculation } from "@/context/CalculationContext";
import { formatAmount } from "./calculationOptions";

export function downloadCalculationSummary(calculation: Calculation) {
  const summary = [
    `Nom: ${calculation.name.trim() || "Nouveau produit"}`,
    `Categorie: ${calculation.category}`,
    `Statut: ${calculation.status}`,
    `Cout total: ${formatAmount(calculation.totalCost)} EUR`,
    `Prix HT: ${formatAmount(calculation.price)} EUR`,
    `Prix TTC: ${formatAmount(calculation.priceTtc)} EUR`,
    `Benefice: ${formatAmount(calculation.profit)} EUR`,
    `Marge: ${formatAmount(calculation.margin)} %`,
    `Prix conseille: ${formatAmount(calculation.suggestedPrice)} EUR`,
    "",
    "Notes:",
    calculation.notes || "Aucune note",
  ].join("\n");

  const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${calculation.name.trim() || "calcul-rentabilite"}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}
