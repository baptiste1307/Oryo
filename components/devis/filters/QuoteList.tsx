import FrameList from "@/components/global/pages/FrameList";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getQuoteByStatus, type QuoteDraft } from "@/lib/quoteDrafts";
import QuoteFilters from "@/components/devis/filters/QuoteFilters";
import EmptyState from "@/components/global/pages/EmptyState";

export default function QuoteList({ max_frames }: { max_frames: number }) {
  const { user, loading } = useAuth();

  const [selectedFilter, setSelectedFilter] = useState("draft");
  const [quotes, setQuotes] = useState<QuoteDraft[]>([]);

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

  async function handleQuoteFilter(status: string) {
    const quote_list = await getQuoteByStatus(user.id, status);
    setQuotes(quote_list);
  }

  return (
    <>
      <QuoteFilters
        handleQuoteFilter={handleQuoteFilter}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      {quotes.length > 0 ? (
        <>
          <FrameList
            frames={quotes
              .slice(0, max_frames)
              .filter((draft) => draft.quote)
              .map((draft) => {
                const products = draft.quote.products ?? [];
                const mainProduct =
                  products[0]?.name?.trim() || "Prestation à définir";
                const otherProductsCount = Math.max(products.length - 1, 0);

                return {
                  title: draft.quote.client?.name?.trim() || "Client à définir",
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
        <EmptyState
          title={`Aucun ${selectedFilter === "draft" ? "brouillon" : "devis terminé"} pour le moment.`}
          actionLabel={selectedFilter === "draft" ? "Créer un devis" : "Reprendre un brouillon"}
          actionHref={selectedFilter === "draft" ? "/dashboard/build_quote" : undefined}
          onAction={
            selectedFilter === "finished"
              ? () => {
                  handleQuoteFilter("draft");
                  setSelectedFilter("draft");
                }
              : undefined
          }
        />
      )}
    </>
  );
}
