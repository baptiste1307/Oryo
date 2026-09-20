import { QuoteDraft, QuoteItemRow, QuoteRow } from "@/lib/quoteDraftTypes";
import { createEmptyProduct } from "@/context/quote/quoteDefaults";
import { getTvaRate } from "@/context/quote/tva";
import type { DiscountType, TvaCategory } from "@/context/quote/quoteTypes";

export const DEFAULT_CONDITIONS = "Modalités et conditions de règlement";

function toNumber(value: number | string | null | undefined, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toDateInputValue(value: string | null | undefined) {
  return value ? value.slice(0, 10) : "";
}

function toTvaCategory(value: string | null | undefined): TvaCategory {
  if (
    value === "standard" ||
    value === "restauration" ||
    value === "alimentaire" ||
    value === "export"
  ) {
    return value;
  }

  return "standard";
}

function toDiscountType(value: string | null | undefined): DiscountType {
  return value === "percent" || value === "fixed" ? value : "none";
}

function getTotalHT(items: QuoteItemRow[] | null | undefined) {
  return (items ?? []).reduce((sum, item) => {
    return sum + toNumber(item.price_ht) * toNumber(item.quantity, 1);
  }, 0);
}

export function mapRowToDraft(row: QuoteRow): QuoteDraft {
  const client = row.clients;
  const items = row.quote_items?.length ? row.quote_items : [];

  return {
    id: row.id,
    totalPrice: getTotalHT(items),
    status: row.status ?? "brouillon",
    favorite: row.favorite ?? false,
    createdAt: row.created_at ?? "",
    updatedAt: row.updated_at ?? row.created_at ?? "",
    quote: {
      seller: {
        name: row.seller_name ?? "",
        email: row.seller_email ?? "",
        phone: row.seller_phone ?? "",
        address: row.seller_address ?? "",
        city: row.seller_city ?? "",
        logoUrl: row.seller_logo_url ?? "",
        logoSize: row.seller_logo_size ?? 52,
      },
      client: {
        name: client?.name ?? "",
        email: client?.email ?? "",
        phone: client?.phone ?? "",
        address: client?.address ?? "",
        city: client?.city ?? "",
      },
      quote: {
        number: row.quote_number ?? "",
        date: toDateInputValue(row.effective_date),
        validUntil: toDateInputValue(row.valid_until),
      },
      products:
        items.length > 0
          ? items.map((item) => {
              const tvaCategory = toTvaCategory(item.tva_category);

              return {
                name: item.product_name ?? "",
                type: "",
                quantity: toNumber(item.quantity, 1),
                unitPrice: toNumber(item.price_ht),
                description: item.description ?? "",
                unit: item.unit ?? "",
                tvaCategory,
                tvaRate: toNumber(item.tva_rate, getTvaRate(tvaCategory)),
                discountType: toDiscountType(item.discount_type),
                discountValue: toNumber(item.discount_value),
                serviceDate: toDateInputValue(item.service_date),
              };
            })
          : [createEmptyProduct()],
      conditions: row.conditions ?? DEFAULT_CONDITIONS,
      currency: row.currency ?? "EUR",
      decimalPlaces: row.decimal_places ?? 2,
      sellerSignatureUrl: row.seller_signature_url ?? "",
      previewColor: row.preview_color ?? "#0f766e",
      quoteTemplate: row.quote_template ?? "classic",
      hideCustomizerGrid: row.hide_customizer_grid ?? false,
      tableRadius: row.table_radius ?? 16,
      signatureRadius: row.signature_radius ?? 16,
      layoutOffsets: {
        header: {
          x: row.layout_header_x ?? 0,
          y: row.layout_header_offset ?? 0,
        },
        seller: {
          x: row.layout_seller_x ?? 0,
          y: row.layout_seller_offset ?? 0,
        },
        client: {
          x: row.layout_client_x ?? 0,
          y: row.layout_client_offset ?? 0,
        },
        meta: {
          x: row.layout_meta_x ?? 0,
          y: row.layout_meta_offset ?? 0,
        },
        table: {
          x: row.layout_table_x ?? 0,
          y: row.layout_table_offset ?? 0,
        },
        totals: {
          x: row.layout_totals_x ?? 0,
          y: row.layout_totals_offset ?? 0,
        },
        signature: {
          x: row.layout_signature_x ?? 0,
          y: row.layout_signature_offset ?? 0,
        },
        footer: {
          x: row.layout_footer_x ?? 0,
          y: row.layout_footer_offset ?? 0,
        },
      },
      blockAlignments: {
        seller: row.align_seller ?? "left",
        client: row.align_client ?? "right",
        meta: row.align_meta ?? "right",
        totals: row.align_totals ?? "right",
      },
    },
  };
}
