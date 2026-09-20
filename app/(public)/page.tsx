"use client";

import HeroSection from "@/components/global/pages/HeroSection";
import BasicCard from "@/components/global/pages/BasicCard";
import ClickableCardSection from "@/components/global/pages/ClickableCardSection";
import { useLanguage } from "@/context/LanguageContext";

export default function Outils() {
  const { t } = useLanguage();

  return (
    <div className="parent_div">
      <HeroSection
        indicator={t.home.indicator}
        title={t.home.title}
        subtitle={t.home.subtitle}
      />

      <ClickableCardSection
        cards={[
          {
            title: t.home.cards.quotesTitle,
            subtitle: t.home.cards.quotesDesc,
            link: "/devis",
          },
          {
            title: t.home.cards.calcTitle,
            subtitle: t.home.cards.calcDesc,
            link: "/calculateur",
          },
          {
            title: t.home.cards.historyTitle,
            subtitle: t.home.cards.historyDesc,
            link: "/connexion",
          },
        ]}
      />

      <BasicCard
        centered
        title={t.home.noAccount.title}
        subtitle={t.home.noAccount.subtitle}
        buttons={[
          {
            text: t.home.noAccount.generateQuote,
            link: "/devis",
          },
          {
            text: t.home.noAccount.calculateProfit,
            link: "/calculateur",
          },
        ]}
      />
    </div>
  );
}
