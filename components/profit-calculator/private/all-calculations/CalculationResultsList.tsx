import FrameList from "@/components/global/pages/FrameList";
import { Calculation } from "@/lib/calculations";
import Link from "next/link";
import { formatAmount } from "./calculationFilters";

export default function CalculationResultsList({
  calculations,
  refreshCalculations,
}: {
  calculations: Calculation[];
  refreshCalculations: () => void;
}) {
  if (calculations.length === 0) {
    return (
      <div
        style={{
          width: "fit-content",
          padding: "18px 20px",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          background: "#fcfcfb",
          display: "grid",
          gap: "8px",
        }}
      >
        <strong>Aucun calcul ne correspond à ces filtres</strong>
        <Link className="button-secondary" href="/dashboard/build_calculation">
          Créer un calcul
        </Link>
      </div>
    );
  }

  return (
    <>
      <strong style={{ marginLeft: "10px" }}>
        Calculs trouvés:
        <span className="big-green-value"> {calculations.length}</span>
      </strong>

      <FrameList
        frames={calculations.map((calculation) => ({
          id: calculation.id,
          title: calculation.name || "Calcul de rentabilité",
          subtitle: `Coût total ${formatAmount(calculation.total_cost ?? calculation.cost)} € · Prix HT ${formatAmount(calculation.price)} € · ${calculation.status ?? "draft"}`,
          margin_line: `Marge ${formatAmount(calculation.margin)} %`,
          profit_line: `Bénéfice ${formatAmount(calculation.profit)} €`,
          favorite: calculation.favorite ?? false,
          onDelete: refreshCalculations,
          onToggleFavorite: refreshCalculations,
          created_at: calculation.created_at,
        }))}
        template="recent_calculations"
      />
    </>
  );
}
