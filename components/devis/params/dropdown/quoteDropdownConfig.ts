import { Quote } from "@/context/QuoteContext";

export type DropDownType =
  | "seller_infos"
  | "client_infos"
  | "quote_infos"
  | "products_infos"
  | "terms_and_conditions";

export const dropdownTitles: Record<DropDownType, string> = {
  seller_infos: "Votre entreprise",
  client_infos: "Votre client",
  quote_infos: "Informations du devis",
  products_infos: "Prestations / produits",
  terms_and_conditions: "Conditions de règlement",
};

export function getQuoteInputConfigs(
  quote: Quote,
  updateField: any,
  updateQuoteSetting: (key: "currency" | "decimalPlaces", value: string) => void,
) {
  return {
    seller_infos: [
      field("Nom", "Ex: Studio Freelance", quote.seller.name, (value) => updateField("seller", "name", value)),
      field("Téléphone", "06 00 00 00 00", quote.seller.phone, (value) => updateField("seller", "phone", value)),
      field("Email", "contact@studiofreelance.fr", quote.seller.email, (value) => updateField("seller", "email", value)),
      field("Adresse", "12 rue de la Création", quote.seller.address, (value) => updateField("seller", "address", value)),
      field("Code postal et ville", "13006 Marseille", quote.seller.city, (value) => updateField("seller", "city", value)),
    ],
    client_infos: [
      field("Nom du client", "Ex: Entreprise Dupont", quote.client.name, (value) => updateField("client", "name", value)),
      field("Téléphone", "06 00 00 00 00", quote.client.phone, (value) => updateField("client", "phone", value)),
      field("Email", "contact@client.fr", quote.client.email, (value) => updateField("client", "email", value)),
      field("Adresse", "24 avenue Victor Hugo", quote.client.address, (value) => updateField("client", "address", value)),
      field("Code postal et ville", "75016 Paris", quote.client.city, (value) => updateField("client", "city", value)),
    ],
    quote_infos: [
      field("Numéro de devis", "001", quote.quote.number, (value) => updateField("quote", "number", value)),
      field("Date d'effet du devis", "jj/mm/aaaa", quote.quote.date, (value) => updateField("quote", "date", value), "date"),
      field("Date limite de validité", "jj/mm/aaaa", quote.quote.validUntil, (value) => updateField("quote", "validUntil", value), "date"),
      selectField("Devise", quote.currency, [
        { value: "EUR", label: "Euro (€)" },
        { value: "USD", label: "Dollar ($)" },
        { value: "GBP", label: "Livre (£)" },
        { value: "CHF", label: "Franc suisse (CHF)" },
        { value: "BTC", label: "Bitcoin (BTC)" },
        { value: "ETH", label: "Ethereum (ETH)" },
      ], (value) => updateQuoteSetting("currency", value)),
      field(
        "Chiffres après la virgule",
        "2",
        String(quote.decimalPlaces),
        (value) => updateQuoteSetting("decimalPlaces", value),
        "number",
      ),
    ],
  };
}

function field(
  label: string,
  placeholder: string,
  value: string,
  onChange: (value: string) => void,
  value_type?: string,
) {
  return { field_type: "input", label, placeholder, value, value_type, onChange };
}

function selectField(
  label: string,
  value: string,
  select_options: { value: string; label: string }[],
  onChange: (value: string) => void,
) {
  return { field_type: "select", label, value, select_options, onChange };
}
