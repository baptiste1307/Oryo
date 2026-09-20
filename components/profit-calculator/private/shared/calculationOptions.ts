export const categoryOptions = [
  { value: "product", label: "Produit" },
  { value: "service", label: "Service" },
  { value: "mission", label: "Mission" },
  { value: "subscription", label: "Abonnement" },
  { value: "training", label: "Formation" },
  { value: "resale", label: "Revente" },
  { value: "other", label: "Autre" },
];

export const statusOptions = [
  { value: "draft", label: "Brouillon" },
  { value: "validated", label: "Validé" },
  { value: "archived", label: "Archivé" },
];

export function formatAmount(value: number) {
  return Number(value || 0).toFixed(2);
}
