import Link from "next/link";

type Card = {
  title: string;
  subtitle: string;
  link: string;
};

type ClickableCardSectionProps = {
  cards: Card[];
};

export default function ClickableCardSection({
  cards,
}: ClickableCardSectionProps) {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        padding: 0,
        alignItems: "stretch",
      }}
    >
      {cards.map((card, index) => (
        <Link key={index} href={card.link}>
          <div
            className="clickable_card"
            style={{ padding: "24px", height: "100%" }}
          >
            <h3 style={{ marginBottom: "10px" }}>{card.title}</h3>
            <p>{card.subtitle}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
