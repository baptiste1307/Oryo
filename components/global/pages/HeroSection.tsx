import Link from "next/link";

type Button = {
  text: string;
  link: string;
};

type HeroSectionProps = {
  indicator: string;
  title: string;
  subtitle: string;
  buttons?: Button[];
};

export default function HeroSection({
  indicator,
  title,
  subtitle,
  buttons,
}: HeroSectionProps) {
  return (
    <section
      style={{
        padding: "120px 0 12px",
        display: "grid",
        gap: "28px",
      }}
    >
      <span className="hero_indicator">{indicator}</span>

      <div style={{ display: "grid", gap: "12px", maxWidth: "760px" }}>
        <h1>{title}</h1>
        <p style={{ fontSize: "1.05rem", maxWidth: "640px" }}>{subtitle}</p>
      </div>

      <div
        className="buttons-container"
        style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
      >
        {buttons?.map((button, index) => (
          <Link
            key={index}
            href={button.link}
            className={index % 2 === 0 ? "button-primary" : "button-secondary"}
          >
            {button.text}
          </Link>
        ))}
      </div>
    </section>
  );
}
