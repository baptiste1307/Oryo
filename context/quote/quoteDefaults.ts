import type { Product, Quote } from "./quoteTypes";
import { getTvaRate } from "./tva";

export const createEmptyProduct = (): Product => ({
  name: "",
  quantity: 1,
  type: "",
  unitPrice: 0,
  description: "",
  unit: "",
  tvaCategory: "standard",
  tvaRate: getTvaRate("standard"),
  discountType: "none",
  discountValue: 0,
  serviceDate: "",
});

export const initialQuote: Quote = {
  seller: {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    logoUrl: "",
    logoSize: 52,
  },
  client: {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  },
  quote: {
    date: "",
    validUntil: "",
    number: "",
  },
  products: [createEmptyProduct()],
  conditions: "",
  currency: "EUR",
  decimalPlaces: 2,
  sellerSignatureUrl: "",
  previewColor: "#0f766e",
  quoteTemplate: "classic",
  hideCustomizerGrid: false,
  tableRadius: 16,
  signatureRadius: 16,
  layoutOffsets: {
    header: { x: 0, y: 0 },
    seller: { x: 0, y: 0 },
    client: { x: 0, y: 0 },
    meta: { x: 0, y: 0 },
    table: { x: 0, y: 0 },
    totals: { x: 0, y: 0 },
    signature: { x: 0, y: 0 },
    footer: { x: 0, y: 0 },
  },
  blockAlignments: {
    seller: "left",
    client: "right",
    meta: "right",
    totals: "right",
  },
};
