import { useQuote } from "@/context/QuoteContext";

export default function Logo({
  fontSize,
  padding,
}: {
  fontSize: string;
  padding: string;
}) {
  const { quote } = useQuote();
  const logoUrl = quote.seller.logoUrl;
  const logoSize = quote.seller.logoSize ?? 52;

  const initials = quote.seller.name
    .split(" ")
    .filter(Boolean) // si plusieurs espaces, un seul pris en compte
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        borderRadius: logoUrl ? "0" : "10px",
        background: logoUrl ? "transparent" : "var(--accent-soft)",
        padding: logoUrl ? 0 : padding,
        width: logoUrl ? `${logoSize}px` : "fit-content",
        height: logoUrl ? `${logoSize}px` : "fit-content",
        overflow: "visible",
        position: "relative",
      }}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Logo entreprise"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      ) : (
        <strong
          style={{
            color: "var(--primary)",
            fontSize: fontSize,
          }}
        >
          {initials}
        </strong>
      )}
    </div>
  );
}
