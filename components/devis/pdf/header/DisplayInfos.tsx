import { useQuote } from "@/context/QuoteContext";

type Props = {
  is_client?: boolean;
  font_size: string;
  default_gap: string;
  hideAttentionLabel?: boolean;
};

export default function DisplayInfos({
  is_client,
  default_gap,
  font_size,
  hideAttentionLabel = false,
}: Props) {
  const { quote } = useQuote();

  const party = is_client ? quote.client : quote.seller;

  const default_name = is_client
    ? "Nom du client"
    : "Votre nom / votre entreprise";

  const partyInfos = {
    name: party.name || default_name,
    email: party.email || "Email",
    phone: party.phone || "Téléphone",
    address: party.address || "Adresse",
    city: party.city || "Code Postal et Ville",
  };

  const infos = [
    partyInfos.email,
    partyInfos.phone,
    partyInfos.address,
    partyInfos.city,
  ].filter(Boolean);

  return (
    <div
      style={{
        display: "grid",
        gap: default_gap,
        textAlign: "inherit",
        justifyItems: is_client ? "end" : "start",
      }}
    >
      {is_client && !hideAttentionLabel && (
        <strong style={{ fontSize: font_size }}>à l'attention de</strong>
      )}
      <strong
        style={{
          color: "var(--primary)",
          fontSize: font_size,
        }}
      >
        {partyInfos.name}
      </strong>
      {infos.map((info, index) => (
        <span
          key={index}
          style={{
            color: "var(--muted)",
            fontSize: font_size,
          }}
        >
          {info}
        </span>
      ))}
    </div>
  );
}
