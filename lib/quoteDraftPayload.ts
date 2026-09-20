import { DEFAULT_CONDITIONS } from "@/lib/quoteDraftMapper";
import type { Quote } from "@/context/quote/quoteTypes";

export function buildQuotePayload({
  clientId,
  quote,
  status,
  userId,
}: {
  clientId: string | null;
  quote: Quote;
  status: "draft" | "finished";
  userId: string;
}) {
  return {
    user_id: userId,
    client_id: clientId,
    status,
    effective_date: quote.quote.date || null,
    valid_until: quote.quote.validUntil || null,
    updated_at: new Date().toISOString(),
    quote_number: quote.quote.number || "01",
    conditions: quote.conditions || DEFAULT_CONDITIONS,
    currency: quote.currency,
    decimal_places: quote.decimalPlaces,
    seller_signature_url: quote.sellerSignatureUrl || null,
    preview_color: quote.previewColor,
    quote_template: quote.quoteTemplate,
    hide_customizer_grid: quote.hideCustomizerGrid,
    table_radius: quote.tableRadius,
    signature_radius: quote.signatureRadius,
    ...layoutPayload(quote),
    align_seller: quote.blockAlignments.seller,
    align_client: quote.blockAlignments.client,
    align_meta: quote.blockAlignments.meta,
    align_totals: quote.blockAlignments.totals,
    seller_name: quote.seller.name,
    seller_email: quote.seller.email,
    seller_phone: quote.seller.phone,
    seller_address: quote.seller.address,
    seller_city: quote.seller.city,
    seller_logo_url: quote.seller.logoUrl || null,
    seller_logo_size: quote.seller.logoSize ?? 52,
  };
}

function layoutPayload(quote: Quote) {
  return {
    layout_header_x: quote.layoutOffsets.header.x,
    layout_header_offset: quote.layoutOffsets.header.y,
    layout_seller_x: quote.layoutOffsets.seller.x,
    layout_seller_offset: quote.layoutOffsets.seller.y,
    layout_client_x: quote.layoutOffsets.client.x,
    layout_client_offset: quote.layoutOffsets.client.y,
    layout_meta_x: quote.layoutOffsets.meta.x,
    layout_meta_offset: quote.layoutOffsets.meta.y,
    layout_table_x: quote.layoutOffsets.table.x,
    layout_table_offset: quote.layoutOffsets.table.y,
    layout_totals_x: quote.layoutOffsets.totals.x,
    layout_totals_offset: quote.layoutOffsets.totals.y,
    layout_signature_x: quote.layoutOffsets.signature.x,
    layout_signature_offset: quote.layoutOffsets.signature.y,
    layout_footer_x: quote.layoutOffsets.footer.x,
    layout_footer_offset: quote.layoutOffsets.footer.y,
  };
}
