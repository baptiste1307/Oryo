import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import QuoteFilterFields from "./complex-filters/QuoteFilterFields";

export type QuoteFilterValues = {
  status: "all_quotes" | "draft" | "finished";
  favoriteOnly: "all" | "favorites";
  startDate: string;
  endDate: string;
  clientName: string;
  productName: string;
  minAmount: string;
};

const initialFilters: QuoteFilterValues = {
  status: "draft",
  favoriteOnly: "all",
  startDate: "",
  endDate: "",
  clientName: "",
  productName: "",
  minAmount: "",
};

type ComplexFiltersProps = {
  onApplyFilters: (filters: QuoteFilterValues) => void;
};

export default function ComplexFilters({ onApplyFilters }: ComplexFiltersProps) {
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState<QuoteFilterValues>(initialFilters);

  function resetFilters() {
    setFilters(initialFilters);
    onApplyFilters(initialFilters);
  }

  return (
    <div className="quote-param-card" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong style={{ color: openFilters ? "var(--primary)" : "var(--text)" }}>
          Filtres
        </strong>
        <button
          type="button"
          className="nav-link"
          onClick={() => setOpenFilters(!openFilters)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {openFilters ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
        </button>
      </div>

      {openFilters && (
        <>
          <QuoteFilterFields filters={filters} setFilters={setFilters} />
          <div className="buttons-container" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <button className="button-primary" type="button" onClick={() => onApplyFilters(filters)}>
              Appliquer
            </button>
            <button className="button-secondary" type="button" onClick={resetFilters}>
              Réinitialiser
            </button>
          </div>
        </>
      )}
    </div>
  );
}
