import FieldList from "@/components/global/pages/FieldList";
import {
  CalculationFilterValues,
  initialCalculationFilters,
} from "./calculationFilters";

export default function CalculationFilterPanel({
  filters,
  setFilters,
  onApply,
  onReset,
}: {
  filters: CalculationFilterValues;
  setFilters: React.Dispatch<React.SetStateAction<CalculationFilterValues>>;
  onApply: () => void;
  onReset: () => void;
}) {
  const update = (key: keyof CalculationFilterValues) => (value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="quote-param-card" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <strong>Filtres</strong>
      <div className="quote-filters-style">
        <FieldList
          fields={[
            { field_type: "input", label: "Recherche", placeholder: "Nom ou notes", value: filters.search, onChange: update("search") },
            {
              field_type: "select",
              label: "Catégorie",
              value: filters.category,
              select_options: [
                { value: "all", label: "Toutes" },
                { value: "product", label: "Produit" },
                { value: "service", label: "Service" },
                { value: "mission", label: "Mission" },
                { value: "subscription", label: "Abonnement" },
                { value: "training", label: "Formation" },
                { value: "resale", label: "Revente" },
                { value: "other", label: "Autre" },
              ],
              onChange: update("category"),
            },
            {
              field_type: "select",
              label: "Statut",
              value: filters.status,
              select_options: [
                { value: "all", label: "Tous" },
                { value: "draft", label: "Brouillons" },
                { value: "validated", label: "Validés" },
                { value: "archived", label: "Archivés" },
              ],
              onChange: update("status"),
            },
            {
              field_type: "select",
              label: "Favoris",
              value: filters.favoriteOnly,
              select_options: [
                { value: "all", label: "Tous" },
                { value: "favorites", label: "Favoris seulement" },
              ],
              onChange: update("favoriteOnly"),
            },
            { field_type: "input", label: "Depuis le", value_type: "date", value: filters.startDate, onChange: update("startDate") },
            { field_type: "input", label: "Jusqu'au", value_type: "date", value: filters.endDate, onChange: update("endDate") },
            { field_type: "input", label: "Coût total min.", value_type: "number", value: filters.minCost, onChange: update("minCost") },
            { field_type: "input", label: "Coût total max.", value_type: "number", value: filters.maxCost, onChange: update("maxCost") },
            { field_type: "input", label: "Prix min.", value_type: "number", value: filters.minPrice, onChange: update("minPrice") },
            { field_type: "input", label: "Prix max.", value_type: "number", value: filters.maxPrice, onChange: update("maxPrice") },
            { field_type: "input", label: "Bénéfice min.", value_type: "number", value: filters.minProfit, onChange: update("minProfit") },
            { field_type: "input", label: "Bénéfice max.", value_type: "number", value: filters.maxProfit, onChange: update("maxProfit") },
            { field_type: "input", label: "Marge min. (%)", value_type: "number", value: filters.minMargin, onChange: update("minMargin") },
            { field_type: "input", label: "Marge max. (%)", value_type: "number", value: filters.maxMargin, onChange: update("maxMargin") },
          ]}
        />
      </div>

      <div className="buttons-container" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <button className="button-primary" type="button" onClick={onApply}>Appliquer</button>
        <button
          className="button-secondary"
          type="button"
          onClick={() => {
            setFilters(initialCalculationFilters);
            onReset();
          }}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
