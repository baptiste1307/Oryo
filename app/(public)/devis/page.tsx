"use client";

import { QuoteProvider, useQuote } from "@/context/QuoteContext";
import { useRef, useState } from "react";
import HeroSection from "@/components/global/pages/HeroSection";
import PdfPreviewSection from "@/components/devis/pdf/PdfPreviewSection";
import PublicParamSection from "@/components/devis/params/PublicParamSection";

export default function Devis() {
  const previewRef = useRef<HTMLDivElement | null>(null);

  function QuotePageContent({
    previewRef,
  }: {
    previewRef: React.RefObject<HTMLDivElement | null>;
  }) {
    const { generated } = useQuote();

    return (
      <div className="parent_div">
        <HeroSection
          indicator="Devis PDF"
          title="Créez un devis gratuitement en quelques secondes"
          subtitle="Remplissez les champs ci-dessous pour générer un aperçu de devis."
          buttons={[
            {
              link: "/inscription",
              text: "Créer un compte",
            },
            {
              link: "/connexion",
              text: "Se connecter",
            },
          ]}
        />

        <section className="quote-page-grid">
          {/* Fill params */}
          <PublicParamSection previewRef={previewRef} />

          {/* Generate quote */}
          {generated && <PdfPreviewSection ref={previewRef} />}
        </section>
      </div>
    );
  }

  return (
    <QuoteProvider>
      <QuotePageContent previewRef={previewRef} />
    </QuoteProvider>
  );
}
