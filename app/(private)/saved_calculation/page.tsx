"use client";

import HeroSection from "@/components/global/pages/HeroSection";
import { saveCalculation } from "@/lib/calculations";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import SavedCalculationActions from "./components/SavedCalculationActions";
import SavedCalculationCard from "./components/SavedCalculationCard";

export default function SaveResultPage() {
  return (
    <Suspense fallback={null}>
      <SaveResultContent />
    </Suspense>
  );
}

function SaveResultContent() {
  const searchParams = useSearchParams();
  const cost = Number(searchParams.get("cost") ?? 0);
  const price = Number(searchParams.get("price") ?? 0);
  const targetMargin = Number(searchParams.get("targetMargin") ?? 30);
  const profit = price - cost;
  const margin = price > 0 ? (profit * 100) / price : 0;
  const suggestedPrice =
    targetMargin > 0 && targetMargin < 100
      ? cost / (1 - targetMargin / 100)
      : 0;
  const router = useRouter();

  const { user } = useAuth();
  const resultCards = [
    { label: "Coût", value: `${cost} EUR` },
    { label: "Prix de vente", value: `${price} EUR` },
    {
      label: "Bénéfice",
      value: `${profit} EUR`,
      color: profit >= 0 ? "var(--success)" : "var(--danger)",
    },
    { label: "Marge", value: `${margin.toFixed(2)} %` },
    { label: "Prix conseillé", value: `${suggestedPrice.toFixed(2)} EUR` },
  ];

  async function handleSaveCalc() {
    if (!user) return;

    // Build payload once user presence is confirmed
    const calculationToSave = {
      user_id: user.id,
      cost,
      price,
      profit,
      margin,
      target_margin: targetMargin,
      suggested_price: suggestedPrice,
    };

    await saveCalculation(user.id, calculationToSave);
  }

  async function saveAndRedirect(path: string) {
    try {
      await handleSaveCalc();
      router.push(path);
    } catch (error) {
      console.error("Erreur pendant la sauvegarde :", error);
    }
  }

  return (
    <div className="parent_div">
      <HeroSection
        indicator="Résultat récupéré après connexion"
        title="Vos valeurs ont été conservées"
        subtitle="Votre résultat est enregistré dans votre dashboard."
      />
      <section
        className="card"
        style={{
          display: "grid",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {resultCards.map((card) => (
            <SavedCalculationCard key={card.label} {...card} />
          ))}
        </div>

        <SavedCalculationActions
          onGoToDashboard={() => saveAndRedirect("/dashboard")}
          onGoToAdvanced={() => saveAndRedirect("/dashboard/build_calculation")}
        />
      </section>
    </div>
  );
}
