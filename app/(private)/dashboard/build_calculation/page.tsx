"use client";

import HeroSection from "@/components/global/pages/HeroSection";
import PrivateInputs from "@/components/profit-calculator/private/PrivateInputs";
import { useAuth } from "@/context/AuthContext";
import { useCalculation } from "@/context/CalculationContext";
import { getCalculationById } from "@/lib/calculations";
import { getLibraryProductById } from "@/lib/library";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function BuildCalculationPrivate() {
  return (
    <Suspense fallback={null}>
      <BuildCalculationContent />
    </Suspense>
  );
}

function BuildCalculationContent() {
  const searchParams = useSearchParams();
  const calculationId = searchParams.get("frameId");
  const productId = searchParams.get("productId");
  const { user, loading } = useAuth();
  const { setCalculation } = useCalculation();

  useEffect(() => {
    if (loading) return;
    if (!user || !calculationId) return;

    async function loadCalculation() {
      if (!user) return;

      const savedCalculation = await getCalculationById(calculationId, user.id);

      if (!savedCalculation) return;

      setCalculation({
        id: savedCalculation.id,
        name: savedCalculation.name ?? "",
        notes: savedCalculation.notes ?? "",
        category: savedCalculation.category ?? "product",
        status: savedCalculation.status ?? "draft",
        favorite: savedCalculation.favorite ?? false,
        userId: savedCalculation.user_id,
        cost: Number(savedCalculation.cost),
        shippingCost: Number(savedCalculation.shipping_cost ?? 0),
        platformFees: Number(savedCalculation.platform_fees ?? 0),
        paymentFees: Number(savedCalculation.payment_fees ?? 0),
        timeHours: Number(savedCalculation.time_hours ?? 0),
        hourlyRate: Number(savedCalculation.hourly_rate ?? 0),
        totalCost: Number(savedCalculation.total_cost ?? savedCalculation.cost),
        price: Number(savedCalculation.price),
        tvaRate: Number(savedCalculation.tva_rate ?? 20),
        priceTtc: Number(savedCalculation.price_ttc ?? savedCalculation.price),
        profit: Number(savedCalculation.profit),
        margin: Number(savedCalculation.margin),
        targetMargin: Number(savedCalculation.target_margin ?? 30),
        suggestedPrice: Number(savedCalculation.suggested_price ?? 0),
        lowPrice: Number(savedCalculation.low_price ?? 0),
        recommendedPrice: Number(savedCalculation.recommended_price ?? 0),
        premiumPrice: Number(savedCalculation.premium_price ?? 0),
        createdAt: savedCalculation.created_at,
        updatedAt: savedCalculation.updated_at ?? "",
      });
    }

    loadCalculation();
  }, [calculationId, loading, setCalculation, user]);

  useEffect(() => {
    if (loading) return;
    if (!user || !productId) return;

    async function loadProduct() {
      if (!user) return;
      const product = await getLibraryProductById(user.id, productId);
      if (!product) return;

      setCalculation((prev) => ({
        ...prev,
        id: "",
        name: product.name ?? "",
        category: product.type ?? "product",
        notes: product.description ?? "",
        price: Number(product.price_ht ?? 0),
        profit: Number(product.price_ht ?? 0) - prev.totalCost,
      }));
    }

    loadProduct();
  }, [loading, productId, setCalculation, user]);

  return (
    <div className="parent_div">
      <HeroSection
        indicator="Calcul de rentabilité"
        title="Calculez votre vraie rentabilité"
        subtitle="Remplissez les champs ci-dessous pour débuter une nouvelle fiche produit"
      />

      <PrivateInputs />
    </div>
  );
}
