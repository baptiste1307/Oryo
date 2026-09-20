export type Party = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  logoUrl?: string;
  logoSize?: number;
};

export type QuoteMeta = {
  date: string;
  validUntil: string;
  number: string;
};

export type TvaCategory =
  | "standard"
  | "restauration"
  | "alimentaire"
  | "export";

export type DiscountType = "none" | "percent" | "fixed";

export type Product = {
  name: string;
  type: string;
  quantity: number;
  unitPrice: number;
  description: string;
  unit: string;
  tvaCategory: TvaCategory;
  tvaRate: number;
  discountType: DiscountType;
  discountValue: number;
  serviceDate: string;
};

export type Quote = {
  seller: Party;
  client: Party;
  quote: QuoteMeta;
  products: Product[];
  conditions: string;
  currency: string;
  decimalPlaces: number;
  sellerSignatureUrl: string;
  previewColor: string;
  quoteTemplate: string;
  hideCustomizerGrid: boolean;
  tableRadius: number;
  signatureRadius: number;
  layoutOffsets: {
    header: { x: number; y: number };
    seller: { x: number; y: number };
    client: { x: number; y: number };
    meta: { x: number; y: number };
    table: { x: number; y: number };
    totals: { x: number; y: number };
    signature: { x: number; y: number };
    footer: { x: number; y: number };
  };
  blockAlignments: {
    seller: "left" | "right";
    client: "left" | "right";
    meta: "left" | "right";
    totals: "left" | "right";
  };
};

export type QuoteSection = "seller" | "client" | "quote";
