import BasicCard from "@/components/global/pages/BasicCard";
import HeroSection from "@/components/global/pages/HeroSection";
import type { ReactNode } from "react";

export type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  indicator: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  sections: LegalSection[];
};

export default function LegalPage({
  indicator,
  title,
  subtitle,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <div className="parent_div legal-page">
      <HeroSection indicator={indicator} title={title} subtitle={subtitle} />
      <p>Dernière mise à jour : {updatedAt}</p>
      {sections.map((section) => (
        <BasicCard key={section.title} title={section.title}>
          <div className="legal-content">{section.content}</div>
        </BasicCard>
      ))}
    </div>
  );
}
