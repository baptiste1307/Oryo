import type { Quote } from "@/context/quote/quoteTypes";
import type { GetQuoteDragProps, QuoteDragProps } from "../pdfPreviewUtils";

export type LayoutSection = keyof Quote["layoutOffsets"];

export type HeaderDragProps = GetQuoteDragProps;

export type HeaderBlockProps = (
  section: Extract<LayoutSection, "seller" | "client" | "meta">,
  extraStyle?: React.CSSProperties,
) => QuoteDragProps;

export type HeaderTemplateProps = {
  blockProps: HeaderBlockProps;
  defaultGap: string;
  fontSize: string;
  formattedDate: string;
  quote: Quote;
};
