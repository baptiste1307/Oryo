import { Quote } from "@/context/QuoteContext";
import type { DiscountType, TvaCategory } from "@/context/quote/quoteTypes";

export type ClientRow = {
  id: string;
  user_id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  created_at: string | null;
};

export type QuoteItemRow = {
  id: number;
  quote_id: string;
  product_name: string | null;
  price_ht: number | string | null;
  quantity: number | null;
  tva_rate: number | string | null;
  tva_category?: TvaCategory | string | null;
  discount_type?: DiscountType | string | null;
  discount_value?: number | string | null;
  service_date?: string | null;
  description: string | null;
  unit: string | null;
};

export type QuoteRow = {
  id: string;
  user_id: string;
  client_id: string | null;
  status: string | null;
  favorite: boolean | null;
  created_at: string | null;
  effective_date: string | null;
  valid_until: string | null;
  updated_at: string | null;
  quote_number: string | null;
  conditions: string | null;
  currency?: string | null;
  decimal_places?: number | null;
  seller_signature_url?: string | null;
  seller_name?: string | null;
  seller_email?: string | null;
  seller_phone?: string | null;
  seller_address?: string | null;
  seller_city?: string | null;
  seller_logo_url?: string | null;
  seller_logo_size?: number | null;
  preview_color?: string | null;
  quote_template?: string | null;
  hide_customizer_grid?: boolean | null;
  table_radius?: number | null;
  signature_radius?: number | null;
  layout_header_x?: number | null;
  layout_header_offset?: number | null;
  layout_seller_x?: number | null;
  layout_seller_offset?: number | null;
  layout_client_x?: number | null;
  layout_client_offset?: number | null;
  layout_meta_x?: number | null;
  layout_meta_offset?: number | null;
  layout_table_x?: number | null;
  layout_table_offset?: number | null;
  layout_totals_x?: number | null;
  layout_totals_offset?: number | null;
  layout_signature_x?: number | null;
  layout_signature_offset?: number | null;
  layout_footer_x?: number | null;
  layout_footer_offset?: number | null;
  align_seller?: "left" | "right" | null;
  align_client?: "left" | "right" | null;
  align_meta?: "left" | "right" | null;
  align_totals?: "left" | "right" | null;
  clients?: ClientRow | null;
  quote_items?: QuoteItemRow[] | null;
};

export type QuoteDraft = {
  id: string;
  quote: Quote;
  totalPrice: number;
  status: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SaveQuoteDraftInput = {
  quote: Quote;
  userId: string;
  draftId?: string | null;
  status?: "draft" | "finished";
};
