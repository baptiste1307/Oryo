import Link from "next/link";
import { ReactNode } from "react";

type Button = {
  text: string;
  link: string;
};

type BasicCardProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  buttons?: Button[];
  centered?: boolean;
  children?: ReactNode;
  noShadow?: boolean;
  NoMarginChildren?: boolean;
};

export default function BasicCard({
  title,
  subtitle,
  buttons,
  centered = false,
  children,
  NoMarginChildren,
}: BasicCardProps) {
  return (
    <section
      className="card"
      style={{
        display: "grid",
        gap: "20px",
        textAlign: centered ? "center" : "left",
      }}
    >
      {title && (
        <div style={{ display: "grid", gap: "14px" }}>
          <h2>{title}</h2>
          {subtitle && (
            <p
              style={{
                maxWidth: centered ? "680px" : undefined,
                margin: centered ? "0 auto" : undefined,
              }}
            >
              {subtitle}
            </p>
          )}
          {NoMarginChildren && (
            <div
              style={{
                margin: "20px -20px",
              }}
            >
              {children}
            </div>
          )}
          {!NoMarginChildren && <>{children}</>}
        </div>
      )}

      <div
        className="buttons-container"
        style={{
          display: "flex",
          justifyContent: centered ? "center" : "flex-start",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {buttons && 
          buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                className={index === 0 ? "button-primary" : "button-secondary"}
                // style={{ width: "100%" }}
              >
                {button.text}
              </Link>
            ))}
      </div>
    </section>
  );
}
