"use client";

import BasicCard from "@/components/global/pages/BasicCard";
import HeroSection from "@/components/global/pages/HeroSection";
import { useEffect, useState } from "react";
import { getQuoteByStatus, type QuoteDraft } from "@/lib/quoteDrafts";
import FrameList from "@/components/global/pages/FrameList";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ComplexFilters, {
  type QuoteFilterValues,
} from "@/components/devis/filters/ComplexFilters";

export default function AllQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteDraft[]>([]);
  const { user, loading } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState("draft");

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setQuotes([]);
      return;
    }

    refreshDrafts();
  }, [loading, user]);

  async function refreshDrafts() {
    if (!user) return;

    const drafts = await getQuoteByStatus(user.id, "draft");
    setQuotes(drafts);
  }

  async function handleQuoteFilters(filters: QuoteFilterValues) {
    if (!user) return;

    const quoteList = await getQuoteByStatus(user.id, filters.status);
    const clientFilter = filters.clientName.trim().toLowerCase();
    const productFilter = filters.productName.trim().toLowerCase();
    const minAmount = Number(filters.minAmount);

    const filteredQuotes = quoteList.filter((draft) => {
      const updatedAt = draft.updatedAt ? draft.updatedAt.slice(0, 10) : "";
      const clientName = draft.quote.client.name.toLowerCase();
      const productNames = draft.quote.products
        .map((product) => product.name.toLowerCase())
        .join(" ");

      if (filters.startDate && updatedAt < filters.startDate) return false;
      if (filters.endDate && updatedAt > filters.endDate) return false;
      if (clientFilter && !clientName.includes(clientFilter)) return false;
      if (productFilter && !productNames.includes(productFilter)) return false;
      if (filters.minAmount && draft.totalPrice < minAmount) return false;
      if (filters.favoriteOnly === "favorites" && !draft.favorite) return false;

      return true;
    });

    setSelectedFilter(filters.status);
    setQuotes(filteredQuotes);
  }

  return (
    <div className="parent_div">
      <HeroSection
        indicator="Vos devis"
        title="Vue d'ensemble sur vos devis"
        subtitle={"Retrouvez, téléchargez et modifiez ici tous vos devis."}
      />

      <div style={{ marginTop: "-55px", display: "grid", gap: "8px" }}>
        <p>Vous souhaitez en créer un nouveau ?</p>
        <Link
          style={{ width: "fit-content", height: "fit-content" }}
          className="button-primary"
          href="/dashboard/build_quote"
        >
          Créer un devis
        </Link>
      </div>

      <BasicCard title="Retrouver un devis">
        <ComplexFilters onApplyFilters={handleQuoteFilters} />
        {quotes.length > 0 ? (
          <>
            <strong
              style={{
                marginLeft: "10px",
              }}
            >
              Devis trouvés:
              <span className="big-green-value"> {quotes.length}</span>
            </strong>
            <FrameList
              frames={quotes
                .filter((draft) => draft.quote)
                .map((draft) => {
                  const products = draft.quote.products ?? [];
                  const mainProduct =
                    products[0]?.name?.trim() || "Prestation à définir";
                  const otherProductsCount = Math.max(products.length - 1, 0);

                  return {
                    title:
                      draft.quote.client?.name?.trim() || "Client à définir",
                    subtitle:
                      otherProductsCount > 0
                        ? `${mainProduct} + ${otherProductsCount} autre(s)`
                        : mainProduct,
                    totalPrice: draft.totalPrice ?? 0,
                    status: draft.status,
                    favorite: draft.favorite,
                    id: draft.id,
                    lastUpdated: draft.updatedAt,
                    onDelete: refreshDrafts,
                    onToggleFavorite: refreshDrafts,
                  };
                })}
              template="quotes_frames"
            />
          </>
        ) : (
          <div
            style={{
              width: "fit-content",
              padding: "18px 20px",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              background: "#fcfcfb",
              display: "grid",
              gap: "8px",
            }}
          >
            <strong>
              Aucun {selectedFilter == "draft" ? "brouillon" : "devis"}{" "}
              {selectedFilter == "finished" ? "terminé" : ""} ne correspond à
              ces filtres
            </strong>
            <Link className="button-secondary" href="/dashboard/build_quote">
              Créer un devis
            </Link>
          </div>
        )}
      </BasicCard>
    </div>
  );
}
