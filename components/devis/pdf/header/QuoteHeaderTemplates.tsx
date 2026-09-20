import Logo from "@/components/devis/params/Logo";
import DisplayInfos from "./DisplayInfos";
import type { HeaderTemplateProps } from "./quoteHeaderTypes";

export function CompactPageHeader({
  blockProps,
  fontSize,
  formattedDate,
  quote,
}: HeaderTemplateProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
      <div {...blockProps("meta")}>
        <strong style={{ fontSize }}>DEVIS N°{quote.quote.number || "001"}</strong>
        <span style={{ color: "var(--muted)", fontSize, marginLeft: "2cqw" }}>
          Date: {quote.quote.date || formattedDate}
        </span>
      </div>
    </div>
  );
}

export function MinimalHeader({
  blockProps,
  defaultGap,
  fontSize,
  formattedDate,
  quote,
}: HeaderTemplateProps) {
  return (
    <div style={{ display: "grid", gap: "2cqw" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        <strong style={{ fontSize: "4cqw", color: "var(--primary)" }}>Devis</strong>
        <div {...blockProps("meta", { display: "grid", gap: defaultGap })}>
          <strong style={{ fontSize }}>N°{quote.quote.number || "001"}</strong>
          <span style={{ color: "var(--muted)", fontSize }}>
            {quote.quote.date || formattedDate}
          </span>
        </div>
      </div>
      <div className="quote-minimal-parties">
        <div {...blockProps("seller")}>
          <DisplayInfos default_gap={defaultGap} font_size={fontSize} />
        </div>
        <div {...blockProps("client")}>
          <DisplayInfos is_client hideAttentionLabel default_gap={defaultGap} font_size={fontSize} />
        </div>
      </div>
    </div>
  );
}

export function EditorialHeader({
  blockProps,
  defaultGap,
  fontSize,
  formattedDate,
  quote,
}: HeaderTemplateProps) {
  return (
    <div className="quote-editorial-header">
      <div className="quote-editorial-parties">
        <div {...blockProps("seller")}>
          {quote.seller.name.length > 0 && (
            <Logo fontSize="0.7rem" padding="0.3rem 0.5rem" />
          )}
          <DisplayInfos default_gap={defaultGap} font_size={fontSize} />
        </div>
        <div {...blockProps("client", { marginTop: "2cqw" })}>
          <DisplayInfos is_client hideAttentionLabel default_gap={defaultGap} font_size={fontSize} />
        </div>
      </div>
      <div {...blockProps("meta", { display: "grid", gap: defaultGap })}>
        <strong style={{ fontSize: "4cqw" }}>DEVIS</strong>
        <span style={{ color: "var(--muted)", fontSize }}>N°{quote.quote.number || "001"}</span>
        <span style={{ color: "var(--muted)", fontSize }}>
          {quote.quote.date || formattedDate}
        </span>
      </div>
    </div>
  );
}

export function CompactTemplateHeader({
  blockProps,
  fontSize,
  formattedDate,
  quote,
}: HeaderTemplateProps) {
  return (
    <div className="quote-compact-header">
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
        <div {...blockProps("seller", { display: "grid", gap: "0.25cqw" })}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2cqw" }}>
            {quote.seller.name.length > 0 && (
              <Logo fontSize="0.6rem" padding="0.2rem 0.4rem" />
            )}
            <strong style={{ fontSize: "3cqw", color: "var(--primary)" }}>
              Devis N°{quote.quote.number || "001"}
            </strong>
          </div>
          <DisplayInfos default_gap="0.25cqw" font_size="1.8cqw" />
        </div>
        <div {...blockProps("meta")}>
          <span style={{ color: "var(--muted)", fontSize }}>
            {quote.quote.date || formattedDate}
          </span>
        </div>
      </div>
      <div {...blockProps("client")}>
        <DisplayInfos
          is_client
          hideAttentionLabel
          default_gap="0.25cqw"
          font_size="1.8cqw"
        />
      </div>
    </div>
  );
}
