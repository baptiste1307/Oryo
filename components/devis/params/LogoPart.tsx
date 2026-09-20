import CompanyAvatar from "@/components/dashboard/company/CompanyAvatar";
import { useQuote } from "@/context/QuoteContext";
import { useRef } from "react";
import { optimizeCompanyLogo } from "@/lib/companyLogo";

export default function LogoPart() {
  const { quote, setQuote } = useQuote();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const companyName = quote.seller.name || "Votre entreprise";

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const logoUrl = await optimizeCompanyLogo(file);
      setQuote((prev) => ({
        ...prev,
        seller: {
          ...prev.seller,
          logoUrl,
          logoSize: prev.seller.logoSize ?? 52,
        },
      }));
    } catch (error) {
      console.error("Impossible de préparer le logo :", error);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "18px",
        alignItems: "flex-start",
        minWidth: 0,
      }}
    >
      <CompanyAvatar
        companyName={companyName}
        logo={quote.seller.logoUrl || ""}
        logoSize={quote.seller.logoSize ?? 52}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
      />
      <div style={{ display: "grid", gap: "6px", minWidth: "150px" }}>
        <label className="label">Taille du logo</label>
        <input
          type="range"
          min={32}
          max={96}
          value={quote.seller.logoSize ?? 52}
          onChange={(event) =>
            setQuote((prev) => ({
              ...prev,
              seller: {
                ...prev.seller,
                logoSize: Number(event.target.value),
              },
            }))
          }
        />
        <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
          {quote.seller.logoSize ?? 52}px
        </span>
      </div>
    </div>
  );
}
