import { Profile } from "@/lib/profiles";

export type CompanyField =
  | "company_name"
  | "company_email"
  | "company_address"
  | "company_phone"
  | "preferred_currency"
  | "default_tva_rate"
  | "quote_prefix"
  | "default_payment_terms"
  | "default_quote_validity_days";

export type CompanyForm = {
  company_name: string;
  company_logo_url: string;
  company_logo_size: string;
  company_email: string;
  company_address: string;
  company_phone: string;
  preferred_currency: string;
  default_tva_rate: string;
  quote_prefix: string;
  default_payment_terms: string;
  default_quote_validity_days: string;
};

export const defaultCompanyForm: CompanyForm = {
  company_name: "",
  company_logo_url: "",
  company_logo_size: "52",
  company_email: "",
  company_address: "",
  company_phone: "",
  preferred_currency: "EUR",
  default_tva_rate: "20",
  quote_prefix: "DEV",
  default_payment_terms: "Paiement à réception de facture",
  default_quote_validity_days: "30",
};

export function profileToCompanyForm(profile: Profile | null): CompanyForm {
  return {
    company_name: profile?.company_name ?? "",
    company_logo_url: profile?.company_logo_url ?? "",
    company_logo_size: String(profile?.company_logo_size ?? 52),
    company_email: profile?.company_email ?? "",
    company_address: profile?.company_address ?? "",
    company_phone: profile?.company_phone ?? "",
    preferred_currency: profile?.preferred_currency ?? "EUR",
    default_tva_rate: String(profile?.default_tva_rate ?? 20),
    quote_prefix: profile?.quote_prefix ?? "DEV",
    default_payment_terms:
      profile?.default_payment_terms ?? "Paiement à réception de facture",
    default_quote_validity_days: String(
      profile?.default_quote_validity_days ?? 30,
    ),
  };
}
