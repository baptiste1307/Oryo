import Link from "next/link";
import type { LibraryType } from "@/lib/library";

type LibraryFiltersProps = {
  selected: LibraryType;
  onSelect: (type: LibraryType) => void;
  compact?: boolean;
};

export default function LibraryFilters({
  selected,
  onSelect,
  compact,
}: LibraryFiltersProps) {
  return (
    <div className="filter-container" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <button
        className={selected === "clients" ? "quote-filter-button-primary" : "quote-filter-button-secondary"}
        onClick={() => onSelect("clients")}
      >
        Clients
      </button>
      <button
        className={selected === "products" ? "quote-filter-button-primary" : "quote-filter-button-secondary"}
        onClick={() => onSelect("products")}
      >
        Produits
      </button>
      {compact ? (
        <Link className="quote-filter-button-secondary" href="/dashboard/all_library">
          Tout voir
        </Link>
      ) : (
        <button
          className={selected === "all" ? "quote-filter-button-primary" : "quote-filter-button-secondary"}
          onClick={() => onSelect("all")}
        >
          Tout voir
        </button>
      )}
    </div>
  );
}
