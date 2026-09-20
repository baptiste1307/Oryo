import BasicCard from "@/components/global/pages/BasicCard";
import { useQuote } from "@/context/QuoteContext";
import DropDownField from "@/components/devis/params/DropDownField";
import { saveQuoteDraft } from "@/lib/quoteDrafts";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getProfile, type Profile } from "@/lib/profiles";
import { useEffect, useState } from "react";
import PrivateQuoteActions from "./PrivateQuoteActions";
import { useViewport } from "@/context/ViewportContext";
import { FormMessage } from "@/components/forms/FormMessage";

type PrivateParamSectionProps = {
  previewRef: React.RefObject<HTMLDivElement | null>;
  draftId?: string | null;
};

export default function PrivateParamSection({
  previewRef,
  draftId,
}: PrivateParamSectionProps) {
  const { quote, setQuote, error, setError, generated, setGenerated } = useQuote();
  const { user } = useAuth();
  const { isMobile } = useViewport();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) return;

    async function loadProfile() {
      if (!user) return;
      setProfile(await getProfile(user.id));
    }

    loadProfile();
  }, [user]);

  useEffect(() => {
    if (!profile || draftId) return;
    const urlDraftId = new URLSearchParams(window.location.search).get("draftId");
    if (urlDraftId) return;

    setQuote((prev) => ({
      ...prev,
      seller: {
        ...prev.seller,
        name: prev.seller.name || profile.company_name || "",
        email: prev.seller.email || profile.company_email || "",
        phone: prev.seller.phone || profile.company_phone || "",
        address: prev.seller.address || profile.company_address || "",
        logoUrl: prev.seller.logoUrl || profile.company_logo_url || "",
        logoSize: prev.seller.logoSize || profile.company_logo_size || 52,
      },
      conditions: prev.conditions || profile.default_payment_terms || "",
    }));
  }, [profile, draftId, setQuote]);

  function handleGeneratePreview() {
    setGenerated(true);
    requestAnimationFrame(() => {
      previewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  async function handleSaveDraft() {
    if (!user) {
      setError("Vous devez être connecté pour enregistrer un brouillon.");
      return;
    }

    try {
      const savedDraftId = await saveQuoteDraft({ quote, userId: user.id, draftId });

      if (!draftId) {
        router.replace(`/dashboard/build_quote?draftId=${savedDraftId}`);
      }

      setError(null);
    } catch (error) {
      const message = error instanceof Error ? ` (${error.message})` : "";
      setError(`Impossible d'enregistrer le brouillon pour le moment.${message}`);
    }
  }

  return (
    <BasicCard
      title="Préparer le devis"
      subtitle="Remplissez le devis section par section, puis enregistrez-le à tout moment."
      NoMarginChildren
    >
      <>
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "grid",
              gap: "20px",
              height: generated && !isMobile ? "min(62vh, 620px)" : "250px",
              // Enable vertical scrolling for parameter fields
              overflowY: "auto",
              background: "transparent",
              padding: "clamp(20px, 3vw, 32px)",
            }}
          >
            <DropDownField type="seller_infos" />
            <DropDownField type="client_infos" />
            <DropDownField type="quote_infos" />
            <DropDownField type="products_infos" />
            <DropDownField type="terms_and_conditions" />
          </div>
          <div
            className="scroll-shadow"
            style={{
              top: 0,
              background:
                "linear-gradient(to bottom, rgba(var(--accent-soft-rgb), 0.3), transparent)",
            }}
          />

          <div
            className="scroll-shadow"
            style={{
              bottom: 0,
              background:
                "linear-gradient(to top, rgba(var(--accent-soft-rgb), 0.4), transparent)",
            }}
          />
        </div>
        {/* Afficher message d'erreur en rouge si un des champs vide ou incorrect */}
        <FormMessage message={error ?? ""} />

        <PrivateQuoteActions
          onSaveDraft={handleSaveDraft}
          onGeneratePreview={handleGeneratePreview}
        />
      </>
    </BasicCard>
  );
}
