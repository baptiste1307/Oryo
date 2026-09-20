import Logo from "@/components/devis/params/Logo";
import { useQuote } from "@/context/QuoteContext";
import DisplayInfos from "./DisplayInfos";
import { CompactPageHeader } from "./QuoteHeaderTemplates";
import type { HeaderDragProps, LayoutSection } from "./quoteHeaderTypes";

type Props = {
  font_size: string;
  compact?: boolean;
  getDragProps?: HeaderDragProps;
};

export default function QuoteHeader({
  font_size,
  compact = false,
  getDragProps,
}: Props) {
  const { quote } = useQuote();
  const defaultGap = "0.6cqw";
  const formattedDate = getFormattedDate();
  const blockProps = createBlockProps(quote, getDragProps);
  const templateProps = {
    blockProps,
    defaultGap,
    fontSize: font_size,
    formattedDate,
    quote,
  };

  if (compact) return <CompactPageHeader {...templateProps} />;
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
    >
      <div
        {...blockProps("seller", {
          display: "flex",
          flexDirection: "column",
          gap: defaultGap,
        })}
      >
        {(quote.seller.logoUrl || quote.seller.name) && (
          <Logo fontSize="0.7rem" padding="0.3rem 0.5rem" />
        )}
        <DisplayInfos default_gap={defaultGap} font_size={font_size} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
          gap: "8cqw",
        }}
      >
        <div
          {...blockProps("meta", {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
            gap: defaultGap,
          })}
        >
          <strong style={{ fontSize: font_size }}>
            DEVIS N°{quote.quote.number || "001"}
          </strong>
          <span style={{ color: "var(--muted)", fontSize: font_size }}>
            Date: {quote.quote.date || formattedDate}
          </span>
          <span style={{ color: "var(--muted)", fontSize: font_size }}>
            Valable jusqu'au: {quote.quote.validUntil || "JJ/MM/AAAA"}
          </span>
        </div>

        <div
          {...blockProps("client", {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
          })}
        >
          <DisplayInfos
            is_client
            default_gap={defaultGap}
            font_size={font_size}
          />
        </div>
      </div>
    </div>
  );
}

function createBlockProps(
  quote: ReturnType<typeof useQuote>["quote"],
  getDragProps?: HeaderDragProps,
) {
  return (
    section: Extract<LayoutSection, "seller" | "client" | "meta">,
    extraStyle: React.CSSProperties = {},
  ) => {
    const props = getDragProps?.(section) ?? {};
    const alignment = quote.blockAlignments[section];
    return {
      ...props,
      style: {
        ...extraStyle,
        textAlign: alignment,
        alignItems: alignment === "right" ? "flex-end" : "flex-start",
        marginLeft: alignment === "right" ? "auto" : 0,
        marginRight: alignment === "left" ? "auto" : 0,
        ...props.style,
      },
    };
  };
}

function getFormattedDate() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}/${today.getFullYear()}`;
}
