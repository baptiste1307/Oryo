import PdfPreview from "@/components/devis/pdf/PdfPreview";
import { useQuote } from "@/context/QuoteContext";
import { useAuth } from "@/context/AuthContext";
import { saveQuoteDraft } from "@/lib/quoteDrafts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FinishedPopUp from "./FinishedPopUp";
import { exportQuotePdf } from "@/lib/exportQuotePdf";
import PdfPreviewActions from "./preview-section/PdfPreviewActions";
import QuoteStatusBadge from "./preview-section/QuoteStatusBadge";

type PdfPreviewSectionProps = {
  ref: React.RefObject<HTMLDivElement | null>;
  draftId?: string | null;
};

export default function PdfPreviewSection({
  ref,
  draftId,
}: PdfPreviewSectionProps) {
  const { quote, setError, setGenerated } = useQuote();
  const { user } = useAuth();
  const router = useRouter();
  const [currentDraftId, setCurrentDraftId] = useState(draftId);
  const [showFinishedPopup, setShowFinishedPopup] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const loginParams = new URLSearchParams({
    intent: "save-quote",
    client: quote.client.name,
    prestation: quote.products[0].name,
    montant: String(quote.products[0].unitPrice),
  });
  const loginHref = `/connexion?${loginParams.toString()}`;

  async function handleFinishDraft() {
    if (!user) {
      setError("Vous devez être connecté pour marquer ce devis comme terminé.");
      return;
    }

    try {
      const savedDraftId = await saveQuoteDraft({
        quote,
        userId: user.id,
        draftId: currentDraftId,
        status: "finished",
      });

      if (!currentDraftId) {
        setCurrentDraftId(savedDraftId);
        router.replace(`/dashboard/build_quote?draftId=${savedDraftId}`);
      }

      setError(null);
      setShowFinishedPopup(true);
    } catch {
      setError("Impossible de marquer ce devis comme terminé pour le moment.");
    }
  }

  async function handleSavePdf() {
    const previewRoot = ref.current?.querySelector(".pdf-preview-root");
    const pageElements = Array.from(
      ref.current?.querySelectorAll(".pdf-preview-page") ?? [],
    );

    if (!(previewRoot instanceof HTMLElement) || pageElements.length === 0) {
      setError("Impossible de trouver l'aperçu du devis à exporter.");
      return;
    }

    try {
      setExportingPdf(true);
      const quoteNumber = quote.quote.number?.trim() || "devis";

      await exportQuotePdf({
        previewRoot,
        pageElements: pageElements.filter(
          (page): page is HTMLElement => page instanceof HTMLElement,
        ),
        fileName: `devis-${quoteNumber}.pdf`,
      });

      setError(null);
    } catch {
      setError("Impossible de générer le PDF pour le moment.");
    } finally {
      setExportingPdf(false);
    }
  }

  return (
    <div
      ref={ref} /* Target element for smooth scroll into preview */
      className="card quote-preview-card"
      style={{
        display: "grid",
        gap: "28px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <QuoteStatusBadge finished={showFinishedPopup} />

      <PdfPreview />

      <PdfPreviewActions
        userExists={Boolean(user)}
        loginHref={loginHref}
        onFinishDraft={handleFinishDraft}
        onStartLogin={() => setGenerated(true)}
      />

      {showFinishedPopup && (
        <FinishedPopUp
          setShowFinishedPopup={setShowFinishedPopup}
          onSavePdf={handleSavePdf}
          exportingPdf={exportingPdf}
        />
      )}
    </div>
  );
}
