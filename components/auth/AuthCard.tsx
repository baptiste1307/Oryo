import BasicCard from "@/components/global/pages/BasicCard";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  prompt: string;
  linkLabel: string;
  linkHref: string;
  children: ReactNode;
};

export function AuthCard({
  title,
  prompt,
  linkLabel,
  linkHref,
  children,
}: AuthCardProps) {
  return (
    <div style={{ width: "min(100%, 420px)" }}>
      <BasicCard title={title}>
        <p style={{ margin: "10px 0" }}>
          {prompt}{" "}
          <Link className="nav-link" style={{ textDecoration: "underline" }} href={linkHref}>
            {linkLabel}
          </Link>
        </p>
        {children}
      </BasicCard>
    </div>
  );
}
