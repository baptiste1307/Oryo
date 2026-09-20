"use client";

import PdfPreview from "@/components/devis/pdf/PdfPreview";
import HeroSection from "@/components/global/pages/HeroSection";
import type { Quote } from "@/context/quote/quoteTypes";
import ColorCustomizerSection from "./sections/ColorCustomizerSection";
import CustomizerActions from "./sections/CustomizerActions";
import PositionCustomizerSection from "./sections/PositionCustomizerSection";
import RadiusCustomizerSection from "./sections/RadiusCustomizerSection";
import { useQuoteCustomizer } from "./useQuoteCustomizer";

export default function QuotePreviewCustomizer() {
  const {
    colorInputRef,
    isPremium,
    previewContainerRef,
    previewHeight,
    quote,
    recentColors,
    resetLayout,
    setBlockAlignment,
    setColor,
    setGenerated,
    setQuote,
  } = useQuoteCustomizer();

  function updateGridVisibility(hidden: boolean) {
    setQuote((prev) => ({ ...prev, hideCustomizerGrid: hidden }));
  }

  function updateRadius(field: "tableRadius" | "signatureRadius", value: number) {
    setQuote((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="parent_div">
      <HeroSection
        indicator="Personnalisation"
        title="Personnalisez votre devis"
        subtitle="Positionnez chaque élément et adaptez l’apparence de votre devis."
      />

      <section
        className="quote-page-grid quote-customizer-grid"
        style={getPageStyle(previewHeight)}
      >
        <aside className="card quote-customizer-panel">
          <ColorCustomizerSection
            color={quote.previewColor}
            colorInputRef={colorInputRef}
            recentColors={recentColors}
            onColorChange={setColor}
          />
          <PositionCustomizerSection
            quote={quote}
            isPremium={isPremium}
            onAlignmentChange={setBlockAlignment}
            onGridVisibilityChange={updateGridVisibility}
          />
          <RadiusCustomizerSection
            quote={quote}
            isPremium={isPremium}
            onRadiusChange={updateRadius}
          />
          <CustomizerActions
            onFinish={() => setGenerated(true)}
            onReset={resetLayout}
          />
        </aside>

        <div className="quote-customizer-preview" ref={previewContainerRef}>
          <PdfPreview customizerMode canDragLayout={isPremium} />
        </div>
      </section>
    </div>
  );
}

function getPageStyle(previewHeight: number | null) {
  return {
    "--customizer-preview-height": previewHeight ? `${previewHeight}px` : "auto",
  } as React.CSSProperties;
}
