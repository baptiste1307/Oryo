"use client";

import { useRef } from "react";
import HeroSection from "@/components/global/pages/HeroSection";
import BasicCard from "@/components/global/pages/BasicCard";
import Link from "next/link";
import { useViewport } from "@/context/ViewportContext";
import { useLanguage } from "@/context/LanguageContext";
import QuoteList from "@/components/devis/filters/QuoteList";
import CalculationList from "@/components/profit-calculator/private/CalculationList";
import ProfessionalInfoCard from "@/components/dashboard/ProfessionalInfoCard";
import LibraryList from "@/components/dashboard/library/LibraryList";

export default function Dashboard() {
  const { isMobile } = useViewport();
  const { t, isFrench } = useLanguage();
  const max_frames = isMobile ? 3 : 6;
  const quotesSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="parent_div">
      <HeroSection
        indicator={isFrench ? "Vue d'ensemble" : "Overview"}
        title={t.dashboard.welcome}
        subtitle={
          isFrench
            ? "Retrouvez vos calculs, suivez vos limites actuelles et relancez rapidement les actions les plus utiles pour votre activité."
            : "Review your calculations, track your current limits, and quickly launch the most useful actions for your business."
        }
      />

      <BasicCard
        centered
        title={isFrench ? "Actions rapides" : "Quick Actions"}
        subtitle={
          isFrench
            ? "Reprenez votre travail sans perdre de temps avec les raccourcis les plus utiles."
            : "Jump back into your work with quick shortcuts."
        }
      >
        <div
          className="buttons-container"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Link className="button-primary" href="/dashboard/build_quote">
            {t.dashboard.newQuote}
          </Link>
          <button
            className="button-secondary"
            type="button"
            onClick={() => {
              quotesSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {isFrench ? "Reprendre un brouillon" : "Resume draft"}
          </button>
          <Link className="button-secondary" href="/dashboard/build_calculation">
            {isFrench ? "Nouvelle fiche produit" : "New item card"}
          </Link>
        </div>
      </BasicCard>

      <ProfessionalInfoCard />

      <BasicCard
        title={isFrench ? "Votre bibliothèque" : "Your Library"}
        subtitle={
          isFrench
            ? "Retrouvez vos clients et produits enregistrés."
            : "Access your saved clients and catalog products."
        }
      >
        <LibraryList maxItems={max_frames} compact />
      </BasicCard>

      <div ref={quotesSectionRef}>
        <BasicCard
          title={isFrench ? "Vos devis" : "Your Quotes"}
          subtitle={isFrench ? "Retrouvez ici vos devis récents" : "Your recent quotes"}
        >
          <QuoteList max_frames={max_frames} />
        </BasicCard>
      </div>

      <BasicCard
        title={isFrench ? "Vos calculs de rentabilité" : "Your Profit Calculations"}
        subtitle={isFrench ? "Retrouvez ici vos dernières simulations." : "Your recent profitability forecasts."}
      >
        <CalculationList max_frames={max_frames} />
      </BasicCard>
    </div>
  );
}
