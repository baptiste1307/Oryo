import BasicCard from "@/components/global/pages/BasicCard";
import { useAuth } from "@/context/AuthContext";
import { useCalculation } from "@/context/CalculationContext";
import { saveCalculation } from "@/lib/calculations";
import { canAddLibraryItem, saveProductToLibrary } from "@/lib/library";
import { useEffect, useState } from "react";
import CalculationActions from "./sections/CalculationActions";
import CalculationAccordion from "./CalculationAccordion";
import CalculationTitle from "./sections/CalculationTitle";
import { downloadCalculationSummary } from "./shared/downloadCalculationSummary";

export default function PrivateInputs() {
  const { calculation, setCalculation, updateField } = useCalculation();
  const { user } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [savedCalculationId, setSavedCalculationId] = useState<string | null>(
    calculation.id || null,
  );
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setSavedCalculationId(calculation.id || null);
  }, [calculation.id]);

  async function persistCalculation(calculationId?: string) {
    if (!user) return null;

    const nextCalculationId = await saveCalculation(
      user.id,
      {
        user_id: user.id,
        name: calculation.name.trim() || "Nouveau produit",
        notes: calculation.notes,
        category: calculation.category,
        status: calculation.status,
        favorite: calculation.favorite,
        cost: calculation.cost,
        shipping_cost: calculation.shippingCost,
        platform_fees: calculation.platformFees,
        payment_fees: calculation.paymentFees,
        time_hours: calculation.timeHours,
        hourly_rate: calculation.hourlyRate,
        total_cost: calculation.totalCost,
        price: calculation.price,
        tva_rate: calculation.tvaRate,
        price_ttc: calculation.priceTtc,
        profit: calculation.profit,
        margin: calculation.margin,
        target_margin: calculation.targetMargin,
        suggested_price: calculation.suggestedPrice,
        low_price: calculation.lowPrice,
        recommended_price: calculation.recommendedPrice,
        premium_price: calculation.premiumPrice,
      },
      calculationId,
    );

    setSavedCalculationId(nextCalculationId);
    setCalculation((prev) => ({
      ...prev,
      id: nextCalculationId,
      userId: user.id,
      name: calculation.name.trim() || "Nouveau produit",
    }));
    setSaveMessage("Calcul enregistré");

    return nextCalculationId;
  }

  async function handleSaveCalculation() {
    try {
      await persistCalculation(savedCalculationId || calculation.id || undefined);
    } catch (error) {
      console.error("Erreur sauvegarde calcul :", error);
      setSaveMessage("Erreur pendant la sauvegarde");
    }
  }

  function handleDuplicateCalculation() {
    const duplicatedName = `${calculation.name.trim() || "Nouveau produit"} - copie`;
    setCalculation((prev) => ({ ...prev, id: "", name: duplicatedName }));
    setSavedCalculationId(null);
    setSaveMessage("Copie prête à enregistrer");
  }

  async function handleSaveToLibrary() {
    if (!user) return;

    try {
      const libraryAccess = await canAddLibraryItem(user.id);
      if (!libraryAccess.allowed) {
        setSaveMessage("Bibliothèque pleine pour le plan gratuit.");
        return;
      }

      await saveProductToLibrary(user.id, {
        name: calculation.name.trim() || "Nouveau produit",
        type: calculation.category,
        description: calculation.notes,
        price_ht: calculation.price,
        unit: "unité",
      });
      setSaveMessage("Produit enregistré dans la bibliothèque");
    } catch (error) {
      console.error("Erreur bibliothèque :", error);
      setSaveMessage("Impossible d'enregistrer dans la bibliothèque");
    }
  }

  return (
    <BasicCard
      title={
        <CalculationTitle
          name={calculation.name}
          favorite={calculation.favorite}
          isEditingName={isEditingName}
          setIsEditingName={setIsEditingName}
          updateField={updateField}
        />
      }
      subtitle="Construisez une fiche privée complète pour piloter votre rentabilité."
    >
      <CalculationAccordion
        calculation={calculation}
        updateField={updateField}
      />
      <CalculationActions
        saveMessage={saveMessage}
        onSave={handleSaveCalculation}
        onDuplicate={handleDuplicateCalculation}
        onDownload={() => downloadCalculationSummary(calculation)}
        onSaveToLibrary={handleSaveToLibrary}
      />
    </BasicCard>
  );
}
