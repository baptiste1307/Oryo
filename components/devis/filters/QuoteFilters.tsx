import Link from "next/link"

export default function QuoteFilters({
  handleQuoteFilter,
  selectedFilter,
  setSelectedFilter,
}: any) {
  return (
    <div className="filter-container"
      style={{
        display: "flex",
        gap: "0.8cqw",
      }}
    >
      <button
        className={
          selectedFilter === "draft"
            ? "quote-filter-button-primary"
            : "quote-filter-button-secondary"
        }
        onClick={() => {
          (handleQuoteFilter("draft"), setSelectedFilter("draft"));
        }}
      >
        Brouillons
      </button>
      <button
        className={
          selectedFilter === "finished"
            ? "quote-filter-button-primary"
            : "quote-filter-button-secondary"
        }
        onClick={() => {
          (handleQuoteFilter("finished"), setSelectedFilter("finished"));
        }}
      >
        Terminés
      </button>
      <Link
        className={
          selectedFilter === "all_quotes"
            ? "quote-filter-button-primary"
            : "quote-filter-button-secondary"
        }
        href="/dashboard/all_quotes"
      >
        Tout voir
      </Link>
    </div>
  );
}
