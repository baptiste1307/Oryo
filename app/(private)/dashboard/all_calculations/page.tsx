"use client";

import BasicCard from "@/components/global/pages/BasicCard";
import HeroSection from "@/components/global/pages/HeroSection";
import CalculationFilterPanel from "@/components/profit-calculator/private/all-calculations/CalculationFilterPanel";
import {
  applyCalculationFilters,
  initialCalculationFilters,
} from "@/components/profit-calculator/private/all-calculations/calculationFilters";
import CalculationResultsList from "@/components/profit-calculator/private/all-calculations/CalculationResultsList";
import { useAuth } from "@/context/AuthContext";
import { getAllCalculations, type Calculation } from "@/lib/calculations";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllCalculationsPage() {
  const { user, loading } = useAuth();
  const [allCalculations, setAllCalculations] = useState<Calculation[]>([]);
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [filters, setFilters] = useState(initialCalculationFilters);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setAllCalculations([]);
      setCalculations([]);
      return;
    }

    refreshCalculations();
  }, [loading, user]);

  async function refreshCalculations() {
    if (!user) return;

    const calculationList = (await getAllCalculations(user.id)) ?? [];
    setAllCalculations(calculationList);
    setCalculations(applyCalculationFilters(calculationList, filters));
  }

  function handleApplyFilters() {
    setCalculations(applyCalculationFilters(allCalculations, filters));
  }

  function handleResetFilters() {
    setCalculations(allCalculations);
  }

  return (
    <div className="parent_div">
      <HeroSection
        indicator="Calculs de rentabilité"
        title="Vue d'ensemble sur vos calculs"
        subtitle="Retrouvez, filtrez et modifiez ici tous vos calculs."
      />

      <div style={{ marginTop: "-55px", display: "grid", gap: "8px" }}>
        <p>Vous souhaitez en créer un nouveau ?</p>
        <Link
          style={{ width: "fit-content", height: "fit-content" }}
          className="button-primary"
          href="/dashboard/build_calculation"
        >
          Nouveau calcul
        </Link>
      </div>

      <BasicCard title="Retrouver un calcul">
        <CalculationFilterPanel
          filters={filters}
          setFilters={setFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
        <CalculationResultsList
          calculations={calculations}
          refreshCalculations={refreshCalculations}
        />
      </BasicCard>
    </div>
  );
}
