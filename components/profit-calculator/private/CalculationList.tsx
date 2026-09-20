import FrameList from "@/components/global/pages/FrameList";
import { getAllCalculations, type Calculation } from "@/lib/calculations";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import EmptyState from "@/components/global/pages/EmptyState";

export default function CalculationList({
  max_frames,
}: {
  max_frames: number;
}) {
  const { user, loading } = useAuth();
  const [calculations, setCalculations] = useState<Calculation[]>([]);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setCalculations([]);
      return;
    }

    refreshCalculations();
  }, [loading, user]);

  async function refreshCalculations() {
    if (!user) return;

    const calculations = await getAllCalculations(user.id);
    setCalculations(calculations ?? []);
  }

  return (
    <>
      {calculations.length > 0 ? (
        <>
          <Link className="quote-filter-button-secondary" href="/dashboard/all_calculations">
            Tout voir
          </Link>
          <FrameList
            frames={calculations.slice(0, max_frames).map((calculation) => ({
              id: calculation.id,
              title: calculation.name ?? "Nouveau calcul",
              subtitle: `Coût ${Number(calculation.total_cost ?? calculation.cost).toFixed(2)} € · Prix de vente ${Number(calculation.price).toFixed(2)} €`,
              margin_line: `Marge ${Number(calculation.margin).toFixed(2)} %`,
              profit_line: `Bénéfice ${Number(calculation.profit).toFixed(2)} €`,
              favorite: calculation.favorite ?? false,
              onDelete: refreshCalculations,
              onToggleFavorite: refreshCalculations,
              created_at: calculation.created_at,
            }))}
            template="recent_calculations"
          />
        </>
      ) : (
        <EmptyState
          title="Vous n'avez pas encore de calcul ou de fiche produit."
          actionLabel="Créer une fiche produit"
          actionHref="/dashboard/build_calculation"
        />
      )}
    </>
  );
}
