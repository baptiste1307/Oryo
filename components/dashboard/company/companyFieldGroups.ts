import type { CompanyField } from "./companyTypes";

export type CompanyFieldConfig = {
  label: string;
  field: CompanyField;
  type?: string;
};

export const contactFields: CompanyFieldConfig[] = [
  { label: "Nom de l'entreprise", field: "company_name" },
  { label: "Email", field: "company_email" },
  { label: "Téléphone", field: "company_phone" },
  { label: "Adresse", field: "company_address" },
];

export const preferenceFields: CompanyFieldConfig[] = [
  { label: "Devise préférée", field: "preferred_currency" },
  { label: "TVA par défaut (%)", field: "default_tva_rate", type: "number" },
  { label: "Préfixe devis", field: "quote_prefix" },
  {
    label: "Validité devis (jours)",
    field: "default_quote_validity_days",
    type: "number",
  },
  { label: "Conditions de paiement", field: "default_payment_terms" },
];
