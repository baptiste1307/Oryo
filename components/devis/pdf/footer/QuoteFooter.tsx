import { useQuote } from "@/context/QuoteContext";
import type { GetQuoteDragProps } from "../pdfPreviewUtils";

type Props = {
  font_size: string;
  padding: string;
  border_radius: string;
  tab_font_size: string;
  getDragProps?: GetQuoteDragProps;
};

export default function QuoteFooter({
  font_size,
  padding,
  border_radius,
  tab_font_size,
  getDragProps,
}: Props) {
  const { quote } = useQuote();
  const footer_font_size = "1.4cqw";
  const sellerDetails = [
    quote.seller.name,
    quote.seller.address,
    quote.seller.city,
    quote.seller.phone,
    quote.seller.email,
  ].filter(Boolean);
  const conditionsDragProps = getDragProps?.("header") ?? {};
  const signatureDragProps = getDragProps?.("signature") ?? {};
  const legalDragProps = getDragProps?.("footer") ?? {};

  return (
    <>
      <div className="quote-footer-blocks" style={{ fontSize: font_size, padding }}>
        <div
          {...conditionsDragProps}
          style={{
            ...conditionsDragProps.style,
            width: "43cqw",
            height: "15cqw",
            border: "0.2cqw dashed var(--border)",
            borderRadius: border_radius,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: footer_font_size,
              color: "var(--muted)",
            }}
          >
            {quote.conditions || "Modalités et conditions de règlement"}
          </span>
        </div>

        <div
          {...signatureDragProps}
          style={{ display: "grid", alignContent: "start", ...signatureDragProps.style }}
        >
            <span
              style={{
                fontSize: tab_font_size,
                color: "var(--muted)",
              }}
            >
              Bon pour accord :
            </span>

            <span
              style={{
                display: "grid",
                alignContent: "space-between",
                width: "30cqw",
                height: "10cqw",
                padding: padding,
                border: "0.2cqw solid var(--muted)",
                borderRadius: border_radius,
              }}
            >
              <small style={{ color: "var(--muted)", fontSize: footer_font_size }}>
                Date, nom et signature du client
              </small>
            </span>
        </div>
      </div>
      <div
        {...legalDragProps}
        style={{
          ...legalDragProps.style,
          textAlign: "center",
          borderTop: "0.3cqw solid var(--border)",
          fontSize: footer_font_size,
          paddingTop: "1cqw",
        }}
      >
        <span
          style={{
            color: "var(--muted)",
          }}
        >
          {sellerDetails.join(" · ") || "Coordonnées du vendeur"}
        </span>
      </div>
    </>
  );
}
