"use client";

import { useQuote } from "@/context/QuoteContext";
import { useRef, useEffect, useState } from "react";
import HeroSection from "@/components/global/pages/HeroSection";
import PrivateParamSection from "@/components/devis/params/PrivateParamSection";
import PdfPreviewSection from "@/components/devis/pdf/PdfPreviewSection";
import { getQuoteDraftById } from "@/lib/quoteDrafts";
import { useAuth } from "@/context/AuthContext";
import { initialQuote } from "@/context/quote/quoteDefaults";

export default function Devis() {
  const previewRef = useRef<HTMLDivElement | null>(null);

  function QuotePageContent({
    previewRef,
  }: {
    previewRef: React.RefObject<HTMLDivElement | null>;
  }) {
    const { generated, setGenerated, setQuote } = useQuote();
    const { user, loading } = useAuth();
    const [draftId, setDraftId] = useState<string | null>(null);

    useEffect(() => {
      if (loading) return;

      const searchParams = new URLSearchParams(window.location.search);
      const currentDraftId = searchParams.get("draftId");
      const client = searchParams.get("client");
      const prestation = searchParams.get("prestation");
      const montant = searchParams.get("montant");
      const shouldShowPreview = searchParams.get("preview") === "1";
      const isNewQuote = !currentDraftId && !client && !prestation && !montant && !shouldShowPreview;

      setDraftId(currentDraftId);

      if (isNewQuote) {
        setQuote(initialQuote);
        setGenerated(false);
        return;
      }

      if (currentDraftId && user) {
        async function loadDraft() {
          const draft = await getQuoteDraftById(currentDraftId, user.id);

          if (!draft) return;

          setQuote(draft.quote);
          setGenerated(true);
        }

        loadDraft();
        return;
      }

      if (client || prestation || montant) {
        setQuote((prev) => ({
          ...prev,
          client: {
            ...prev.client,
            name: client ?? prev.client.name,
          },
          products: [
            {
              ...prev.products[0],
              name: prestation ?? prev.products[0].name,
              unitPrice: montant ? Number(montant) : prev.products[0].unitPrice,
            },
            ...prev.products.slice(1),
          ],
        }));
        setGenerated(true);
      }

      if (shouldShowPreview) {
        setGenerated(true);
      }
    }, [loading, user, setGenerated, setQuote]);

    return (
      <div className="parent_div">
        <HeroSection
          indicator="Devis PDF"
          title="Créez et personnalisez votre devis"
          subtitle="Remplissez les champs ci-dessous pour générer un aperçu de devis."
        />
        <section className="quote-page-grid">
          <PrivateParamSection previewRef={previewRef} draftId={draftId} />

          {generated && <PdfPreviewSection ref={previewRef} draftId={draftId} />}
        </section>
      </div>
    );
  }

  return <QuotePageContent previewRef={previewRef} />;
}
