import type { Quote } from "@/context/quote/quoteTypes";
import type { LayoutSection } from "../pdfPreviewUtils";

export const colorSwatches = [
  "#0f766e",
  "#2563eb",
  "#7c3aed",
  "#111827",
  "#b45309",
  "#dc2626",
  "#0891b2",
  "#4d7c0f",
];

export const alignmentBlocks: {
  key: LayoutSection;
  label: string;
}[] = [
  { key: "seller", label: "Infos vendeur" },
  { key: "client", label: "Infos client" },
  { key: "meta", label: "Infos devis" },
  { key: "table", label: "Tableau" },
  { key: "totals", label: "Totaux" },
  { key: "header", label: "Conditions" },
  { key: "signature", label: "Signature" },
  { key: "footer", label: "Mentions légales" },
];

export const templateLayouts: Record<string, Quote["layoutOffsets"]> = {
  classic: {
    header: { x: 0, y: 0 },
    seller: { x: 0, y: 0 },
    client: { x: 0, y: 0 },
    meta: { x: 0, y: 0 },
    table: { x: 0, y: 0 },
    totals: { x: 0, y: 0 },
    signature: { x: 0, y: 0 },
    footer: { x: 0, y: 0 },
  },
  minimal: {
    header: { x: 0, y: -12 },
    seller: { x: -20, y: 0 },
    client: { x: 20, y: 0 },
    meta: { x: 0, y: -8 },
    table: { x: 0, y: -8 },
    totals: { x: -24, y: 0 },
    signature: { x: 0, y: 0 },
    footer: { x: 0, y: 8 },
  },
  editorial: {
    header: { x: -16, y: 4 },
    seller: { x: -16, y: 0 },
    client: { x: -16, y: 12 },
    meta: { x: 8, y: -4 },
    table: { x: 12, y: 4 },
    totals: { x: 12, y: 8 },
    signature: { x: -12, y: 0 },
    footer: { x: -8, y: 16 },
  },
  compact: {
    header: { x: 0, y: -20 },
    seller: { x: -12, y: 0 },
    client: { x: 12, y: 0 },
    meta: { x: 8, y: -8 },
    table: { x: 0, y: -16 },
    totals: { x: 0, y: -8 },
    signature: { x: 0, y: 0 },
    footer: { x: 0, y: -4 },
  },
};

export const templateAlignments: Record<string, Quote["blockAlignments"]> = {
  classic: { seller: "left", client: "right", meta: "right", totals: "right" },
  minimal: { seller: "left", client: "right", meta: "right", totals: "left" },
  editorial: { seller: "left", client: "left", meta: "right", totals: "right" },
  compact: { seller: "left", client: "right", meta: "right", totals: "right" },
};
