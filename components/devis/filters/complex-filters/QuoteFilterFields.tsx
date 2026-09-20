import FieldList from "@/components/global/pages/FieldList";
import { QuoteFilterValues } from "../ComplexFilters";

export default function QuoteFilterFields({
  filters,
  setFilters,
}: {
  filters: QuoteFilterValues;
  setFilters: React.Dispatch<React.SetStateAction<QuoteFilterValues>>;
}) {
  const update = (key: keyof QuoteFilterValues) => (value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="quote-filters-style">
      <FieldList
        fields={[
          {
            field_type: "select",
            label: "Type de devis",
            select_options: [
              { value: "all_quotes", label: "Tous" },
              { value: "draft", label: "Brouillons" },
              { value: "finished", label: "Terminés" },
            ],
            value: filters.status,
            onChange: (value: string) =>
              setFilters((prev) => ({
                ...prev,
                status: value as QuoteFilterValues["status"],
              })),
          },
          {
            field_type: "select",
            label: "Favoris",
            select_options: [
              { value: "all", label: "Tous" },
              { value: "favorites", label: "Favoris seulement" },
            ],
            value: filters.favoriteOnly,
            onChange: (value: string) =>
              setFilters((prev) => ({
                ...prev,
                favoriteOnly: value as QuoteFilterValues["favoriteOnly"],
              })),
          },
          { field_type: "input", label: "Depuis le", value_type: "date", value: filters.startDate, onChange: update("startDate") },
          { field_type: "input", label: "Jusqu'au", value_type: "date", value: filters.endDate, onChange: update("endDate") },
          { field_type: "input", label: "Nom du client", placeholder: "Ex: Dupont", value: filters.clientName, onChange: update("clientName") },
          { field_type: "input", label: "Produit ou prestation", placeholder: "Ex: Site web", value: filters.productName, onChange: update("productName") },
          { field_type: "input", label: "Montant min. HT", placeholder: "Ex: 500", value_type: "number", value: filters.minAmount, onChange: update("minAmount") },
        ]}
      />
    </div>
  );
}
